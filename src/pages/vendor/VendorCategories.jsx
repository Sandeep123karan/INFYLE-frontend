import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUpload, FiEye } from "react-icons/fi";

export default function VendorCategories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("vendorToken");

  const api = axios.create({
    baseURL: "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor/categories",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  /* =========================
     FETCH VENDOR CATEGORIES
  ========================= */
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await api.get("/");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch vendor categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* =========================
     CREATE / UPDATE
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await api.put(`/${editId}`, formData);
      } else {
        await api.post("/", formData);
      }

      resetForm();
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  /* =========================
     EDIT
  ========================= */
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description || "");
    setImagePreview(cat.image);
    setShowForm(true);
  };

  /* =========================
     DELETE
  ========================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/${id}`);
      fetchCategories();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  /* =========================
     RESET FORM
  ========================= */
  const resetForm = () => {
    setEditId(null);
    setName("");
    setDescription("");
    setImage(null);
    setImagePreview(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Vendor Categories</h2>
          <p className="text-gray-500 text-sm">Manage your own categories</p>
        </div>

        <button
          onClick={() => (showForm ? resetForm() : setShowForm(true))}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Close" : "Add Category"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl space-y-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border p-3 rounded-lg"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImagePreview(URL.createObjectURL(e.target.files[0]));
            }}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="h-40 object-cover rounded"
            />
          )}

          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            {editId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan="4" className="p-6 text-center">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <tr key={cat._id} className="border-t">
                  <td className="p-3">
                    {cat.image ? (
                      <img src={cat.image} className="w-14 h-14 rounded" />
                    ) : (
                      <FiEye />
                    )}
                  </td>
                  <td className="p-3 font-medium">{cat.name}</td>
                  <td className="p-3">{cat.description || "-"}</td>
                  <td className="p-3 flex gap-3">
                    <button onClick={() => handleEdit(cat)}>
                      <FiEdit2 />
                    </button>
                    <button onClick={() => handleDelete(cat._id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
