import React from "react";
import { Link } from "react-router-dom";

function Universe() {
  return (
    <div className="container mt-4 mt-md-5 px-3 px-md-4">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <h1>The Zerodha Universe</h1>
          <p className="text-muted">
            Extend your trading and investment experience even further with our
            partner platforms
          </p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/smallcaseLogo.png"
            alt="Smallcase logo"
            className="universe-logo"
          />
          <p className="text-small text-muted mt-3">
            Thematic investment platform that helps you invest in diversified
            baskets of stocks or ETFs.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/streakLogo.png"
            alt="Streak logo"
            className="universe-logo"
          />
          <p className="text-small text-muted mt-3">
            Systematic trading platform that allows you to create and backtest
            strategies without coding.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/sensibullLogo.svg"
            alt="Sensibull logo"
            className="universe-logo"
          />
          <p className="text-small text-muted mt-3">
            Options trading platform that lets you create strategies, analyze
            positions, and trade directly.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/zerodhaFundhouse.png"
            alt="Zerodha Fundhouse logo"
            className="universe-logo"
          />
          <p className="text-small text-muted mt-3">
            Our asset management venture that is creating simple and transparent
            index funds to help you save for your goals.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/goldenpiLogo.png"
            alt="GoldenPi logo"
            className="universe-logo"
          />
          <p className="text-small text-muted mt-3">
            Bond investment platform to buy and sell corporate bonds and
            debentures online.
          </p>
        </div>
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4 mt-md-5">
          <img
            src="/media/images/dittoLogo.png"
            alt="Ditto logo"
            className="universe-logo-compact"
          />
          <p className="text-small text-muted mt-3">
            Personalized insurance advisory platform that helps you compare plans
            and buy insurance without spam.
          </p>
        </div>
        <div className="col-12 mt-3">
          <Link
            to="/signup"
            className="p-2 px-4 btn btn-primary fs-5 mb-5 mt-3 cta-btn"
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Universe;
