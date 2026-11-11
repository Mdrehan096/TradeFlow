
import React, { useState, useContext, useEffect } from "react";

import GeneralContext from "./GeneralContext";

import { Tooltip, Grow } from "@mui/material";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import { watchlist } from "../data/data";
import { DoughnutChart } from "./DoughnoutChart";

const WatchList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStockName, setSelectedStockName] = useState("");
  const [analyticsStock, setAnalyticsStock] = useState(null);
  const { isWatchlistOpen, closeWatchlist } = useContext(GeneralContext);

  useEffect(() => {
    if (!isWatchlistOpen) {
      setSelectedStockName("");
    }
  }, [isWatchlistOpen]);

  const filteredWatchlist = watchlist.filter((stock) =>
    stock.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const data = {
    labels: filteredWatchlist.map((subArray) => subArray.name),
    datasets: [
      {
        label: "Price",
        data: filteredWatchlist.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <aside
      className={`watchlist-container${isWatchlistOpen ? " open" : ""}`}
      aria-label="Market Watchlist"
    >
      <div className="watchlist-mobile-header">
        <span>Market Watchlist ({filteredWatchlist.length})</span>
        <button
          type="button"
          className="watchlist-close-btn"
          onClick={() => {
            setSelectedStockName("");
            closeWatchlist();
          }}
          aria-label="Close watchlist"
        >
          ×
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
          aria-label="Search watchlist stocks"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="counts">{filteredWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {filteredWatchlist.length === 0 ? (
          <li className="watchlist-empty">No stocks match "{searchQuery}".</li>
        ) : (
          filteredWatchlist.map((stock) => (
            <WatchListItem
              stock={stock}
              key={stock.name}
              isSelected={selectedStockName === stock.name}
              onSelect={() =>
                setSelectedStockName((prev) =>
                  prev === stock.name ? "" : stock.name
                )
              }
              onClearSelection={() => setSelectedStockName("")}
              onInspect={(s) =>
                setAnalyticsStock((prev) => (prev?.name === s.name ? null : s))
              }
            />
          ))
        )}
      </ul>

      {analyticsStock && (
        <div className="watchlist-analytics-card">
          <div className="watchlist-analytics-header">
            <strong>{analyticsStock.name}</strong>
            <button
              type="button"
              onClick={() => setAnalyticsStock(null)}
              aria-label="Close stock details"
            >
              ×
            </button>
          </div>
          <p>
            LTP: <strong>₹{analyticsStock.price.toFixed(2)}</strong> · Change:{" "}
            <span className={analyticsStock.isDown ? "down" : "up"}>
              {analyticsStock.percent}
            </span>
          </p>
        </div>
      )}

      {filteredWatchlist.length > 0 && <DoughnutChart data={data} />}
    </aside>
  );
};

export default WatchList;

const WatchListItem = ({ stock, isSelected, onSelect, onClearSelection, onInspect }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => {
    setShowWatchlistActions(true);
  };

  const handleMouseLeave = () => {
    setShowWatchlistActions(false);
  };

  const actionsVisible = showWatchlistActions || isSelected;

  return (
    <li
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      className={isSelected ? "watchlist-row-selected" : undefined}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className="price">{stock.price}</span>
        </div>
      </div>
      {actionsVisible && (
        <WatchListActions
          stock={stock}
          onClearSelection={() => {
            setShowWatchlistActions(false);
            onClearSelection?.();
          }}
          onInspect={onInspect}
        />
      )}
    </li>
  );
};

const WatchListActions = ({ stock, onClearSelection, onInspect }) => {
  const generalContext = useContext(GeneralContext);

  const handleBuyClick = (e) => {
    e.stopPropagation();
    onClearSelection?.();
    generalContext.closeWatchlist();
    generalContext.openBuyWindow(stock.name, stock.price, "BUY");
  };

  const handleSellClick = (e) => {
    e.stopPropagation();
    onClearSelection?.();
    generalContext.closeWatchlist();
    generalContext.openBuyWindow(stock.name, stock.price, "SELL");
  };

  const handleInspectClick = (e) => {
    e.stopPropagation();
    onInspect(stock);
  };

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button type="button" className="buy" onClick={handleBuyClick}>
            Buy
          </button>
        </Tooltip>
        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button type="button" className="sell" onClick={handleSellClick}>
            Sell
          </button>
        </Tooltip>
        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button
            type="button"
            className="action"
            aria-label={`Analytics for ${stock.name}`}
            onClick={handleInspectClick}
          >
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button
            type="button"
            className="action"
            aria-label={`More options for ${stock.name}`}
            onClick={handleInspectClick}
          >
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
