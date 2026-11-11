
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

import GeneralContext from "./GeneralContext";
import API_URL from "../config";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid, initialPrice = 0, mode = "BUY" }) => {
  const generalContext = useContext(GeneralContext);
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(
    initialPrice > 0 ? String(initialPrice) : ""
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setStockPrice(initialPrice > 0 ? String(initialPrice) : "");
    setErrorMsg("");
  }, [uid, initialPrice, mode]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        generalContext.closeBuyWindow();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generalContext]);

  const parsedQty = Number(stockQuantity);
  const parsedPrice = Number(stockPrice);
  const estimatedMargin =
    Number.isFinite(parsedQty) &&
    parsedQty > 0 &&
    Number.isFinite(parsedPrice) &&
    parsedPrice > 0
      ? (parsedQty * parsedPrice).toFixed(2)
      : "0.00";

  const isSell = mode === "SELL";

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!Number.isInteger(parsedQty) || parsedQty <= 0) {
      setErrorMsg("Please enter a whole quantity greater than zero.");
      return;
    }
    if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setErrorMsg("Please enter a price greater than zero.");
      return;
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/newOrder`, {
        name: uid,
        qty: parsedQty,
        price: parsedPrice,
        mode: isSell ? "SELL" : "BUY",
      });

      generalContext.notifyOrderPlaced(
        `${isSell ? "Sell" : "Buy"} order for ${parsedQty} × ${uid} @ ₹${parsedPrice.toFixed(2)} placed!`
      );
      generalContext.closeBuyWindow();
    } catch (error) {
      console.error("Failed to place order:", error);
      setErrorMsg(
        error.response?.data?.error ||
          "Unable to place order. Please ensure the backend server is running and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = () => {
    generalContext.closeBuyWindow();
  };

  return (
    <div
      className="order-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={handleCancelClick}
    >
      <div
        className={`container${isSell ? " sell-mode" : ""}`}
        id="buy-window"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="header">
          <div>
            <h3 id="order-modal-title">
              {isSell ? "Sell" : "Buy"} {uid} <span>NSE</span>
            </h3>
            <p className="market-options">Regular Order · MIS / CNC</p>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={handleCancelClick}
            aria-label="Close order window"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmitOrder}>
          <div className="regular-order">
            {errorMsg && (
              <div className="order-error-banner" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="inputs">
              <fieldset>
                <legend>Qty.</legend>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  min="1"
                  step="1"
                  onChange={(e) => setStockQuantity(e.target.value)}
                  value={stockQuantity}
                />
              </fieldset>

              <fieldset>
                <legend>Price</legend>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0.01"
                  step="any"
                  placeholder="0.00"
                  onChange={(e) => setStockPrice(e.target.value)}
                  value={stockPrice}
                />
              </fieldset>
            </div>
          </div>

          <div className="buttons">
            <span>Margin required ₹{estimatedMargin}</span>
            <div className="action-btn-group">
              <button
                type="submit"
                className={`btn ${isSell ? "btn-sell" : "btn-blue"}`}
                disabled={loading}
              >
                {loading ? "Placing order..." : isSell ? "Sell" : "Buy"}
              </button>

              <button
                type="button"
                className="btn btn-grey"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyActionWindow;
