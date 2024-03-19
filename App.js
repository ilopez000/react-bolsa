import React from 'react';
import StockChart from './StockChart';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h2>Gráfico de la Bolsa</h2>
        <StockChart symbol="AAPL"/>
      </header>
    </div>
  );
}

export default App;
