import React, { useState } from 'react';
import '../App.css';

const StockProfitLoss = ({ data }) => {
  const [buyDate, setBuyDate] = useState('');
  const [sellDate, setSellDate] = useState('');
  const [stocks, setStocks] = useState([]);
  const [profitLoss, setProfitLoss] = useState('');

  const stockOptions = [
    'SBIN',
    'TATAMOTORS',
    'PNB',
    'YESBANK',
    'TECHM',
    'INFY',
    'TCS',
    'TITAN',
    'ONGC',
    'IOC',
  ];

  const addStock = () => {
    if (stocks.length < 2) {
      setStocks([...stocks, { stock: '', profitLoss: '' }]);
    }
  };

  const removeStock = (index) => {
    const updatedStocks = [...stocks];
    updatedStocks.splice(index, 1);
    setStocks(updatedStocks);
  };

  const calculateProfitLoss = () => {
    if (buyDate === '' || sellDate === '') {
      setProfitLoss('Please enter both buy and sell dates.');
      return;
    }

    let lowestProfitLoss = Number.POSITIVE_INFINITY;

    stocks.forEach((stock) => {
      const { stock: selectedStock } = stock;
      const filteredData = data.filter((row) => row.Company.trim() === selectedStock);

      if (filteredData.length === 0) {
        stock.profitLoss = 'No data available for the selected stock.';
        return;
      }

      const buyDateObj = new Date(buyDate);
      const sellDateObj = new Date(sellDate);

      const buyRow = filteredData.find((row) => {
        const rowDate = new Date(row.Date);
        return rowDate.toDateString() === buyDateObj.toDateString();
      });

      const sellRow = filteredData.find((row) => {
        const rowDate = new Date(row.Date);
        return rowDate.toDateString() === sellDateObj.toDateString();
      });

      if (!buyRow || !sellRow) {
        stock.profitLoss = 'Invalid buy or sell date for the selected stock.';
        return;
      }

      const buyPrice = parseFloat(buyRow.Close);
      const sellPrice = parseFloat(sellRow.Close);

      const stockProfitLoss = ((sellPrice - buyPrice) / buyPrice) * 100;
      stock.profitLoss = stockProfitLoss.toFixed(2);
      if (stockProfitLoss < lowestProfitLoss) {
        lowestProfitLoss = stockProfitLoss;
      }
    });

    if (lowestProfitLoss === Number.POSITIVE_INFINITY) {
      setProfitLoss('No Loss/Profit data available.');
    } else {
      setProfitLoss(`Profit/Loss (+:profit,-:loss): ${lowestProfitLoss.toFixed(2)}%`);
    }
    setStocks([...stocks]);
  };

  return (
    <div>
        <br/>
      <h1>Question 3:</h1>
      <h2>
      Take a date on which a stock is bought and a date on which it is sold. Find profit/loss of two or more stocks, for these two dates.
      </h2>

      <label id="labq1" htmlFor="buyDate">
        Buy Date:
      </label>
      <input
        type="text1"
        id="buyDate"
        value={buyDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        list="buyDates"
        onChange={(e) => setBuyDate(e.target.value)}
      />
      <datalist id="buyDates">
        {data && data.map((row) => <option key={row.Date}>{row.Date}</option>)}
      </datalist>

      <label id="labq1" htmlFor="sellDate">
        Sell Date:
      </label>
      <input
        type="text1"
        id="sellDate"
        value={sellDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        list="sellDates"
        onChange={(e) => setSellDate(e.target.value)}
      />
      <datalist id="sellDates">
        {data && data.map((row) => <option key={row.Date}>{row.Date}</option>)}
      </datalist>
      <br />

      
      {stocks.map((stock, index) => (
        <div key={index}>
           <label  id="labq3"htmlFor="stocks">
        Stocks:
      </label>
          <select id="o2"
            value={stock.stock}
            onChange={(e) => {
              const updatedStocks = [...stocks];
              updatedStocks[index].stock = e.target.value;
              setStocks(updatedStocks);
            }}
          >
          
            <option value="">Select Stock</option>
            {stockOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
         
          </select>
          <div className="button-container">
            <button onClick={() => removeStock(index)}>Remove</button>
            
          </div>
        </div>
      ))}

      <div className="button-container">
        <button onClick={addStock}>Add Stock</button>
        <button onClick={calculateProfitLoss}>Calculate</button>
      </div>

      <div>
        <h1>Profit/Loss:</h1>
        {stocks.map((stock, index) => (
          <div key={index}>
            <h1>Stock: {stock.stock}</h1>
           
          </div>
        ))}
        <h1>{profitLoss}</h1>
      </div>
    </div>
  );
};

export default StockProfitLoss;
