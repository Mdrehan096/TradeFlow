import React from "react";
import { Link } from "react-router-dom";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-3 p-md-5 mt-3 mt-md-5 text-center border-top">
        <div className="col-12 col-lg-8 p-3 p-md-4">
          <Link to="/pricing" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">Brokerage calculator</h3>
          </Link>
          <ul
            style={{ textAlign: "left", lineHeight: "2.2", fontSize: "13px" }}
            className="text-muted mt-3"
          >
            <li>
              Call &amp; Trade and RMS auto-squareoff: Additional charges of ₹50 +
              GST per order.
            </li>
            <li>Digital contract notes will be sent via e-mail.</li>
            <li>
              Physical copies of contract notes, if required, shall be charged
              ₹20 per contract note. Courier charges apply.
            </li>
            <li>
              For NRI account (non-PIS), 0.5% or ₹100 per executed order for
              equity (whichever is lower).
            </li>
            <li>
              For NRI account (PIS), 0.5% or ₹200 per executed order for equity
              (whichever is lower).
            </li>
            <li>
              If the account is in debit balance, any order placed will be
              charged ₹40 per executed order instead of ₹20 per executed order.
            </li>
          </ul>
        </div>
        <div className="col-12 col-lg-4 p-3 p-md-4">
          <Link to="/pricing" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
