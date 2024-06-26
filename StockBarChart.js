import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StockBarChart = () => {
  const [chartData, setChartData] = useState({});
  const [daysToShow, setDaysToShow] = useState(30);

  const apiKey = 'demo';
  const symbol = 'IBM';
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const series = response.data['Time Series (Daily)'];

        if (!series) {
          console.error('Datos no encontrados en la respuesta', response.data);
          return;
        }

        const dates = Object.keys(series).reverse().slice(0, daysToShow);
        const prices = dates.map(date => parseFloat(series[date]['4. close']));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Precio de cierre - ${symbol}`,
              data: prices,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, symbol, daysToShow]);

  return (
    <div>
      <h2>Gráfico de Barras de Precios de Cierre Diarios - {symbol}</h2>
      <div style={{ width: '900px', height: '600px' }}>
        {chartData.labels ? <Bar data={chartData} options={{ maintainAspectRatio: false, responsive: true }} /> : <p>Cargando gráfico...</p>}
      </div>
      <div style={{ width: '900px', maxWidth: '100%', margin: '20px auto' }}>
        <input
          type="range"
          min="5"
          max="30"
          value={daysToShow}
          onChange={(e) => setDaysToShow(e.target.value)}
          style={{ width: '100%' }}
        />
        <p>Días mostrados: {daysToShow}</p>
      </div>
    </div>
  );
};

export default StockBarChart;
