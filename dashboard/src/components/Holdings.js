import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../config";
import { VerticalGraph } from "./VerticalGraph";
import { holdings } from "../data/data";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_URL}/allHoldings`)
      .then((res) => {
        if (!isMounted) return;
        const rows = Array.isArray(res.data) && res.data.length > 0 ? res.data : holdings;
        setAllHoldings(rows);
      })
      .catch((err) => {
        if (!isMounted) return;
        console.warn("Backend API not running, falling back to mock holdings data:", err);
        setAllHoldings(holdings);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.avg || 0) * Number(stock.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, stock) => sum + Number(stock.price || 0) * Number(stock.qty || 0),
    0
  );
  const totalPnl = currentValue - totalInvestment;
  const totalPnlPercent =
    totalInvestment > 0 ? (totalPnl / totalInvestment) * 100 : 0;

  const formatSplit = (val) => {
    const [whole, dec] = val.toFixed(2).split(".");
    return {
      whole: Number(whole).toLocaleString("en-IN"),
      dec,
    };
  };

  const invParts = formatSplit(totalInvestment);
  const curParts = formatSplit(currentValue);

  const labels = allHoldings.map((subArray) => subArray.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {loading ? (
        <p className="loading-text">Loading holdings...</p>
      ) : (
        <>
          <div className="order-table">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg. cost</th>
                  <th>LTP</th>
                  <th>Cur. val</th>
                  <th>P&amp;L</th>
                  <th>Net chg.</th>
                  <th>Day chg.</th>
                </tr>
              </thead>
              <tbody>
                {allHoldings.map((stock, index) => {
                  const curValue = stock.price * stock.qty;
                  const pnl = curValue - stock.avg * stock.qty;
                  const isProfit = pnl >= 0.0;
                  const profClass = isProfit ? "profit" : "loss";
                  const isDayLoss =
                    stock.isLoss || String(stock.day || "").trim().startsWith("-");
                  const dayClass = isDayLoss ? "loss" : "profit";

                  return (
                    <tr key={stock._id || stock.name || index}>
                      <td>{stock.name}</td>
                      <td>{stock.qty}</td>
                      <td>{Number(stock.avg).toFixed(2)}</td>
                      <td>{Number(stock.price).toFixed(2)}</td>
                      <td>{curValue.toFixed(2)}</td>
                      <td className={profClass}>{pnl.toFixed(2)}</td>
                      <td className={profClass}>{stock.net}</td>
                      <td className={dayClass}>{stock.day}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="row summary-metrics-row">
            <div className="col">
              <h5>
                {invParts.whole}.<span>{invParts.dec}</span>{" "}
              </h5>
              <p>Total investment</p>
            </div>
            <div className="col">
              <h5>
                {curParts.whole}.<span>{curParts.dec}</span>{" "}
              </h5>
              <p>Current value</p>
            </div>
            <div className="col">
              <h5 className={totalPnl >= 0 ? "profit" : "loss"}>
                {totalPnl.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}{" "}
                ({totalPnl >= 0 ? "+" : ""}
                {totalPnlPercent.toFixed(2)}%)
              </h5>
              <p>P&amp;L</p>
            </div>
          </div>
          <VerticalGraph data={data} />
        </>
      )}
    </>
  );
};

export default Holdings;
