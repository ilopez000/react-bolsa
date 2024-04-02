import React, { useState } from 'react';
import StockChart from './StockChart';
import StockBarChart from './StockBarChart';
import PieChartComponent from './PieChartComponent';

function App() {
  // Estado para controlar el número de días mostrados en los gráficos
  const [daysToShow, setDaysToShow] = useState(30);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Visualización de Datos de Acciones</h1>
      </header>
      <main>
        {/* Control deslizante para seleccionar el número de días */}
        <div style={{ margin: '20px' }}>
          <input
            type="range"
            min="5"
            max="30"
            value={daysToShow}
            onChange={(e) => setDaysToShow(Number(e.target.value))}
            style={{ width: '900px' }}
          />
          <p>Días mostrados: {daysToShow}</p>
        </div>

        {/* Gráfico de líneas con prop daysToShow */}
        <section>
          <StockChart daysToShow={daysToShow} />
        </section>

        {/* Gráfico de barras con prop daysToShow */}
        <section>
          <StockBarChart daysToShow={daysToShow} />
        </section>

        <section>
          <PieChartComponent />
        </section>
      </main>
    </div>
  );
}

export default App;
