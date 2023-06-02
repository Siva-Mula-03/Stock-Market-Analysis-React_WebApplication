import React, { useState } from 'react';
import '../App.css';

const StockProfitLoss = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [lowestPerformingStock, setLowestPerformingStock] = useState('');

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

  const findLowestPerformingStock = () => {
    if (startDate === '' || endDate === '') {
      setLowestPerformingStock('Please enter both start and end dates.');
      return;
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();
    let lowestGain = Infinity;
    let lowestStock = null;

    stockOptions.forEach((stock) => {
      const filteredData = data.filter((row) => {
        const rowDateTime = new Date(row.Date).getTime();
        return rowDateTime >= startDateTime && rowDateTime <= endDateTime && row.Company.trim() === stock;
      });

      if (filteredData.length > 1) {
        const startingPrice = parseFloat(filteredData[0].Close);
        const endingPrice = parseFloat(filteredData[filteredData.length - 1].Close);
        const gainPercentage = ((endingPrice - startingPrice) / startingPrice) * 100;

        if (gainPercentage < lowestGain) {
          lowestGain = gainPercentage;
          lowestStock = stock;
        }
      }
    });

    if (lowestStock) {
      setLowestPerformingStock(`Lowest Performing Stock: ${lowestStock} (${lowestGain.toFixed(2)}%)`);
    } else {
      setLowestPerformingStock('No data available for the specified duration.');
    }
  };

  return (
    <div>
      <h1>Question 5:</h1>
      <h2>
        To find the lowest performing stock for a specified duration based on the percentage gain
      </h2>

      <label id="labq1" htmlFor="startDate">Start Date:</label>
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

      <button onClick={findLowestPerformingStock}>Find Lowest Performing Stock</button>

      <div>
        <h1>{lowestPerformingStock}</h1>
      </div>
    </div>
  );
};

export default StockProfitLoss;
