import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor/subcategories";
const CATEGORY_API = "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor/categories";

export default function VendorSubCategories() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [image, setImage] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const token = localStorage.getItem("vendorToken"); // vendor token

  /* ===========================
       FETCH CATEGORIES
  ============================ */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(CATEGORY_API, {
        headers: { Authorization: `Bearer ${token}` }, // token required
      });
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  /* ===========================
       FETCH SUBCATEGORIES
  ============================ */
  const fetchSubCategories = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubcategories(res.data);
    } catch (err) {
      console.error("Subcategories fetch error:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchCategories();
      fetchSubCategories();
    }
  }, [token]);

  /* ===========================
       FORM SUBMIT
  ============================ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !parent) {
      alert("Name & Category are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("parent", parent);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        await axios.post(API, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      resetForm();
      fetchSubCategories();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* ===========================
       EDIT SUBCATEGORY
  ============================ */
  const handleEdit = (sub) => {
    setEditId(sub._id);
    setName(sub.name);
    setParent(sub.parent?._id);
    setShowForm(true);
  };

  /* ===========================
       DELETE SUBCATEGORY
  ============================ */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this subcategory?")) return;

    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubCategories();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setName("");
    setParent("");
    setImage(null);
    setEditId(null);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Vendor SubCategories</h1>

      <button
        onClick={() => {
          showForm ? resetForm() : setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        {showForm ? "Close" : "Add SubCategory"}
      </button>

      {/* ================= FORM ================= */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-4 rounded shadow mb-6"
          encType="multipart/form-data"
        >
          <select
            value={parent}
            onChange={(e) => setParent(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="SubCategory Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-3"
            required
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="mb-3"
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {editId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {/* ================= TABLE ================= */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Image</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {subcategories.map((sub) => (
            <tr key={sub._id} className="border-t">
              <td className="p-2">{sub.name}</td>
              <td className="p-2">{sub.parent?.name}</td>
              <td className="p-2">
                {sub.image && (
                  <img
                    src={`https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app${sub.image}`}
                    alt={sub.name}
                    width="50"
                  />
                )}
              </td>
              <td className="p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(sub)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(sub._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
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
