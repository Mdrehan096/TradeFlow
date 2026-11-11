const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const mongoose = require("mongoose");

const { app, normalizeOrigin } = require("./index");
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const TEST_MONGO_URL =
  process.env.TEST_MONGO_URL || "mongodb://127.0.0.1:27017/tradeflow_local_test";

let server;
let baseUrl;

test.before(async () => {
  await mongoose.connect(TEST_MONGO_URL);
  await Promise.all([
    HoldingsModel.deleteMany({}),
    PositionsModel.deleteMany({}),
    OrdersModel.deleteMany({}),
  ]);

  await HoldingsModel.create({
    name: "INFY",
    qty: 2,
    avg: 1350.5,
    price: 1555.45,
    net: "+15.18%",
    day: "-1.60%",
  });

  await PositionsModel.create({
    product: "CNC",
    name: "EVEREADY",
    qty: 2,
    avg: 316.27,
    price: 312.35,
    net: "+0.58%",
    day: "-1.24%",
    isLoss: true,
  });

  await new Promise((resolve) => {
    server = http.createServer(app);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      baseUrl = `http://127.0.0.1:${address.port}`;
      resolve();
    });
  });
});

test.after(async () => {
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
});

test("GET / and GET /health return running status", async () => {
  const rootRes = await fetch(`${baseUrl}/`);
  assert.equal(rootRes.status, 200);
  assert.equal(await rootRes.text(), "TradeFlow backend is running");

  const healthRes = await fetch(`${baseUrl}/health`);
  assert.equal(healthRes.status, 200);
  const healthJson = await healthRes.json();
  assert.equal(healthJson.status, "ok");
  assert.equal(healthJson.database, "connected");
});

test("GET /allHoldings and GET /allPositions return seeded records", async () => {
  const holdingsRes = await fetch(`${baseUrl}/allHoldings`);
  assert.equal(holdingsRes.status, 200);
  const holdingsData = await holdingsRes.json();
  assert.equal(holdingsData.length, 1);
  assert.equal(holdingsData[0].name, "INFY");

  const positionsRes = await fetch(`${baseUrl}/allPositions`);
  assert.equal(positionsRes.status, 200);
  const positionsData = await positionsRes.json();
  assert.equal(positionsData.length, 1);
  assert.equal(positionsData[0].name, "EVEREADY");
});

test("POST /newOrder validates inputs and saves valid BUY/SELL orders", async () => {
  const badQtyRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "TCS", qty: 0, price: 3200, mode: "BUY" }),
  });
  assert.equal(badQtyRes.status, 400);

  const badModeRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "TCS", qty: 2, price: 3200, mode: "HOLD" }),
  });
  assert.equal(badModeRes.status, 400);

  const malformedRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{invalid json",
  });
  assert.equal(malformedRes.status, 400);

  const buyRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "TCS", qty: 3, price: 3194.8, mode: "buy" }),
  });
  assert.equal(buyRes.status, 201);
  const buyJson = await buyRes.json();
  assert.equal(buyJson.name, "TCS");
  assert.equal(buyJson.mode, "BUY");

  const sellRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "INFY", qty: 1, price: 1555.45, mode: "SELL" }),
  });
  assert.equal(sellRes.status, 201);

  const allOrdersRes = await fetch(`${baseUrl}/allOrders`);
  assert.equal(allOrdersRes.status, 200);
  const orders = await allOrdersRes.json();
  assert.equal(orders.length, 2);
  assert.equal(orders[0].name, "INFY");
  assert.equal(orders[0].mode, "SELL");
});

test("Unknown routes return JSON 404", async () => {
  const res = await fetch(`${baseUrl}/non-existent-route`);
  assert.equal(res.status, 404);
  const body = await res.json();
  assert.match(body.error, /Route not found/);
});

test("Security headers, payload size guard, and origin normalization work cleanly", async () => {
  assert.equal(normalizeOrigin(" https://tradeflow.vercel.app/ "), "https://tradeflow.vercel.app");

  const rootRes = await fetch(`${baseUrl}/`);
  assert.equal(rootRes.headers.get("x-content-type-options"), "nosniff");
  assert.equal(rootRes.headers.get("x-frame-options"), "DENY");
  assert.equal(rootRes.headers.get("x-powered-by"), null);

  const oversizedRes = await fetch(`${baseUrl}/newOrder`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "A".repeat(20000), qty: 1, price: 100, mode: "BUY" }),
  });
  assert.equal(oversizedRes.status, 413);
});

