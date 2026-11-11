import React, { useState, useCallback } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (uid, price, mode) => {},
  closeBuyWindow: () => {},
  isWatchlistOpen: false,
  openWatchlist: () => {},
  closeWatchlist: () => {},
  toggleWatchlist: () => {},
  ordersRefreshKey: 0,
  notifyOrderPlaced: (message) => {},
  orderToast: "",
  clearOrderToast: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isBuyWindowOpen, setIsBuyWindowOpen] = useState(false);
  const [selectedStockUID, setSelectedStockUID] = useState("");
  const [selectedStockPrice, setSelectedStockPrice] = useState(0);
  const [orderMode, setOrderMode] = useState("BUY");
  const [isWatchlistOpen, setIsWatchlistOpen] = useState(false);
  const [ordersRefreshKey, setOrdersRefreshKey] = useState(0);
  const [orderToast, setOrderToast] = useState("");

  const handleOpenBuyWindow = useCallback((uid, price = 0, mode = "BUY") => {
    setSelectedStockUID(uid);
    setSelectedStockPrice(Number(price) > 0 ? Number(price) : 0);
    setOrderMode(mode === "SELL" ? "SELL" : "BUY");
    setIsBuyWindowOpen(true);
  }, []);

  const handleCloseBuyWindow = useCallback(() => {
    setIsBuyWindowOpen(false);
    setSelectedStockUID("");
    setSelectedStockPrice(0);
    setOrderMode("BUY");
  }, []);

  const openWatchlist = useCallback(() => setIsWatchlistOpen(true), []);
  const closeWatchlist = useCallback(() => setIsWatchlistOpen(false), []);
  const toggleWatchlist = useCallback(
    () => setIsWatchlistOpen((prev) => !prev),
    []
  );

  const notifyOrderPlaced = useCallback((message) => {
    setOrdersRefreshKey((prev) => prev + 1);
    if (message) {
      setOrderToast(message);
    }
  }, []);

  const clearOrderToast = useCallback(() => setOrderToast(""), []);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        closeBuyWindow: handleCloseBuyWindow,
        isWatchlistOpen,
        openWatchlist,
        closeWatchlist,
        toggleWatchlist,
        ordersRefreshKey,
        notifyOrderPlaced,
        orderToast,
        clearOrderToast,
      }}
    >
      {props.children}
      {isBuyWindowOpen && (
        <BuyActionWindow
          uid={selectedStockUID}
          initialPrice={selectedStockPrice}
          mode={orderMode}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
