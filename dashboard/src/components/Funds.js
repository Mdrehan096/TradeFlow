import React, { useState } from "react";

const Funds = () => {
  const [availableMargin, setAvailableMargin] = useState(4043.1);
  const [usedMargin] = useState(3757.3);
  const [availableCash, setAvailableCash] = useState(4043.1);
  const [payin, setPayin] = useState(4064.0);
  const [fundAction, setFundAction] = useState(null); // "ADD" | "WITHDRAW" | null
  const [amountInput, setAmountInput] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const formatINR = (num) =>
    num.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleFundSubmit = (e) => {
    e.preventDefault();
    const amount = Number(amountInput);
    if (!Number.isFinite(amount) || amount <= 0) {
      setStatusMessage("Please enter an amount greater than ₹0.");
      return;
    }

    if (fundAction === "ADD") {
      setAvailableMargin((prev) => prev + amount);
      setAvailableCash((prev) => prev + amount);
      setPayin((prev) => prev + amount);
      setStatusMessage(`Added ₹${formatINR(amount)} via UPI.`);
    } else if (fundAction === "WITHDRAW") {
      if (amount > availableCash) {
        setStatusMessage("Insufficient available cash for withdrawal.");
        return;
      }
      setAvailableMargin((prev) => prev - amount);
      setAvailableCash((prev) => prev - amount);
      setStatusMessage(`Withdrawal request for ₹${formatINR(amount)} submitted.`);
    }

    setAmountInput("");
    setFundAction(null);
  };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <div className="funds-actions">
          <button
            type="button"
            className="btn btn-green"
            onClick={() => {
              setFundAction(fundAction === "ADD" ? null : "ADD");
              setStatusMessage("");
            }}
          >
            Add funds
          </button>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => {
              setFundAction(fundAction === "WITHDRAW" ? null : "WITHDRAW");
              setStatusMessage("");
            }}
          >
            Withdraw
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="funds-notice" role="status">
          <span>{statusMessage}</span>
          <button
            type="button"
            className="toast-close"
            aria-label="Close message"
            onClick={() => setStatusMessage("")}
          >
            ×
          </button>
        </div>
      )}

      {fundAction && (
        <form className="funds-form-card" onSubmit={handleFundSubmit}>
          <label htmlFor="funds-amount">
            {fundAction === "ADD" ? "Add Funds Amount (₹)" : "Withdraw Amount (₹)"}
          </label>
          <div className="funds-form-controls">
            <input
              id="funds-amount"
              type="number"
              min="1"
              step="any"
              placeholder="Enter amount"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-blue">
              Confirm
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setFundAction(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="row funds-row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{formatINR(availableMargin)}</p>
            </div>
            <div className="data">
              <p>Used margin</p>
              <p className="imp">{formatINR(usedMargin)}</p>
            </div>
            <div className="data">
              <p>Available cash</p>
              <p className="imp">{formatINR(availableCash)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Opening Balance</p>
              <p>4,043.10</p>
            </div>
            <div className="data">
              <p>Live balance</p>
              <p>3,736.40</p>
            </div>
            <div className="data">
              <p>Payin</p>
              <p>{formatINR(payin)}</p>
            </div>
            <div className="data">
              <p>SPAN</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Delivery margin</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Exposure</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Options premium</p>
              <p>0.00</p>
            </div>
            <hr />
            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Collateral (Equity)</p>
              <p>0.00</p>
            </div>
            <div className="data">
              <p>Total Collateral</p>
              <p>0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button
              type="button"
              className="btn btn-blue"
              onClick={() =>
                setStatusMessage(
                  "Commodity segment activation request noted for review."
                )
              }
            >
              Open Account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
