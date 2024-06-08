import React, { useState, useEffect } from "react";
import axios from "axios";

function FilterPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    companyName: "",
    category: "",
    top: false,
    minPrice: "",
    maxPrice: "",
  });

  const findProducts = async () => {
    try {
      const { companyName, category, top, minPrice, maxPrice } = filters;

      // Construct the API URL based on filters
      let apiUrl = `http://20.244.56.144/test/companies/${companyName}/categories/${category}/products?`;

      if (top) {
        apiUrl += `top=10&`;
      }
      if (minPrice) {
        apiUrl += `minPrice=${minPrice}&`;
      }
      if (maxPrice) {
        apiUrl += `maxPrice=${maxPrice}&`;
      }

      // Remove trailing & or ? if no parameters were added
      apiUrl = apiUrl.slice(-1) === "&" ? apiUrl.slice(0, -1) : apiUrl;
      apiUrl = apiUrl.slice(-1) === "?" ? apiUrl.slice(0, -1) : apiUrl;

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3ODIxNDkyLCJpYXQiOjE3MTc4MjExOTIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJiMTYzZTE3LTUzNmEtNGZjMC1iNDZjLTVkMTUxMGRjNmZlNyIsInN1YiI6Im1vaGRhYWRpbDQyNDBAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkbWVkIG1lZGljYWwiLCJjbGllbnRJRCI6ImJiMTYzZTE3LTUzNmEtNGZjMC1iNDZjLTVkMTUxMGRjNmZlNyIsImNsaWVudFNlY3JldCI6Ik5hcWVMRENyUHJQS01mZFUiLCJvd25lck5hbWUiOiJNb2hkIEFhZGlsIiwib3duZXJFbWFpbCI6Im1vaGRhYWRpbDQyNDBAZ21haWwuY29tIiwicm9sbE5vIjoiMjEwMDI3MDEyMDA2MyJ9.NVHbchYlX1yNVvXA0BMIvpLenqbYtvn8m6sBqXlih8o",
        },
      });
      setProducts(response.data);
      console.log(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    findProducts();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product Showcase</h1>
      <form
        onSubmit={handleSubmit}
        className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={filters.companyName}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="category">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="top"
            name="top"
            checked={filters.top}
            onChange={handleChange}
            className="form-checkbox"
          />
          <label className="ml-2 block text-sm font-medium" htmlFor="top">
            Top
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="minPrice">
            Min Price
          </label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="maxPrice">
            Max Price
          </label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            className="block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-bold">{product.name}</h2>
            <p className="mt-2">{product.description}</p>
            <p className="mt-2 font-semibold">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterPage;
