import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container py-4 py-md-5 px-3 px-md-5 mb-4">
      <div className="row text-center justify-content-center">
        <div className="col-12">
          <img
            src="/media/images/homeHero.png"
            alt="Zerodha trading dashboard"
            className="mb-4 mb-md-5 img-fluid hero-img"
          />
          <h1 className="mt-3 mt-md-4">Invest in everything</h1>
          <p className="text-muted my-3">
            Online platform to invest in stocks, derivatives, mutual funds, and
            more
          </p>
          <Link
            to="/signup"
            className="p-2 px-4 btn btn-primary fs-5 mb-4 mt-2 cta-btn"
          >
            Signup Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
