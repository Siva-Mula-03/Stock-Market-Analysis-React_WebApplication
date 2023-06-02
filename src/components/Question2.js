import React, { useState } from 'react';

const StockSort = ({ data }) => {
  const [sortDate, setSortDate] = useState('');
  const [sortedData, setSortedData] = useState([]);

  const sortStockData = () => {
    if (sortDate === '') {
      setSortedData([]);
      return;
    }
  
    const filteredData = data.filter((row) => row.Date === sortDate);
  
    if (filteredData.length === 0) {
      setSortedData([]);
      return;
    }
  
    const sortedData = filteredData.sort((a, b) => {
      if (a.Volume === b.Volume) {
        return b.Close - a.Close; // Sort based on highest close price if volumes are equal
      }
      return b.Volume - a.Volume; // Sort based on volume
    });
  
    setSortedData(sortedData);
    setSortDate('');
  };
  
  return (
    <div>
      <h1>Question 2:</h1>
      <h2>To sort stock data by volume and close prices on a particular day</h2>

      <label id="labq2" htmlFor="sortDate">Sort Date:</label>
      <input
        type="text1"
        id="sortDate"
        value={sortDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        onChange={(e) => setSortDate(e.target.value)}
      />

      <button onClick={sortStockData}>Sort</button>

      {sortedData.length > 0 ? (
        <div>
          <h1>Sorted Stocks:</h1>
          {sortedData.map((row, index) => (
            <div class="sortedstocks"key={index}>
                <ol>
              <p>Company: {row.Company}</p>
              <p>Date: {row.Date}</p>
              <p>Volume: {row.Volume}</p>
              <p>Close: {row.Close}</p>
              </ol>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
};

export default StockSort;
