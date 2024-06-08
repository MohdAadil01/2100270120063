import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FilterPage from "./components/FilterPage";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">App</h1>
        <Routes>
          <Route path="/filter" element={<FilterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
