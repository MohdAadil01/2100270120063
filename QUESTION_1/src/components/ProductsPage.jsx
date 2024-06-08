import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router for navigation

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch products based on filters
  const fetchProducts = async (company, category, top, minPrice, maxPrice) => {
    const url = `http://20.244.56.144/test/companies/${company}/category/${category}/products?top=${top}&minPrice=${minPrice}&maxPrice=${maxPrice}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3ODMxMjgwLCJpYXQiOjE3MTc4MzA5ODAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImJiMTYzZTE3LTUzNmEtNGZjMC1iNDZjLTVkMTUxMGRjNmZlNyIsInN1YiI6Im1vaGRhYWRpbDQyNDBAZ21haWwuY29tIn0sImNvbXBhbnlOYW1lIjoiQWZmb3JkbWVkIG1lZGljYWwiLCJjbGllbnRJRCI6ImJiMTYzZTE3LTUzNmEtNGZjMC1iNDZjLTVkMTUxMGRjNmZlNyIsImNsaWVudFNlY3JldCI6Ik5hcWVMRENyUHJQS01mZFUiLCJvd25lck5hbWUiOiJNb2hkIEFhZGlsIiwib3duZXJFbWFpbCI6Im1vaGRhYWRpbDQyNDBAZ21haWwuY29tIiwicm9sbE5vIjoiMjEwMDI3MDEyMDA2MyJ9.ip9uWHx5j9tTSPcj8GvhHwt-oLVX-zSoeXx2-PrTtww",
        },
      });
      if (!response.ok) {
        setError("Failed to fetch Products");
        return;
      }
      const data = await response.json();
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Example usage, you can replace these with actual filter values
    const company = "AMZ";
    const category = "Phone";
    const top = 10;
    const minPrice = 1;
    const maxPrice = 1000;
    fetchProducts(company, category, top, minPrice, maxPrice);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mt-8 mb-4">Products</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <Link to={`/product/${product.id}`} key={product.id}>
            <div className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full mb-2"
              />
              <h2 className="text-xl font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700">{product.description}</p>
              <p className="mt-2 text-gray-900 font-semibold">
                ${product.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
