import React, { useState } from "react";

function Hero({ searchQuery = "", onSearchChange }) {
  const [ticketNotice, setTicketNotice] = useState("");

  const handleQuickTopic = (topic) => {
    if (onSearchChange) {
      onSearchChange(topic);
    }
    setTicketNotice(`Showing help topics matching "${topic}".`);
  };

  return (
    <section className="container-fluid py-3 py-md-4" id="supportHero">
      <div className="container">
        <div className="py-3 py-md-4" id="supportWrapper">
          <h4 className="mb-0">Support Portal</h4>
          <button
            type="button"
            className="btn btn-link p-0 support-link-btn"
            onClick={() =>
              setTicketNotice(
                "Ticket tracking requires an active trading session. Sign up or open your dashboard to view tickets."
              )
            }
          >
            Track Tickets
          </button>
        </div>

        {ticketNotice && (
          <div
            className="alert alert-light text-dark d-flex justify-content-between align-items-center py-2 px-3 mb-3"
            role="status"
          >
            <span>{ticketNotice}</span>
            <button
              type="button"
              className="btn-close"
              aria-label="Close notice"
              onClick={() => setTicketNotice("")}
            />
          </div>
        )}

        <div className="row py-3 py-md-4 g-4">
          <div className="col-12 col-lg-7">
            <h1 className="fs-3 mb-3">
              Search for an answer or browse help topics to create a ticket
            </h1>

            <input
              type="search"
              placeholder="Eg. how do I activate F&O, why is my order getting rejected..."
              aria-label="Search support topics"
              value={searchQuery}
              onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            />

            <div className="support-quick-links">
              <button
                type="button"
                className="btn btn-link p-0 support-link-btn"
                onClick={() => handleQuickTopic("Account Opening")}
              >
                Track account opening
              </button>
              <button
                type="button"
                className="btn btn-link p-0 support-link-btn"
                onClick={() => handleQuickTopic("Segment")}
              >
                Track segment activation
              </button>
              <button
                type="button"
                className="btn btn-link p-0 support-link-btn"
                onClick={() => handleQuickTopic("margins")}
              >
                Intraday margins
              </button>
              <button
                type="button"
                className="btn btn-link p-0 support-link-btn"
                onClick={() => handleQuickTopic("Kite")}
              >
                Kite user manual
              </button>
            </div>
          </div>

          <div className="col-12 col-lg-5">
            <h1 className="fs-3 mb-3">Featured</h1>
            <ol className="ps-3 lh-lg">
              <li>
                Current Takeovers and Delisting - January 2024
              </li>
              <li>
                Latest Intraday leverages - MIS &amp; CO
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;