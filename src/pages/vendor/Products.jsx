// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiPlus,
//   FiEdit2,
//   FiTrash2,
//   FiSearch,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// /* ================= AXIOS INSTANCE ================= */
// const API = axios.create({
//   baseURL: "http://localhost:7002/api/vendor/products",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("vendorToken");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default function VendorProducts() {
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   /* FORM STATES */
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [restaurantName, setRestaurantName] = useState("");
//   const [oldPrice, setOldPrice] = useState("");
//   const [newPrice, setNewPrice] = useState("");
//   const [quality, setQuality] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [logo, setLogo] = useState(null);
//   const [previewImage, setPreviewImage] = useState(null);
//   const [previewLogo, setPreviewLogo] = useState(null);

//   /* ================= FETCH CATEGORIES ================= */
//   useEffect(() => {
//     axios.get("http://localhost:7002/api/vendor/categories").then((res) => {
//       setCategories(res.data);
//     });
//     axios.get("http://localhost:7002/api/vendor/subcategories").then((res) => {
//       setSubCategories(res.data);
//     });
//   }, []);

//   /* ================= FETCH PRODUCTS ================= */
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/", {
//         params: { page, limit: 10, search },
//       });
//       setProducts(res.data.products);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page, search]);

//   /* ================= FORM SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("name", name);
//     fd.append("description", description);
//     fd.append("restaurantName", restaurantName);
//     fd.append("oldPrice", oldPrice);
//     fd.append("newPrice", newPrice);
//     fd.append("quality", quality);
//     fd.append("stock", stock);
//     fd.append("category", category);
//     fd.append("subcategory", subcategory);
//     if (image) fd.append("image", image);
//     if (logo) fd.append("logo", logo);

