import logo from "./logo.svg";
import "./App.css";

import StockChart from "./HighChart/index";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <StockChart />
        <p>read the waiting launch orders</p>
      </header>
    </div>
  );
}

export default App;
