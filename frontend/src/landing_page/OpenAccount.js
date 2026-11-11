import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container py-5 px-3 px-md-5 mb-4">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <h1 className="mt-3 mt-md-5">Open a Zerodha account</h1>
          <p className="text-muted my-3">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&amp;O trades.
          </p>
          <Link
            to="/signup"
            className="p-2 px-4 btn btn-primary fs-5 mb-4 mt-2 cta-btn"
          >
            Sign up Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
