import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState({});

  const apiKey = 'TU_ALPHA_VANTAGE_API_KEY'; // Reemplaza con tu clave API
  const fetchUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  const fetchData = async () => {
    const response = await axios.get(fetchUrl);
    const data = response.data['Time Series (Daily)']; // Estructura de datos de Alpha Vantage

    const dates = Object.keys(data).reverse(); // Las fechas vienen en orden descendente
    const prices = dates.map(date => data[date]['4. close']); // Precio de cierre

    setChartData({
      labels: dates,
      datasets: [
        {
          label: `Precio de cierre - ${symbol}`,
          data: prices,
          fill: false,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
        },
      ],
    });
  };

  useEffect(() => {
    fetchData();
  }, [symbol]);

  return <Line data={chartData} />;
};

export default StockChart;
