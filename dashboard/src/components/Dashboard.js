import React, { useContext, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";

import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import GeneralContext from "./GeneralContext";

const Dashboard = () => {
  const { isWatchlistOpen, closeWatchlist, orderToast, clearOrderToast } =
    useContext(GeneralContext);

  useEffect(() => {
    if (!orderToast) return undefined;
    const timer = setTimeout(() => {
      clearOrderToast();
    }, 4000);
    return () => clearTimeout(timer);
  }, [orderToast, clearOrderToast]);

  return (
    <div className="dashboard-container">
      {isWatchlistOpen && (
        <div
          className="watchlist-backdrop"
          onClick={closeWatchlist}
          aria-hidden="true"
        />
      )}
      <WatchList />
      <div className="content">
        {orderToast && (
          <div className="order-toast" role="status">
            <span>{orderToast}</span>
            <button
              type="button"
              className="toast-close"
              aria-label="Dismiss notification"
              onClick={clearOrderToast}
            >
              ×
            </button>
          </div>
        )}
        <Routes>
          <Route path="/" element={<Summary />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/holdings" element={<Holdings />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/funds" element={<Funds />} />
          <Route path="/apps" element={<Apps />} />
          <Route
            path="*"
            element={
              <div className="no-orders">
                <p>The requested dashboard page could not be found.</p>
                <Link to="/" className="btn btn-blue">
                  Back to Summary
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
