import React, { useEffect, useState } from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks, setStocks] = useState([])
  const [portfolioStocks, setPortfolioStocks] = useState([])
  const [filterBy, setFilterBy] = useState("All")
  const [sortBy, setSortBy] = useState("")

  useEffect(()=>{
    fetch("http://localhost:3001/stocks")
    .then(r=>r.json())
    .then(stockData=>setStocks(stockData))
  }, [])

  function handleAddStock(newStock){
    if(portfolioStocks.find(stock=> stock.id === newStock.id)) {
      return null
    } else {
      setPortfolioStocks([
        ...portfolioStocks,
        newStock
      ])
    }
  }

  function handleRemoveStock(oldStock){
    const updatedPortfolio = portfolioStocks.filter(stock=> stock.id !== oldStock.id)
    setPortfolioStocks(updatedPortfolio)
  }

  function handleFilterChange(e){
    setFilterBy(e.target.value)
  }

  function handleSort(e){
    setSortBy(e.target.value)
    if(e.target.value === "Alphabetically"){
      const stocksAtoZ = stocks.sort((a,b)=> a.ticker.localeCompare(b.ticker))
      setStocks(stocksAtoZ)
      const portfolioAtoZ = portfolioStocks.sort((a,b)=> a.ticker.localeCompare(b.ticker))
      setPortfolioStocks(portfolioAtoZ)
    } else if (e.target.value === "Price"){
      const stocksByPrice = stocks.sort((a,b)=> a.price - b.price)
      setStocks(stocksByPrice)
      const portfolioByPrice = portfolioStocks.sort((a,b)=> a.price - b.price)
      setPortfolioStocks(portfolioByPrice)
    }
  }

  return (
    <div>
      <SearchBar filterBy={filterBy} sortBy={sortBy} onSort={handleSort} onFilterChange={handleFilterChange}/>
      <div className="row">
        <div className="col-8">
          <StockContainer stocks={filterBy === "All" ? stocks : stocks.filter(stock=> stock.type === filterBy)} onStockClick={handleAddStock}/>
        </div>
        <div className="col-4">
          <PortfolioContainer stocks={portfolioStocks} onStockClick={handleRemoveStock}/>
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
