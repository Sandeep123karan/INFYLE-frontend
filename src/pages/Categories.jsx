

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FiEdit2, FiTrash2, FiPlus, FiX, FiUpload, FiEye } from "react-icons/fi";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:7002/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return alert("Name is required!");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        await axios.put(
          `http://localhost:7002/api/categories/${editId}`,
          formData
        );
        setEditId(null);
      } else {
        await axios.post("http://localhost:7002/api/categories", formData);
      }

      // Clear form
      setName("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      fetchCategories();
      setShowForm(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setName(cat.name);
    setDescription(cat.description);
    setImagePreview(cat.image);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`http://localhost:7002/api/categories/${id}`);
        fetchCategories();
      } catch (error) {
        console.error(error);
        alert("Failed to delete category.");
      }
    }
  };

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
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Category Management</h2>
          <p className="text-gray-600 mt-1">Manage your product categories and organization</p>
        </div>
        
        <button
          onClick={() => {
            if (showForm) {
              resetForm();
            } else {
              setShowForm(true);
            }
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md font-medium"
        >
          {showForm ? <FiX size={18} /> : <FiPlus size={18} />}
          {showForm ? "Close Form" : "Add Category"}
        </button>
      </div>

      {/* Category Form */}
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {editId ? "Edit Category" : "Add New Category"}
            </h3>
            <button
              onClick={resetForm}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <FiX size={20} className="text-gray-500" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Enter category description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="3"
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700 resize-none"
                  />
                </div>
              </div>
              
              {/* Right Column - Image Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Image
                  </label>
                  <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        setImage(e.target.files[0]);
                        setImagePreview(URL.createObjectURL(e.target.files[0]));
                      }}
                      className="hidden"
                      id="categoryImageUpload"
                    />
                    <label htmlFor="categoryImageUpload" className="cursor-pointer text-center">
                      <div className="p-3 bg-blue-50 rounded-full mb-3">
                        <FiUpload className="text-blue-500" size={24} />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        Click to upload category image
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                    </label>
                  </div>
                </div>
                
                {imagePreview && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Preview</span>
                    </div>
                    <img
                      src={imagePreview}
                      alt="Category preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-200 shadow-sm"
                    />
                  </div>
                )}
              </div>
            </div>
            
            {/* Form Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2.5 text-gray-700 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md font-medium"
              >
                {editId ? "Update Category" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">
              Categories ({categories.length})
            </h3>
            <div className="flex items-center space-x-2">
              <button 
                onClick={fetchCategories}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    </div>
                    <p className="mt-2 text-gray-500">Loading categories...</p>
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-8 text-center text-gray-500">
                    No categories found. Add your first category!
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-50/80 transition-colors duration-150">
                    <td className="py-4 px-4">
                      {cat.image ? (
                        <img
                          src={cat.image}
                          alt={cat.name}
                          className="w-16 h-16 rounded-lg object-cover border border-gray-200 shadow-sm"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200">
                          <FiEye className="text-gray-400" size={20} />
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{cat.name}</p>
                        <p className="text-xs text-gray-500 mt-1">ID: {cat._id}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <p className="text-gray-600 max-w-md truncate">
                        {cat.description || "No description"}
                      </p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                        >
                          <FiEdit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(cat._id)}
                          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200 font-medium"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}