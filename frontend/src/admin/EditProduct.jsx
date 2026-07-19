import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: "",
    stock: "",
  });

  const allowedFields = [
    "title",
    "description",
    "price",
    "category",
    "image",
    "stock",
  ];

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await api.get(`/product/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };

    loadProduct();
  }, [id]);

const handleChange = (e) => {
    console.log(e.target.name, e.target.value);

    setForm({
        ...form,
        [e.target.name]: e.target.value
    });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("handleSubmit started");

  try {
    const response = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    console.log("API called");

    if (response.ok) {
      // ✅ Form fields ko reset karo
      setForm({
        name: "",
        price: "",
        category: "",
        image: "",
        stock: "",
      });
    }
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
      {allowedFields.map((key) => (
          <input
            key={key}
            type={
              key === "price" || key === "stock"
                ? "number"
                : key === "image"
                ? "url"
                : "text"
            }
            name={key}
            value={form[key]}
            onChange={handleChange}
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            className="w-full border border-gray-300 rounded p-2"
          />
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}