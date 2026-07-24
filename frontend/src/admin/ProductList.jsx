import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function ProductList() {

const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  // Load all products
  const loadProduct = async () => {
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Load products when component mounts
  useEffect(() => {
    loadProduct();
  }, []);

    // Delete product
  const update = async (id) => {
    try {
      await api.put(`/products/${id}`);
      alert("Product update successfully");
      loadProduct();
    } catch (error) {
      console.error(error);
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      alert("Product deleted successfully");
      loadProduct();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="product-list-container bg-white p-4 rounded shadow-md w-3/4 mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-4">
        Product List
      </h2>

      <table className="w-full border-collapse">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">ID</th>
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="text-center">
              <td className="border p-2">{product._id}</td>
              <td className="border p-2">{product.title}</td>
              <td className="border p-2">₹{Number(product.price)}</td>
              <td className="border p-2">{product.category}</td>
              <td className="border p-2">{product.stock}</td>

              <td className="border p-2 space-x-2">
               <a 
               href={`/admin/edit/${product._id}`}
  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
>
  Edit
</a>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}