import React from "react";

function Stock({ stock, onClickStock }) {
  const {id, name, price, ticker, type} = stock

  return (
    <div>
      <div className="card" onClick={()=>onClickStock(stock)}>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{ticker}: {price}</p>
        </div>
      </div>
    </div>
  );
}
export default Stock;
