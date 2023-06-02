import React, { useState } from 'react';
import '../App.css';

const StockPriceChange = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedStock, setSelectedStock] = useState('');
  const [percentageChange, setPercentageChange] = useState('');

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

  const calculatePercentageChange = () => {
    if (startDate === '' || endDate === '' || selectedStock === '') {
      setPercentageChange('Please enter both start and end dates and select a stock.');
      return;
    }
  
    const filteredData = data.filter((row) => row.Company.trim() === selectedStock);
  
    if (filteredData.length === 0) {
      setPercentageChange('No data available for the selected stock.');
      return;
    }
  
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    const startRow = filteredData.find((row) => {
      const rowDate = new Date(row.Date);
      return rowDate.toDateString() === startDateObj.toDateString();
    });
  
    const endRow = filteredData.find((row) => {
      const rowDate = new Date(row.Date);
      return rowDate.toDateString() === endDateObj.toDateString();
    });
  
    if (!startRow || !endRow) {
      setPercentageChange('Invalid start or end date for the selected stock.');
      return;
    }
  
    const startPrice = parseFloat(startRow.Close);
    const endPrice = parseFloat(endRow.Close);
  
    const percentageChange = ((endPrice - startPrice) / startPrice) * 100;
    setPercentageChange(`Percentage Change in the price of ${selectedStock} Stock from ${startDate} to ${endDate}: ${percentageChange.toFixed(3)}%`);
  
    setStartDate('');
    setEndDate('');
    setSelectedStock('');
  
  };
  
  return (
    <div>
      <h1>Question 1:</h1>
      <h2>To find the percentage change in the price of a stock from the start to the end date specified by the user</h2>
      
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

      <label id="labq1" htmlFor="stock">Select Stock:</label>
      <select id="selectstock" value={selectedStock} onChange={(e) => setSelectedStock(e.target.value)}>
        <option value="">-- Select Stock --</option>
        {stockOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button onClick={calculatePercentageChange}>Calculate</button>

      <h1>Result:{percentageChange}</h1>
      <hr/>
      <br/>
    </div>
  );
};

export default StockPriceChange;
