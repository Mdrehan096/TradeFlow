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
    <div className="container mt-5">
      <div className="row">
        <div className="col-6">
          <img src={imageURL} alt={`${productName} product illustration`} />
        </div>
        <div className="col-6 p-5 mt-5">
          <h1>{productName}</h1>
          <p>{productDesription}</p>
          <div>
            <a href={tryDemo || "/signup"}>Try Demo</a>
            <a href={learnMore || "/products"} style={{ marginLeft: "50px" }}>
              Learn More
            </a>
          </div>
          <div className="mt-3">
            <a href={googlePlay || "https://play.google.com/store/apps"} target="_blank" rel="noreferrer">
              <img src="media/images/googlePlayBadge.svg" alt={`${productName} on Google Play`} />
            </a>
            <a href={appStore || "https://www.apple.com/app-store/"} target="_blank" rel="noreferrer">
              <img
                src="media/images/appstoreBadge.svg"
                alt={`${productName} on the App Store`}
                style={{ marginLeft: "50px" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
