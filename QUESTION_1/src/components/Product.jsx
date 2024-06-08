import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleProductPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://20.244.56.144/test/products/${productId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto">
      <div className="border p-4 rounded shadow">
        <img src={product.image} alt={product.name} className="w-full mb-2" />
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="mt-2 text-gray-900 font-semibold">${product.price}</p>
      </div>
    </div>
  );
};

export default SingleProductPage;
