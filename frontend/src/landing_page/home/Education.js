import React from "react";

function Education() {
  return (
    <div className="container mt-4 mt-md-5 px-3 px-md-4">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 mb-4 mb-lg-0 text-center">
          <img
            src="/media/images/education.svg"
            alt="Free market education illustration"
            className="img-fluid"
            style={{ width: "70%" }}
          />
        </div>
        <div className="col-12 col-lg-6">
          <h1 className="mb-3 fs-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a
            href="https://zerodha.com/varsity/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            Varsity <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
          <p className="mt-4 mt-md-5">
            TradingQ&amp;A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a
            href="https://tradingqna.com/"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: "none" }}
          >
            TradingQ&amp;A <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
