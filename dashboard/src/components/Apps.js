import React from "react";

const appsList = [
  {
    name: "Console",
    description: "Backoffice reporting, tax P&L, and portfolio analytics.",
    status: "Connected",
  },
  {
    name: "Coin",
    description: "Zero-commission direct mutual funds delivered to your demat.",
    status: "Connected",
  },
  {
    name: "Streak",
    description: "Create, backtest, and deploy trading strategies without code.",
    status: "Available",
  },
  {
    name: "Sensibull",
    description: "Options strategy builder, Greeks analysis, and payoff charts.",
    status: "Available",
  },
  {
    name: "Smallcase",
    description: "Invest in curated thematic stock and ETF baskets.",
    status: "Available",
  },
  {
    name: "Varsity",
    description: "Structured stock market lessons and trading guides.",
    status: "Connected",
  },
];

const Apps = () => {
  return (
    <div className="apps-page">
      <h3 className="title">Apps ({appsList.length})</h3>
      <div className="apps-grid">
        {appsList.map((app) => (
          <div className="app-card" key={app.name}>
            <div className="app-card-header">
              <h4>{app.name}</h4>
              <span
                className={`app-status ${
                  app.status === "Connected" ? "connected" : "available"
                }`}
              >
                {app.status}
              </span>
            </div>
            <p>{app.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;
