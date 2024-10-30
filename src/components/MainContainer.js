import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

const API = `http://localhost:3001/stocks`

function MainContainer() {
  const [allStocks, setAllStocks] = useState([])
  const [myStocks, setMyStocks] = useState([])
  const [filterBy, setFilterBy] = useState("")
  const [sortBy, setSortBy] = useState("")

  const displayStocks = allStocks
    .filter(stock=>{
      if(filterBy){
        return stock.type === filterBy
      } 
      return true
    })
    .sort((a,b)=>{
      if(sortBy === "Alphabetically"){
        return a.name.localeCompare(b.name)
      } else if(sortBy === "Price"){
        return a.price - b.price
      } 
      return 0
    })

  useEffect(()=>{
    fetch(API)
    .then(r=>r.json())
    .then(stockData=>setAllStocks(stockData))
  }, [])

  function handleBuyStock(newStock){
    setMyStocks([
      ...myStocks,
      newStock
    ])
  }

  function handleSellStock(soldStock){
    const newStockList = myStocks.filter(stock=>stock.id !== soldStock.id)
    setMyStocks(newStockList)
  }

  function handleChangeFilter(e){
    setFilterBy(e.target.value)
  }

  function handleChangeSort(e){
    setSortBy(e.target.value)
  }

  return (
    <div>
      <SearchBar filterBy={filterBy} sortBy={sortBy} onChangeFilter={handleChangeFilter} onChangeSort={handleChangeSort}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stockData={displayStocks} onBuyStock={handleBuyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stockData={myStocks} onSellStock={handleSellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
