import React, { useEffect, useState } from "react";
import axios from "axios";

import API_URL from "../config";
import { holdings } from "../data/data";

const formatK = (value) => {
  if (Math.abs(value) >= 1000) {
    return `${(value / 1000).toFixed(2)}k`;
  }
  return value.toFixed(2);
};

const Summary = () => {
  const [allHoldings, setAllHoldings] = useState(holdings);

  useEffect(() => {
    let isMounted = true;
    axios
      .get(`${API_URL}/allHoldings`)
      .then((res) => {
        if (!isMounted) return;
        if (Array.isArray(res.data) && res.data.length > 0) {
          setAllHoldings(res.data);
        }
      })
      .catch(() => {
        // Fallback to default holdings data already initialized
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const investment = allHoldings.reduce(
    (sum, s) => sum + Number(s.avg || 0) * Number(s.qty || 0),
    0
  );
  const currentValue = allHoldings.reduce(
    (sum, s) => sum + Number(s.price || 0) * Number(s.qty || 0),
    0
  );
  const pnl = currentValue - investment;
  const pnlPct = investment > 0 ? (pnl / investment) * 100 : 0;

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Margins used <span>0</span>
            </p>
            <p>
              Opening balance <span>3.74k</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({allHoldings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnl >= 0 ? "profit" : "loss"}>
              {formatK(pnl)}{" "}
              <small>
                {pnl >= 0 ? "+" : ""}
                {pnlPct.toFixed(2)}%
              </small>
            </h3>
            <p>P&amp;L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatK(currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatK(investment)}</span>
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
