import {useState} from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router';


export default function AddProduct() {
    const [form , setForm] = useState({
        title: "",
        description: '',
        price: "",
        category:"",
        image: "", 
        stock: "", });
            const navigate = useNavigate();
            const handleChange = (e) => { 
                setForm({
                    ...form, 
                    [e.target.name]: e.target.value }); };

const handleSubmit = async (e) => {
    console.log("handleSubmit started");
    e.preventDefault();

    try {
        await api.post("/products", form);
        console.log("API called");
    } catch (err) {
        console.log(err);
    }
};
    return (
      <div className="add-product-container bg-white p-4 rounded shadow-md w-1/2 mx-auto mt-10">
    <h2 className="text-2xl font-bold text-center">
        Add Product
    </h2>

    <form
onSubmit={handleSubmit}
  className="flex flex-col gap-4 mt-4 mx-auto"    >
        {Object.keys(form).map((key) => (
            <input
                key={key}
                type="text"
                name={key}
                placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                value={form[key]}
                onChange={handleChange}
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        ))}

        <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
            Add Product
        </button>
    </form>
</div>
);
}