const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Instrument name is required"],
      maxlength: [64, "Instrument name cannot exceed 64 characters"],
      trim: true,
    },
    qty: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number",
      },
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0.01, "Price must be greater than zero"],
    },
    mode: {
      type: String,
      required: [true, "Order mode is required"],
      enum: {
        values: ["BUY", "SELL"],
        message: "Mode must be BUY or SELL",
      },
      uppercase: true,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };