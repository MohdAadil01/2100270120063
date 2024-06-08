import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductsPage from "./components/ProductsPage";
import Product from "./components/Product";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-xl font-bold">App</h1>
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
