



// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const API = "https://infyle-server.vercel.app/api";

// export default function VendorDashboard() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({ name: "", price: "", description: "" });
//   const token = localStorage.getItem("vendorToken");

//   const loadProducts = async () => {
//     const res = await axios.get(`${API}/product/my`, {
//       headers: { Authorization: `Bearer ${token}` }
//     });
//     setProducts(res.data);
//   };

//   useEffect(() => { loadProducts(); }, []);

//   const addProduct = async e => {
//     e.preventDefault();
//     await axios.post(`${API}/product/add`, form, { headers: { Authorization: `Bearer ${token}` } });
//     setForm({ name: "", price: "", description: "" });
//     loadProducts();
//   };

//   const removeProduct = async id => {
//     if (!window.confirm("Delete product?")) return;
//     await axios.delete(`${API}/product/${id}`, { headers: { Authorization: `Bearer ${token}` } });
//     loadProducts();
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Vendor Dashboard</h2>
//       <form onSubmit={addProduct}>
//         <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
//         <input placeholder="Price" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} required />
//         <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
//         <button type="submit">Add Product</button>
//       </form>
//       <h3>My Products</h3>
//       {products.map(p => (
//         <div key={p._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
//           <h4>{p.name}</h4>
//           <p>{p.price}</p>
//           <p>{p.description}</p>
//           <button onClick={() => removeProduct(p._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// }









import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://infyle-server.vercel.app/api";

export default function VendorDashboard() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
  });

  const token = localStorage.getItem("vendorToken");

  const loadProducts = async () => {
    const res = await axios.get(`${API}/product/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/product/add`, form, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setForm({ name: "", price: "", description: "" });
    loadProducts();
  };

  const removeProduct = async (id) => {
    if (!window.confirm("Delete product?")) return;
    await axios.delete(`${API}/product/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Vendor Dashboard
        </h2>
        <p className="text-gray-500">
          Manage your products easily
        </p>
      </div>

      {/* Add Product Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Add New Product
        </h3>

        <form
          onSubmit={addProduct}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <input
            type="text"
            placeholder="Product Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="md:col-span-3 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            ➕ Add Product
          </button>
        </form>
      </div>

      {/* Products Grid */}
      <h3 className="text-2xl font-semibold mb-4">
        My Products
      </h3>

      {products.length === 0 ? (
        <p className="text-gray-500">
          No products added yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white rounded-2xl shadow p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="text-lg font-bold text-gray-800">
                  {p.name}
                </h4>
                <p className="text-indigo-600 font-semibold mt-1">
                  ₹ {p.price}
                </p>
                <p className="text-gray-500 mt-2 text-sm">
                  {p.description || "No description"}
                </p>
              </div>

              <button
                onClick={() => removeProduct(p._id)}
                className="mt-4 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                🗑 Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
