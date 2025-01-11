import React from "react";
import Stock from "./Stock";

function StockContainer({ stocks, onBuyStock }) {
  const stockElements = stocks.map(stock=> <Stock key={stock.id} stock={stock} onClickStock={onBuyStock}/>)

  return (
    <div>
      <h2>Stocks</h2>
      {stockElements}
    </div>
  );
}

export default StockContainer;
