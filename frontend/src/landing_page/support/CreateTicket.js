import React, { useState } from "react";

const supportCategories = [
  {
    title: "Account Opening",
    icon: "fa-solid fa-circle-plus",
    topics: [
      "Online Account Opening",
      "Offline Account Opening",
      "Company, Partnership and HUF Account Opening",
      "NRI Account Opening",
      "Charges at Zerodha",
      "Zerodha IDFC FIRST Bank 3-in-1 Account",
      "Getting Started",
    ],
  },
  {
    title: "Your Zerodha Account",
    icon: "fa-solid fa-user",
    topics: [
      "Login Credentials",
      "Account Modification and Segment Addition",
      "DP ID and bank details",
      "Your Profile",
      "Transfer and conversion of shares",
    ],
  },
  {
    title: "Trading and Markets",
    icon: "fa-solid fa-chart-column",
    topics: [
      "Margin/leverage, Product and Order types",
      "Kite Web and Mobile",
      "Trading FAQs",
      "Corporate Actions",
      "Sentinel",
      "Kite API",
      "Intraday margins",
    ],
  },
  {
    title: "Funds",
    icon: "fa-solid fa-credit-card",
    topics: [
      "Adding Funds",
      "Fund Withdrawal",
      "eMandates",
      "Adding Bank Accounts",
    ],
  },
  {
    title: "Console",
    icon: "fa-solid fa-circle-notch",
    topics: [
      "Reports",
      "Ledger",
      "Portfolio",
      "60 Day Challenge",
      "IPO",
      "Referral Program",
    ],
  },
  {
    title: "Coin",
    icon: "fa-regular fa-circle",
    topics: [
      "Understanding Mutual Funds",
      "About Coin",
      "Buying and Selling through Coin",
      "Starting an SIP",
      "Managing your Portfolio",
      "Government Securities",
    ],
  },
];

function CreateTicket({ searchQuery = "" }) {
  const [selectedTopic, setSelectedTopic] = useState("");
  const query = searchQuery.trim().toLowerCase();

  const filteredCategories = supportCategories
    .map((category) => {
      if (!query) return category;
      const categoryMatches = category.title.toLowerCase().includes(query);
      const matchingTopics = category.topics.filter((t) =>
        t.toLowerCase().includes(query)
      );
      if (categoryMatches) return category;
      if (matchingTopics.length > 0) {
        return { ...category, topics: matchingTopics };
      }
      return null;
    })
    .filter(Boolean);

  const topicStyle = {
    textDecoration: "none",
    lineHeight: "2.1",
    color: "#387ed1",
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 0,
    textAlign: "left",
  };

  return (
    <div className="container">
      <div className="row p-3 p-md-5 mt-3 mt-md-4 mb-4 mb-md-5">
        <div className="col-12">
          <h1 className="fs-2 mb-3">
            To create a ticket, select a relevant topic
          </h1>
          {selectedTopic && (
            <div className="alert alert-info d-flex justify-content-between align-items-center py-2 px-3">
              <span>
                Selected topic: <strong>{selectedTopic}</strong> — Help guides
                and ticket creation are ready once logged in to the terminal.
              </span>
              <button
                type="button"
                className="btn-close"
                aria-label="Clear selected topic"
                onClick={() => setSelectedTopic("")}
              />
            </div>
          )}
        </div>

        {filteredCategories.length === 0 ? (
          <div className="col-12 py-4 text-muted">
            No support topics matched "{searchQuery}". Try clearing your search
            or browsing all topics.
          </div>
        ) : (
          filteredCategories.map((category) => (
            <div
              className="col-12 col-md-6 col-lg-4 p-3 p-md-4 mt-2 mb-2"
              key={category.title}
            >
              <h4 className="fs-5 mb-3">
                <i
                  className={`${category.icon} me-2`}
                  aria-hidden="true"
                />
                {category.title}
              </h4>

              <div className="d-flex flex-column align-items-start">
                {category.topics.map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    style={topicStyle}
                    onClick={() => setSelectedTopic(topic)}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CreateTicket;