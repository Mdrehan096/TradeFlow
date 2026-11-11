import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../config";
import { positions } from "../data/data";

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_URL}/allPositions`)
      .then((res) => {
        if (!isMounted) return;
        const rows =
          Array.isArray(res.data) && res.data.length > 0 ? res.data : positions;
        setAllPositions(rows);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Backend API not running, falling back to mock positions data:", err);
        setAllPositions(positions);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <h3 className="title">Positions ({allPositions.length})</h3>

      {loading ? (
        <p className="loading-text">Loading positions...</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg.</th>
                <th>LTP</th>
                <th>P&amp;L</th>
                <th>Chg.</th>
              </tr>
            </thead>
            <tbody>
              {allPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - stock.avg * stock.qty;
                const isProfit = pnl >= 0.0;
                const profClass = isProfit ? "profit" : "loss";
                const isDayLoss =
                  stock.isLoss || String(stock.day || "").trim().startsWith("-");
                const dayClass = isDayLoss ? "loss" : "profit";

                return (
                  <tr key={stock._id || stock.name || index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{Number(stock.avg).toFixed(2)}</td>
                    <td>{Number(stock.price).toFixed(2)}</td>
                    <td className={profClass}>{pnl.toFixed(2)}</td>
                    <td className={dayClass}>{stock.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Positions;
