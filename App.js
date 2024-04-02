import React from 'react';
import StockChart from './StockChart'; // Asegúrate de que la ruta sea correcta
import StockBarChart from './StockBarChart'; // Asegúrate de que la ruta sea correcta
import PieChartComponent from './PieChartComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Visualización de Datos de Acciones</h1>
      </header>
      <main>
        {/* Gráfico de líneas para los precios de cierre */}
        <section>
          <h2>Gráfico de Líneas</h2>
          <StockChart />
        </section>

        {/* Gráfico de barras para los precios de cierre */}
        <section>
          <h2>Gráfico de Barras</h2>
          <StockBarChart />
        </section>
        <section>
          <PieChartComponent />
        </section>
      </main>
    </div>
  );
}

export default App;
