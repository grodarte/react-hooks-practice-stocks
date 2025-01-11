import React from "react";
import Stock from "./Stock";

function PortfolioContainer({ stocks, onSellStock }) {
  const portfolioElements = stocks.map(stock=><Stock key={stock.id} stock={stock} onClickStock={onSellStock}/>)

  return (
    <div>
      <h2>My Portfolio</h2>
      {portfolioElements}
    </div>
  );
}

export default PortfolioContainer;
