import React from "react";

function LeftSection({
  imageURL,
  productName,
  productDesription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-4 mt-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6 p-3 p-md-4 text-center">
          <img
            src={imageURL}
            alt={`${productName} product illustration`}
            className="img-fluid"
          />
        </div>
        <div className="col-12 col-lg-6 p-3 p-md-5 mt-2 mt-lg-4">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div className="d-flex flex-wrap gap-4">
            <a href={tryDemo || "#"} style={{ textDecoration: "none" }}>
              Try Demo
            </a>
            <a href={learnMore || "#"} style={{ textDecoration: "none" }}>
              Learn More
            </a>
          </div>
          <div className="d-flex flex-wrap align-items-center gap-3 gap-md-4 mt-3">
            <a
              href={googlePlay || "https://play.google.com/store/apps"}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/media/images/googlePlayBadge.svg"
                alt={`${productName} on Google Play`}
              />
            </a>
            <a
              href={appStore || "https://www.apple.com/app-store/"}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="/media/images/appstoreBadge.svg"
                alt={`${productName} on the App Store`}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