//     try {
//       if (editingId) {
//         await API.put(`/${editingId}`, fd);
//       } else {
//         await API.post("/", fd);
//       }
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       alert("Error saving product");
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (p) => {
//     setEditingId(p._id);
//     setShowForm(true);

//     setName(p.name);
//     setDescription(p.description);
//     setRestaurantName(p.restaurantName);
//     setOldPrice(p.oldPrice);
//     setNewPrice(p.newPrice);
//     setQuality(p.quality);
//     setStock(p.stock);
//     setCategory(p.category?._id);
//     setSubCategory(p.subcategory?._id);
//     setPreviewImage(p.image);
//     setPreviewLogo(p.logo);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     await API.delete(`/${id}`);
//     fetchProducts();
//   };

//   /* ================= RESET ================= */
//   const resetForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setName("");
//     setDescription("");
//     setRestaurantName("");
//     setOldPrice("");
//     setNewPrice("");
//     setQuality("");
//     setStock("");
//     setCategory("");
//     setSubCategory("");
//     setImage(null);
//     setLogo(null);
//     setPreviewImage(null);
//     setPreviewLogo(null);
//   };

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">My Products</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           {showForm ? <FiX /> : <FiPlus />}
//           {showForm ? "Close" : "Add Product"}
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div className="relative">
//         <FiSearch className="absolute left-3 top-3 text-gray-400" />
//         <input
//           className="pl-10 p-2 border rounded-lg w-full"
//           placeholder="Search product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-5 rounded-lg border space-y-4"
//         >
//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="input" required />
//           <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder="Brand Name" className="input" required />
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input" />

//           <div className="grid grid-cols-2 gap-4">
//             <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="Old Price" className="input" />
//             <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="New Price" className="input" required />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <select value={quality} onChange={(e) => setQuality(e.target.value)} className="input">
//               <option value="">Select Quality</option>
//               <option>Fresh</option>
//               <option>Good</option>
//               <option>Average</option>
//               <option>Poor</option>
//             </select>
//             <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" className="input" />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <select value={category} onChange={(e) => setCategory(e.target.value)} className="input" required>
//               <option value="">Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>{c.name}</option>
//               ))}
//             </select>

//             <select value={subcategory} onChange={(e) => setSubCategory(e.target.value)} className="input">
//               <option value="">SubCategory</option>
//               {subCategories.map((s) => (
//                 <option key={s._id} value={s._id}>{s.name}</option>
//               ))}
//             </select>
//           </div>

//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

//           <button className="bg-green-600 text-white px-4 py-2 rounded">
//             {editingId ? "Update Product" : "Add Product"}
//           </button>
//         </form>
//       )}

//       {/* TABLE */}
//       <div className="bg-white rounded-lg border overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="5" className="text-center p-5">Loading...</td></tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p._id} className="border-t">
//                   <td className="p-3">{p.name}</td>
//                   <td>₹{p.newPrice}</td>
//                   <td>{p.stock}</td>
//                   <td>{p.category?.name}</td>
//                   <td className="flex gap-2 p-2">
//                     <button onClick={() => handleEdit(p)}><FiEdit2 /></button>
//                     <button onClick={() => handleDelete(p._id)} className="text-red-600"><FiTrash2 /></button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           <FiChevronLeft />
//         </button>
//         <span>{page} / {totalPages}</span>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }





// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   FiPlus,
//   FiEdit2,
//   FiTrash2,
//   FiSearch,
//   FiX,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";

// /* ================= AXIOS INSTANCE ================= */
// const API = axios.create({
//   baseURL: "http://localhost:7002/api/vendor/products",
// });

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("vendorToken");
//   if (token) req.headers.Authorization = `Bearer ${token}`;
//   return req;
// });

// export default function VendorProducts() {
//   /* ================= STATES ================= */
//   const [products, setProducts] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [allSubCategories, setAllSubCategories] = useState([]);
//   const [filteredSubCategories, setFilteredSubCategories] = useState([]);

//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);

//   const [showForm, setShowForm] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   /* FORM STATES */
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [restaurantName, setRestaurantName] = useState("");
//   const [oldPrice, setOldPrice] = useState("");
//   const [newPrice, setNewPrice] = useState("");
//   const [quality, setQuality] = useState("");
//   const [stock, setStock] = useState("");
//   const [category, setCategory] = useState("");
//   const [subcategory, setSubCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [logo, setLogo] = useState(null);

//   /* ================= FETCH VENDOR CATEGORY & SUBCATEGORY ================= */
//   useEffect(() => {
//     const token = localStorage.getItem("vendorToken");

//     axios
//       .get("http://localhost:7002/api/vendor/categories", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setCategories(res.data));

//     axios
//       .get("http://localhost:7002/api/vendor/subcategories", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setAllSubCategories(res.data));
//   }, []);

//   /* ================= CATEGORY CHANGE ================= */
//   const handleCategoryChange = (e) => {
//     const catId = e.target.value;
//     setCategory(catId);
//     setSubCategory("");

//     const filtered = allSubCategories.filter(
//       (sub) => sub.parent?._id === catId
//     );
//     setFilteredSubCategories(filtered);
//   };

//   /* ================= FETCH PRODUCTS ================= */
//   const fetchProducts = async () => {
//     setLoading(true);
//     try {
//       const res = await API.get("/", {
//         params: { page, limit: 10, search },
//       });
//       setProducts(res.data.products);
//       setTotalPages(res.data.totalPages);
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [page, search]);

//   /* ================= SUBMIT ================= */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const fd = new FormData();
//     fd.append("name", name);
//     fd.append("description", description);
//     fd.append("restaurantName", restaurantName);
//     fd.append("oldPrice", oldPrice);
//     fd.append("newPrice", newPrice);
//     fd.append("quality", quality);
//     fd.append("stock", stock);
//     fd.append("category", category);
//     fd.append("subcategory", subcategory);
//     if (image) fd.append("image", image);
//     if (logo) fd.append("logo", logo);

//     try {
//       if (editingId) {
//         await API.put(`/${editingId}`, fd);
//       } else {
//         await API.post("/", fd);
//       }
//       resetForm();
//       fetchProducts();
//     } catch (err) {
//       alert("Error saving product");
//     }
//   };

//   /* ================= EDIT ================= */
//   const handleEdit = (p) => {
//     setEditingId(p._id);
//     setShowForm(true);

//     setName(p.name);
//     setDescription(p.description);
//     setRestaurantName(p.restaurantName);
//     setOldPrice(p.oldPrice);
//     setNewPrice(p.newPrice);
//     setQuality(p.quality);
//     setStock(p.stock);

//     setCategory(p.category?._id);
//     setSubCategory(p.subcategory?._id);

//     const filtered = allSubCategories.filter(
//       (sub) => sub.parent?._id === p.category?._id
//     );
//     setFilteredSubCategories(filtered);
//   };

