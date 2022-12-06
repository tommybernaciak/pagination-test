import "./App.css";
import Pagination from "./Pagination";

function App() {
  return (
    <div className="App">
      <header className="App-header">Pagination test</header>
      <Pagination currentPage={2} pageCount={7} />
    </div>
  );
}

export default App;
