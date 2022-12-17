import { useState } from "react";
import "./App.css";
import Pagination from "./Pagination";

function App() {
  const [currentPage, setCurrentPage] = useState(2);
  const changeCurrentPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="App" data-testid="app-root">
      <header className="App-header">Pagination test</header>
      <Pagination
        currentPage={currentPage}
        changeCurrentPage={changeCurrentPage}
        pageCount={7}
      />
    </div>
  );
}

export default App;
