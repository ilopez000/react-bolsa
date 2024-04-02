import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = () => {
  const [chartData, setChartData] = useState({});
  const [daysToShow, setDaysToShow] = useState(30); // Estado inicial a 30 días

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

        const dates = Object.keys(series).reverse().slice(0, daysToShow); // Usa 'daysToShow' para limitar los días
        const prices = dates.map(date => series[date]['4. close']);

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
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, [apiKey, apiUrl, symbol, daysToShow]);

  const options = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <h2>Gráfico de Precios de Cierre Diarios - {symbol}</h2>
      <div style={{ width: '900px', height: '600px' }}>
        {chartData.labels ? <Line data={chartData} options={options} /> : <p>Cargando gráfico...</p>}
      </div>
      {/* Contenedor para el slider con un ancho máximo de 900px */}
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

export default StockChart;
