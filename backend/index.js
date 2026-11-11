const dns = require("node:dns");
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const app = express();
const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

function normalizeOrigin(origin) {
  return String(origin || "")
    .trim()
    .replace(/\/+$/, "");
}

function getAllowedOrigins() {
  return Array.from(
    new Set(
      [process.env.FRONTEND_URL, process.env.DASHBOARD_URL]
        .filter(Boolean)
        .flatMap((origin) => origin.split(","))
        .map(normalizeOrigin)
        .filter(Boolean)
    )
  );
}

function configureDnsForAtlas() {
  const customDns = process.env.DNS_SERVERS;
  if (customDns) {
    const servers = customDns
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (servers.length > 0) {
      dns.setServers(servers);
    }
    return;
  }

  // Help local Windows environments resolve mongodb+srv:// SRV records
  // without overriding system DNS inside Linux/Render production containers.
  if (
    process.env.NODE_ENV !== "production" &&
    process.platform === "win32" &&
    typeof uri === "string" &&
    uri.startsWith("mongodb+srv://")
  ) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
  }
}

const allowedOrigins = getAllowedOrigins();

app.set("trust proxy", 1);
app.disable("x-powered-by");

app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "no-referrer");
  next();
});

app.use(
  cors(
    allowedOrigins.length > 0
      ? {
          origin(origin, callback) {
            if (!origin) return callback(null, true);
            const normalized = normalizeOrigin(origin);
            if (allowedOrigins.includes(normalized)) {
              return callback(null, true);
            }
            return callback(new Error("Origin not allowed by CORS"));
          },
          methods: ["GET", "POST", "OPTIONS"],
          optionsSuccessStatus: 200,
        }
      : {
          methods: ["GET", "POST", "OPTIONS"],
          optionsSuccessStatus: 200,
        }
  )
);

app.use(express.json({ limit: "16kb" }));

app.get("/", (req, res) => {
  res.send("TradeFlow backend is running");
});

app.get("/health", (req, res) => {
  const dbState = mongoose.connection.readyState;
  return res.status(dbState === 1 ? 200 : 503).json({
    status: dbState === 1 ? "ok" : "degraded",
    database: dbState === 1 ? "connected" : "disconnected",
    uptimeSeconds: Math.floor(process.uptime()),
  });
});

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({}).lean();
    return res.json(allHoldings);
  } catch (error) {
    console.error("Holdings error:", error.message);
    return res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({}).lean();
    return res.json(allPositions);
  } catch (error) {
    console.error("Positions error:", error.message);
    return res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.get("/allOrders", async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({})
      .sort({ createdAt: -1, _id: -1 })
      .lean();
    return res.json(allOrders);
  } catch (error) {
    console.error("Orders error:", error.message);
    return res.status(500).json({ error: "Failed to fetch orders" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body || {};

    const cleanName = typeof name === "string" ? name.trim() : "";
    const parsedQty = Number(qty);
    const parsedPrice = Number(price);
    const cleanMode = typeof mode === "string" ? mode.trim().toUpperCase() : "";

    if (!cleanName) {
      return res.status(400).json({ error: "Instrument name is required" });
    }
    if (cleanName.length > 64) {
      return res
        .status(400)
        .json({ error: "Instrument name must be 64 characters or fewer" });
    }
    if (
      !Number.isFinite(parsedQty) ||
      parsedQty <= 0 ||
      !Number.isInteger(parsedQty)
    ) {
      return res
        .status(400)
        .json({ error: "Quantity must be a positive whole number" });
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ error: "Price must be greater than zero" });
    }
    if (cleanMode !== "BUY" && cleanMode !== "SELL") {
      return res.status(400).json({ error: "Order mode must be BUY or SELL" });
    }

    const newOrder = new OrdersModel({
      name: cleanName,
      qty: parsedQty,
      price: parsedPrice,
      mode: cleanMode,
    });

    const savedOrder = await newOrder.save();
    return res.status(201).json(savedOrder);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Order error:", error.message);
    return res.status(500).json({ error: "Failed to save order" });
  }
});

app.use((err, req, res, next) => {
  if (err && err.type === "entity.parse.failed") {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }
  if (err && err.type === "entity.too.large") {
    return res.status(413).json({ error: "Payload too large" });
  }
  if (err && err.message === "Origin not allowed by CORS") {
    return res.status(403).json({ error: "Origin not allowed by CORS" });
  }
  console.error("Unhandled backend error:", err?.message || err);
  return res.status(500).json({ error: "Internal server error" });
});

app.use((req, res) => {
  return res.status(404).json({
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

async function startServer() {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is not configured");
    }

    configureDnsForAtlas();
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
    console.log("DB connected");

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`TradeFlow backend listening on port ${PORT}`);
    });

    const shutdown = (signal) => {
      console.log(`Received ${signal}. Shutting down TradeFlow backend...`);
      server.close(async () => {
        try {
          await mongoose.connection.close(false);
        } finally {
          process.exit(0);
        }
      });
    };

    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));

    return server;
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exitCode = 1;
    throw error;
  }
}

module.exports = {
  app,
  startServer,
  normalizeOrigin,
  getAllowedOrigins,
};

if (require.main === module) {
  startServer().catch(() => {
    // Error already logged in startServer()
  });
}
