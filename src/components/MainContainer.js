import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [myPortfolio, setMyPortfolio] = useState([])
  const [sortBy, setSortBy] = useState("")
  const [filter, setFilter] = useState("All")

  useEffect(()=>{
    fetch(`http://localhost:3001/stocks`)
    .then(r=>r.json())
    .then(stockData=>{
        console.log(stockData)
        setStocks(stockData)
      })
  }, [])

  function handleBuyStock(boughtStock){
    setMyPortfolio([
      ...myPortfolio,
      boughtStock
    ])
  }

  function handleSellStock(soldStock){
    const newPortfolioArr = myPortfolio.filter(stock=>stock.id !== soldStock.id)
    setMyPortfolio(newPortfolioArr)
  }

  function sortStocks(){
    let sortedStocks = stocks
    if(sortBy === "Alphabetically"){
      sortedStocks = stocks.sort((a, b) => a.name.localeCompare(b.name))
    } else if (sortBy === "Price"){
      sortedStocks = stocks.sort((a, b) => a.price - b.price)
    }
    return sortedStocks
  }

  function filterStocks(sortedStocks){
    let filterStocks = sortedStocks
    
  }

  const displayStocks = sortStocks().filter(stock=>{
    if(filter === "All"){
      return true
    } else {
      return stock.type === filter
    }
  })

  return (
    <div>
      <SearchBar sortBy={sortBy} setSortBy={setSortBy} filter={filter} setFilter={setFilter}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={displayStocks} onBuyStock={handleBuyStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={myPortfolio} onSellStock={handleSellStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