//   /* ================= DELETE ================= */
//   const handleDelete = async (id) => {
//     if (!window.confirm("Delete this product?")) return;
//     await API.delete(`/${id}`);
//     fetchProducts();
//   };

//   /* ================= RESET ================= */
//   const resetForm = () => {
//     setShowForm(false);
//     setEditingId(null);
//     setName("");
//     setDescription("");
//     setRestaurantName("");
//     setOldPrice("");
//     setNewPrice("");
//     setQuality("");
//     setStock("");
//     setCategory("");
//     setSubCategory("");
//     setFilteredSubCategories([]);
//     setImage(null);
//     setLogo(null);
//   };

//   return (
//     <div className="space-y-6">
//       {/* HEADER */}
//       <div className="flex justify-between items-center">
//         <h2 className="text-2xl font-bold">Vendor Products</h2>
//         <button
//           onClick={() => setShowForm(!showForm)}
//           className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           {showForm ? <FiX /> : <FiPlus />}
//           {showForm ? "Close" : "Add Product"}
//         </button>
//       </div>

//       {/* SEARCH */}
//       <div className="relative">
//         <FiSearch className="absolute left-3 top-3 text-gray-400" />
//         <input
//           className="pl-10 p-2 border rounded-lg w-full"
//           placeholder="Search product..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//       </div>

//       {/* FORM */}
//       {showForm && (
//         <form
//           onSubmit={handleSubmit}
//           className="bg-white p-5 rounded-lg border space-y-4"
//         >
//           <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="input" required />
//           <input value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} placeholder="Brand Name" className="input" required />
//           <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="input" />

//           <div className="grid grid-cols-2 gap-4">
//             <input type="number" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} placeholder="Old Price" className="input" />
//             <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="New Price" className="input" required />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <select value={quality} onChange={(e) => setQuality(e.target.value)} className="input">
//               <option value="">Select Quality</option>
//               <option>Fresh</option>
//               <option>Good</option>
//               <option>Average</option>
//               <option>Poor</option>
//             </select>
//             <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="Stock" className="input" />
//           </div>

//           {/* CATEGORY + SUBCATEGORY */}
//           <div className="grid grid-cols-2 gap-4">
//             <select value={category} onChange={handleCategoryChange} className="input" required>
//               <option value="">Select Category</option>
//               {categories.map((c) => (
//                 <option key={c._id} value={c._id}>{c.name}</option>
//               ))}
//             </select>

//             <select
//               value={subcategory}
//               onChange={(e) => setSubCategory(e.target.value)}
//               className="input"
//               disabled={!category}
//             >
//               <option value="">
//                 {category ? "Select SubCategory" : "Select Category First"}
//               </option>
//               {filteredSubCategories.map((s) => (
//                 <option key={s._id} value={s._id}>{s.name}</option>
//               ))}
//             </select>
//           </div>

//           <input type="file" onChange={(e) => setImage(e.target.files[0])} />
//           <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

//           <button className="bg-green-600 text-white px-4 py-2 rounded">
//             {editingId ? "Update Product" : "Add Product"}
//           </button>
//         </form>
//       )}

//       {/* TABLE */}
//       <div className="bg-white rounded-lg border overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th>Price</th>
//               <th>Stock</th>
//               <th>Category</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr><td colSpan="5" className="text-center p-5">Loading...</td></tr>
//             ) : (
//               products.map((p) => (
//                 <tr key={p._id} className="border-t">
//                   <td className="p-3">{p.name}</td>
//                   <td>₹{p.newPrice}</td>
//                   <td>{p.stock}</td>
//                   <td>{p.category?.name}</td>
//                   <td className="flex gap-2 p-2">
//                     <button onClick={() => handleEdit(p)}><FiEdit2 /></button>
//                     <button onClick={() => handleDelete(p._id)} className="text-red-600"><FiTrash2 /></button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* PAGINATION */}
//       <div className="flex justify-between items-center">
//         <button disabled={page === 1} onClick={() => setPage(page - 1)}>
//           <FiChevronLeft />
//         </button>
//         <span>{page} / {totalPages}</span>
//         <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
//           <FiChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// }






