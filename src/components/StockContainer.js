import React from "react";
import Stock from "./Stock";

function StockContainer({ stockData, onBuyStock }) {
  const stockElements = stockData.map(stock=> <Stock key={stock.id} stock={stock} onStockClick={onBuyStock}/>)

  return (
    <div>
      <h2>Stocks</h2>
      {stockElements}
    </div>
  );
}

export default StockContainer;
