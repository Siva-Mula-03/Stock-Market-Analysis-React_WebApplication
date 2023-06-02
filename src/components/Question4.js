import React, { useState } from 'react';
import '../App.css';

const StockProfitLoss = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [highestPerformingStock, setHighestPerformingStock] = useState('');

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

  const findHighestPerformingStock = () => {
    if (startDate === '' || endDate === '') {
      setHighestPerformingStock('Please enter both start and end dates.');
      return;
    }
  
    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    let highestGain = -Infinity;
    let highestStock = null;
  
    stockOptions.forEach((stock) => {
      let filteredData = data.filter((row) => {
        const rowDateTime = new Date(row.Date).getTime();
        return rowDateTime >= startDateTime && rowDateTime <= endDateTime && row.Company.trim() === stock.trim();
      });
  
      filteredData = filteredData.sort((a, b) => {
        const dateA = new Date(a.Date).getTime();
        const dateB = new Date(b.Date).getTime();
        return dateA - dateB;
      });
  
      if (filteredData.length > 1) {
        const startingPrice = parseFloat(filteredData[0].Open);
        const endingPrice = parseFloat(filteredData[filteredData.length - 1].Close);
        const gainPercentage = ((endingPrice - startingPrice) / startingPrice) * 100;
  
        if (gainPercentage > highestGain) {
          highestGain = gainPercentage;
          highestStock = stock;
        }
      }
    });
  
    if (highestStock) {
      setHighestPerformingStock(`Highest Performing Stock: ${highestStock} (+${highestGain.toFixed(2)}%)`);
    } else {
      setHighestPerformingStock('No data available for the specified duration or stocks.');
    }
  };
  
  return (
    <div>
      <h1>Question 4:</h1>
      <h2>
        To find the highest performing stock for a specified duration based on the percentage gain
      </h2>

      <label id="labq1"htmlFor="startDate">Start Date:</label>
      <input
        type="text1"
        id="startDate"
        value={startDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label id="labq1" htmlFor="endDate">End Date:</label>
      <input
        type="text1"
        id="endDate"
        value={endDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={findHighestPerformingStock}>Find Highest Performing Stock</button>

      <div>
        <h1>{highestPerformingStock}</h1>
      </div>
    </div>
  );
};

export default StockProfitLoss;
