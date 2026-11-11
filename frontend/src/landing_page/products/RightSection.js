import React from "react";

function RightSection({ imageURL, productName, productDesription, learnMore }) {
  return (
    <div className="container mt-4 mt-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 p-3 p-md-5 mt-2 mt-lg-4 order-2 order-lg-1">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={learnMore || "#"} style={{ textDecoration: "none" }}>
              Learn More
            </a>
          </div>
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-4 text-center order-1 order-lg-2">
          <img
            src={imageURL}
            alt={`${productName} product illustration`}
            className="img-fluid"
          />
        </div>
      </div>
    </div>
  );
}

export default RightSection;
