import React, { useState } from 'react';
import '../App.css';

const AverageStockValue = ({ data }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [averageValues, setAverageValues] = useState([]);
  const [overallAverage, setOverallAverage] = useState('');

  const findAverageStockValue = () => {
    if (startDate === '' || endDate === '') {
      setAverageValues([]);
      setOverallAverage('');
      return;
    }

    const startDateTime = new Date(startDate).getTime();
    const endDateTime = new Date(endDate).getTime();

    const averageValues = {};
    let overallTotalValue = 0;
    let overallTotalVolume = 0;

    data.forEach((row) => {
      const rowDateTime = new Date(row.Date).getTime();
      if (rowDateTime >= startDateTime && rowDateTime <= endDateTime) {
        const price = parseFloat(row.Close);
        const volume = parseFloat(row.Volume);
        const value = price * volume;

        if (averageValues[row.Company]) {
          averageValues[row.Company].totalValue += value;
          averageValues[row.Company].totalVolume += volume;
        } else {
          averageValues[row.Company] = {
            totalValue: value,
            totalVolume: volume,
          };
        }

        overallTotalValue += value;
        overallTotalVolume += volume;
      }
    });

    const companyResults = Object.entries(averageValues).map(([company, values]) => ({
      company,
      averageValue: (values.totalValue / values.totalVolume).toFixed(2),
    }));

    const overallAverageValue = (overallTotalValue / overallTotalVolume).toFixed(2);

    setAverageValues(companyResults);
    setOverallAverage(overallAverageValue);
  };

  return (
    <div>
      <h1>Question 7:</h1>
      <h2>
        To find the average value of all stocks from start to end dates (company-wise and overall)
      </h2>

      <label id="labq1" htmlFor="startDate">
        Start Date:
      </label>
      <input
        type="text1"
        id="startDate"
        value={startDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        onChange={(e) => setStartDate(e.target.value)}
      />

      <label id="labq1" htmlFor="endDate">
        End Date:
      </label>
      <input
        type="text1"
        id="endDate"
        value={endDate}
        placeholder="Enter in dd-mm-yy format"
        autoComplete="off"
        onChange={(e) => setEndDate(e.target.value)}
      />

      <button onClick={findAverageStockValue}>Find Average Stock Value</button>

      <div>
  <h1>Average Stock Values:</h1>
  {averageValues.length > 0 ? (
    <ul>
      {averageValues.map(({ company, averageValue }) => (
        <h2 key={company}>
          <strong>{company}</strong>: {averageValue}
        </h2>
      ))}
    </ul>
  ) : (
    <p>No data available for the specified duration.</p>
  )}
</div>


      <div>
        <h1>Overall Average Stock Value:</h1>
        {overallAverage !== '' ? (
          <p id="h3">{overallAverage}</p>
        ) : (
          <p>No data available for the specified duration.</p>
        )}
      </div>
    </div>
  );
};

export default AverageStockValue;
