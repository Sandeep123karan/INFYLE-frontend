import { useEffect, useState } from "react";
import axios from "axios";
import "./Vendors.css";

const API = "http://localhost:7002/api/vendor";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    shop: "",
    email: "",
    phone: "",
    password: "",
  });

  const loadVendors = async () => {
    const res = await axios.get(`${API}/all`);
    setVendors(res.data);
  };

  useEffect(() => {
    loadVendors();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const addVendor = async (e) => {
    e.preventDefault();
    await axios.post(`${API}/add`, form);
    setForm({ name: "", shop: "", email: "", phone: "", password: "" });
    setShowForm(false);
    loadVendors();
  };

  const approve = async (id) => {
    await axios.put(`${API}/approve/${id}`);
    loadVendors();
  };

  const reject = async (id) => {
    await axios.put(`${API}/reject/${id}`);
    loadVendors();
  };

  const remove = async (id) => {
    if (window.confirm("Delete this vendor?")) {
      await axios.delete(`${API}/delete/${id}`);
      loadVendors();
    }
  };

  return (
    <div className="vendor-container">
      {/* HEADER */}
      <div className="vendor-header">
        <h2>Vendor Management</h2>
        <button className="btn primary" onClick={() => setShowForm(!showForm)}>
          + Add Vendor
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="card form-card">
          <h3>Add New Vendor</h3>
          <form onSubmit={addVendor}>
            <div className="grid">
              <input name="name" placeholder="Owner Name" value={form.name} onChange={handleChange} required />
              <input name="shop" placeholder="Shop Name" value={form.shop} onChange={handleChange} required />
              <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            </div>

            <div className="form-actions">
              <button className="btn success">Save Vendor</button>
              <button type="button" className="btn secondary" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TABLE */}
      <div className="card">
        <table className="vendor-table">
          <thead>
            <tr>
              <th>Shop</th>
              <th>Email</th>
              <th>KYC</th>
              <th>Status</th>
              <th width="220">Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.length === 0 && (
              <tr>
                <td colSpan="5" className="empty">No vendors found</td>
              </tr>
            )}

            {vendors.map((v) => (
              <tr key={v._id}>
                <td>{v.shop}</td>
                <td>{v.email}</td>
                <td>
                  <span className={`badge ${v.isKYCCompleted ? "green" : "yellow"}`}>
                    {v.isKYCCompleted ? "Completed" : "Pending"}
                  </span>
                </td>
                <td>
                  <span className={`badge ${v.isApproved ? "green" : "yellow"}`}>
                    {v.isApproved ? "Approved" : "Pending"}
                  </span>
                </td>
                <td>
                  {!v.isApproved && (
                    <>
                      <button className="btn success sm" onClick={() => approve(v._id)}>Approve</button>
                      <button className="btn danger sm" onClick={() => remove(v._id)}>Delete</button>
                    </>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
