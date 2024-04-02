import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = () => {
  const [numClasses, setNumClasses] = useState(10);

  // Genera colores aleatorios
  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Genera datos y colores para el número de clases seleccionado
  const data = {
    labels: Array.from({ length: numClasses }, (_, i) => `Clase ${i + 1}`),
    datasets: [
      {
        data: Array.from({ length: numClasses }, () => Math.random() * 100),
        backgroundColor: Array.from({ length: numClasses }, () => getRandomColor()),
      },
    ],
  };

  // Opciones para controlar el tamaño del gráfico
  const options = {
    maintainAspectRatio: false, // Esto permite controlar el aspect ratio del gráfico
  };

  return (
    <div>
      <h2>Pie Chart Dinámico</h2>
      <div style={{ width: '600px', height: '600px' }}>
        <Pie data={data} options={options} />
      </div>
      <div>
        <label htmlFor="numClasses">Número de Clases: </label>
        <select
          id="numClasses"
          value={numClasses}
          onChange={(e) => setNumClasses(Number(e.target.value))}
        >
          {Array.from({ length: 9 }, (_, i) => i + 2).map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PieChartComponent;
