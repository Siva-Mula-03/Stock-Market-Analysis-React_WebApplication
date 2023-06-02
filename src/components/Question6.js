import React, { useState } from 'react';
import '../App.css';

const StockPerformance = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [stockPerformances, setStockPerformances] = useState([]);

  const findStockPerformances = () => {
    if (startDate === '' || endDate === '') {
      setStockPerformances([]);
      return;
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    const stockPerformances = {};

    data.forEach((row, index) => {
      const rowDateTime = new Date(row.Date).getTime();
      if (rowDateTime >= startDateTime && rowDateTime <= endDateTime) {
        const volume = parseFloat(row.Volume);
        const previousClose = parseFloat(data[index - 1]?.Close) || parseFloat(row.Close);
        const close = parseFloat(row.Close);
        const percentageChange = ((close - previousClose) / previousClose) * 100;

        if (stockPerformances[row.Company]) {
          stockPerformances[row.Company] += percentageChange * volume;
        } else {
          stockPerformances[row.Company] = percentageChange * volume;
        }
      }
    });

    const sortedPerformances = Object.entries(stockPerformances).sort(
      ([, performanceA], [, performanceB]) => performanceA - performanceB
    );

    setStockPerformances(sortedPerformances);
  };

  return (
    <div>
      <h1>Question 6:</h1>
      <h2>
        To list all stocks in increasing order of overall performance for a specified duration
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

      <button onClick={findStockPerformances}>Find Stock Performances</button>

      <div>
        <h1>Stock Performances:</h1>
        {stockPerformances.length > 0 ? (
          <ul>
            {stockPerformances.map(([stock, performance]) => (
              <h2 key={stock}>
                {stock}: {performance.toFixed(2)}
              </h2>
            ))}
          </ul>
        ) : (
          <p>No data available for the specified duration.</p>
        )}
      </div>
    </div>
  );
};

export default StockPerformance;
