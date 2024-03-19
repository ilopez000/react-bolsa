// Importaciones necesarias de React, Axios para las llamadas a la API y el componente Line de react-chartjs-2
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

// Importaciones de Chart.js para registrar componentes necesarios para el gráfico
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

// Registro de componentes de Chart.js para poder utilizarlos en el gráfico
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Componente StockChart para visualizar el gráfico de la acción
const StockChart = () => {
  // Estado para almacenar los datos del gráfico
  const [chartData, setChartData] = useState({});

  // Configuración de la API: Clave API de demostración y símbolo de la acción (IBM)
  const apiKey = 'demo'; // Reemplazar 'demo' por tu clave API real para producción
  const symbol = 'IBM';
  const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`;

  // Efecto para cargar los datos de la acción al montar el componente y cuando cambian las dependencias
  useEffect(() => {
    // Función asincrónica para obtener los datos de la API y procesarlos
    const fetchData = async () => {
      try {
        // Realizar la solicitud a la API y almacenar la respuesta
        const response = await axios.get(apiUrl);
        const series = response.data['Time Series (Daily)'];

        // Verificar si se recibieron datos, si no, mostrar un error y salir
        if (!series) {
          console.error('Datos no encontrados en la respuesta', response.data);
          return;
        }

        // Procesar los datos para el gráfico: extraer fechas y precios de cierre
        const dates = Object.keys(series).reverse(); // Las fechas se invierten para ordenarlas cronológicamente
        const prices = dates.map(date => series[date]['4. close']); // Extraer el precio de cierre para cada fecha

        // Actualizar el estado del gráfico con los datos procesados
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
        // En caso de error en la solicitud a la API, mostrarlo en consola
        console.error('Error al obtener datos de la API:', error);
      }
    };

    // Llamar a fetchData para cargar los datos
    fetchData();
  }, [apiKey, apiUrl, symbol]); // Dependencias del efecto: se reejecuta si cambian

  // Renderizar el gráfico o un mensaje de carga según si se han cargado los datos
  return (
    <div>
      <h2>Gráfico de Precios de Cierre Diarios - {symbol}</h2>
      {chartData.labels ? <Line data={chartData} /> : <p>Cargando gráfico...</p>}
    </div>
  );
};

// Exportar el componente StockChart para su uso en otras partes de la aplicación
export default StockChart;
