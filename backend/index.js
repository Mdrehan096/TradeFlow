
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

// Configure FRONTEND_URL and DASHBOARD_URL in your deployment
// environment when you are ready to restrict CORS.
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean);

app.use(
  cors(
    allowedOrigins.length
      ? { origin: allowedOrigins }
      : {}
  )
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("TradeFlow backend is running");
});

app.get("/allHoldings", async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Holdings error:", error.message);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Positions error:", error.message);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error("Order error:", error.message);
    res.status(500).json({ error: "Failed to save order" });
  }
});

async function startServer() {
  try {
    if (!uri) {
      throw new Error("MONGO_URL is not configured");
    }

    await mongoose.connect(uri);
    console.log("DB connected");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`TradeFlow backend listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    process.exit(1);
  }
}

startServer();
