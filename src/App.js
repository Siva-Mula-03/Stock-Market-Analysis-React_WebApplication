import React, { useState } from 'react';
import { Header } from './components/Header';
import StockPriceChange from './components/Question1';
import Question2 from './components/Question2';
import Question3 from './components/Question3';
import Question4 from './components/Question4';
import Question5 from './components/Question5';
import Question6 from './components/Question6';
import Question7 from './components/Question7';

import Footer from './components/Footer';
import './App.css';
import Papa from 'papaparse';

function App() {
  const [data, setData] = useState([]);
  const [columnArray, setColumnArray] = useState([]);
  const [values, setValues] = useState([]);

  const handleFile = (event) => {
    Papa.parse(event.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const columnArray = [];
        const valuesArray = [];

        results.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        setData(results.data);
        setColumnArray(columnArray[0]);
        setValues(valuesArray);
      },
    });
  };

  return (
    <div>
      <Header />
      <input
        type="file"
        name="file"
        accept=".csv"
        onChange={handleFile}
        style={{ display: 'block', margin: '10px auto' }}
      />
      <br />

     
      <StockPriceChange data={data} />
      <Question2 data={data} />
      <hr/>
      <h1>Stock Profit/Loss</h1>
      <Question3 data={data} />
      <hr/>
    <Question4 data={data}/>
    <hr/>
    <Question5 data={data}/>
    <hr/>
    <Question6 data={data}/>
    <hr/>
    <Question7 data={data}/>
    <hr/>
   
    <br/>
    <br/>
    <Footer/>
    </div>
    
  );
}

export default App;
