import React from "react";
import { Link } from "react-router-dom";

function Pricing() {
  return (
    <div className="container my-4 my-md-5 px-3 px-md-4">
      <div className="row align-items-center">
        <div className="col-12 col-lg-4 mb-4 mb-lg-0">
          <h1 className="mb-3 fs-2">Unbeatable pricing</h1>
          <p>
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>
          <Link to="/pricing" style={{ textDecoration: "none" }}>
            See Pricing{" "}
            <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </div>
        <div className="d-none d-lg-block col-lg-2"></div>
        <div className="col-12 col-lg-6 mb-4 mb-lg-5">
          <div className="row text-center g-0">
            <div className="col-12 col-sm-6 p-4 border">
              <h1 className="mb-3">₹0</h1>
              <p className="mb-0">
                Free equity delivery and
                <br />
                direct mutual funds
              </p>
            </div>
            <div className="col-12 col-sm-6 p-4 border">
              <h1 className="mb-3">₹20</h1>
              <p className="mb-0">Intraday and F&amp;O</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