import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "http://localhost:7002/api/vendor/products",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("vendorToken");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default function VendorProducts() {
  const token = localStorage.getItem("vendorToken");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  /* ================= FORM STATES ================= */
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [quality, setQuality] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [image, setImage] = useState(null);
  const [logo, setLogo] = useState(null);

  /* ================= FETCH VENDOR CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7002/api/vendor/categories",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(res.data);
    } catch (err) {
      console.error("Category fetch error", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ================= CATEGORY CHANGE → FETCH SUBCATEGORIES ================= */
  const handleCategoryChange = async (e) => {
    const catId = e.target.value;
    setCategory(catId);
    setSubCategory("");
    setSubCategories([]);

    if (!catId) return;

    try {
      const res = await axios.get(
        `http://localhost:7002/api/vendor/subcategories?category=${catId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubCategories(res.data);
    } catch (err) {
      console.error("SubCategory fetch error", err);
    }
  };

  /* ================= FETCH PRODUCTS ================= */
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await API.get("/", {
        params: { page, limit: 10 },
      });
      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    fd.append("description", description);
    fd.append("restaurantName", restaurantName);
    fd.append("oldPrice", oldPrice);
    fd.append("newPrice", newPrice);
    fd.append("quality", quality);
    fd.append("stock", stock);
    fd.append("category", category);
    fd.append("subcategory", subcategory);
    if (image) fd.append("image", image);
    if (logo) fd.append("logo", logo);

    try {
      if (editingId) {
        await API.put(`/${editingId}`, fd);
      } else {
        await API.post("/", fd);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      alert("Product save error");
    }
  };

  /* ================= EDIT ================= */
  const handleEdit = async (p) => {
    setEditingId(p._id);
    setShowForm(true);

    setName(p.name);
    setDescription(p.description);
    setRestaurantName(p.restaurantName);
    setOldPrice(p.oldPrice);
    setNewPrice(p.newPrice);
    setQuality(p.quality);
    setStock(p.stock);
    setCategory(p.category?._id);
    setSubCategory(p.subcategory?._id);

    try {
      const res = await axios.get(
        `http://localhost:7002/api/vendor/subcategories?category=${p.category?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSubCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await API.delete(`/${id}`);
    fetchProducts();
  };

  /* ================= RESET ================= */
  const resetForm = () => {
    setShowForm(false);
    setEditingId(null);
    setName("");
    setDescription("");
    setRestaurantName("");
    setOldPrice("");
    setNewPrice("");
    setQuality("");
    setStock("");
    setCategory("");
    setSubCategory("");
    setSubCategories([]);
    setImage(null);
    setLogo(null);
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Vendor Products</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded"
        >
          {showForm ? <FiX /> : <FiPlus />}
          {showForm ? "Close" : "Add Product"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-5 rounded space-y-4">
          <input className="input" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="input" placeholder="Brand Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} required />
          <textarea className="input" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

          <div className="grid grid-cols-2 gap-3">
            <input className="input" type="number" placeholder="Old Price" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} />
            <input className="input" type="number" placeholder="New Price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="input" value={quality} onChange={(e) => setQuality(e.target.value)}>
              <option value="">Select Quality</option>
              <option>Fresh</option>
              <option>Good</option>
              <option>Average</option>
              <option>Poor</option>
            </select>
            <input className="input" type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} />
          </div>

          {/* CATEGORY */}
          <select className="input" value={category} onChange={handleCategoryChange} required>
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>

          {/* SUBCATEGORY */}
          <select
            className="input"
            value={subcategory}
            onChange={(e) => setSubCategory(e.target.value)}
            disabled={!category}
          >
            <option value="">
              {category ? "Select SubCategory" : "Select Category First"}
            </option>
            {subCategories.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>

          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <input type="file" onChange={(e) => setLogo(e.target.files[0])} />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {editingId ? "Update Product" : "Add Product"}
          </button>
        </form>
      )}

      {/* TABLE */}
      <div className="bg-white rounded border overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="p-5 text-center">Loading...</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="p-3">{p.name}</td>
                  <td>₹{p.newPrice}</td>
                  <td>{p.stock}</td>
                  <td>{p.category?.name}</td>
                  <td className="flex gap-2 p-2">
                    <button onClick={() => handleEdit(p)}><FiEdit2 /></button>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600"><FiTrash2 /></button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          <FiChevronLeft />
        </button>
        <span>{page} / {totalPages}</span>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
