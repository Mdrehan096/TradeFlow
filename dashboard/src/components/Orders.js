import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import API_URL from "../config";
import GeneralContext from "./GeneralContext";

const Orders = () => {
  const { ordersRefreshKey } = useContext(GeneralContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMsg("");

    axios
      .get(`${API_URL}/allOrders`)
      .then((res) => {
        if (!isMounted) return;
        setOrders(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Unable to fetch orders from backend:", err);
        setErrorMsg("Unable to fetch orders from the server. Please try again.");
        setOrders([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [ordersRefreshKey, retryTick]);

  if (loading) {
    return (
      <div className="orders">
        <p className="loading-text">Loading orders...</p>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="orders">
        <div className="orders-error-card" role="alert">
          <p>{errorMsg}</p>
          <button
            type="button"
            className="btn btn-blue"
            onClick={() => setRetryTick((prev) => prev + 1)}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <div className="no-orders">
          <p>You haven't placed any orders today</p>

          <Link to="/" className="btn btn-blue">
            Get started
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orders">
      <h3 className="title">Orders ({orders.length})</h3>
      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Price</th>
              <th>Total Value</th>
              <th>Placed</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const total = Number(order.qty || 0) * Number(order.price || 0);
              const isSell = String(order.mode || "").toUpperCase() === "SELL";
              return (
                <tr key={order._id || index}>
                  <td>
                    <span
                      className={`order-mode-badge ${isSell ? "sell-badge" : "buy-badge"}`}
                    >
                      {order.mode || "BUY"}
                    </span>
                  </td>
                  <td>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{Number(order.price).toFixed(2)}</td>
                  <td>{total.toFixed(2)}</td>
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Today"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
