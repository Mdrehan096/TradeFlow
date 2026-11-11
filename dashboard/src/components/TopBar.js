import React, { useContext } from "react";

import Menu from "./Menu";
import GeneralContext from "./GeneralContext";

const TopBar = () => {
  const { isWatchlistOpen, toggleWatchlist } = useContext(GeneralContext);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="indices-group">
          <div className="nifty">
            <p className="index">NIFTY 50</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>
          <div className="sensex">
            <p className="index">SENSEX</p>
            <p className="index-points">{100.2}</p>
            <p className="percent"></p>
          </div>
        </div>
        <button
          type="button"
          className={`mobile-watchlist-btn${isWatchlistOpen ? " active" : ""}`}
          onClick={toggleWatchlist}
          aria-expanded={isWatchlistOpen}
          aria-label="Toggle watchlist sidebar"
        >
          {isWatchlistOpen ? "Close Watchlist" : "Watchlist"}
        </button>
      </div>

      <Menu />
    </div>
  );
};

export default TopBar;
