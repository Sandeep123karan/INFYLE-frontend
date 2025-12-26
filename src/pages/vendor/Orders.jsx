import React, { useEffect, useState } from "react";
import axios from "axios";

/* ================= AXIOS INSTANCE ================= */
const API = axios.create({
  baseURL: "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("vendorToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editOrder, setEditOrder] = useState(null);

  const [status, setStatus] = useState("");
  const [totalAmount, setTotalAmount] = useState("");

  /* ================= FETCH VENDOR ORDERS ================= */
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ================= EDIT ================= */
  const handleEdit = (order) => {
    setEditOrder(order);
    setStatus(order.status);
    setTotalAmount(order.totalAmount);
    setShowForm(true);
  };

  /* ================= UPDATE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/orders/${editOrder._id}`, {
        status,
        totalAmount,
      });

      alert("Order Updated");
      setShowForm(false);
      setEditOrder(null);
      fetchOrders();
    } catch (err) {
      alert("Failed to update order");
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);
      fetchOrders();
    } catch (err) {
      alert("Failed to delete order");
    }
  };

  /* ================= PRINT ================= */
  const handlePrint = (order) => {
    const win = window.open("", "", "width=900,height=900");

    const rows = order.products
      .map(
        (p) => `
      <tr>
        <td>${p.product?.name}</td>
        <td>${p.quantity}</td>
        <td>₹${p.product?.newPrice}</td>
        <td>₹${p.quantity * p.product?.newPrice}</td>
      </tr>
    `
      )
      .join("");

    win.document.write(`
      <html>
      <head>
        <title>Invoice</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          table { width:100%; border-collapse: collapse; }
          th, td { border:1px solid #ccc; padding:8px; }
          th { background:#eee; }
        </style>
      </head>
      <body>
        <h2>Order Invoice</h2>
        <p><b>Order ID:</b> ${order._id}</p>
        <p><b>Status:</b> ${order.status}</p>

        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>

        <h3 style="text-align:right">Grand Total: ₹${order.totalAmount}</h3>

        <script>
          window.onload = () => window.print();
        </script>
      </body>
      </html>
    `);

    win.document.close();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Vendor Orders</h2>

      {/* ================= FORM ================= */}
      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>

          <input
            type="number"
            placeholder="Total Amount"
            value={totalAmount}
            onChange={(e) => setTotalAmount(e.target.value)}
            style={{ marginLeft: 10 }}
          />

          <button type="submit" style={{ marginLeft: 10 }}>
            Update
          </button>

          <button
            type="button"
            onClick={() => setShowForm(false)}
            style={{ marginLeft: 10 }}
          >
            Cancel
          </button>
        </form>
      )}

      {/* ================= TABLE ================= */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o._id}>
                <td>{o._id.slice(-6)}</td>

                <td>
                  {o.products.map((p, i) => (
                    <div key={i}>
                      {p.product?.name} × {p.quantity}
                    </div>
                  ))}
                </td>

                <td>₹{o.totalAmount}</td>
                <td>{o.status}</td>

                <td>
                  <button onClick={() => handleEdit(o)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(o._id)}>Delete</button>{" "}
                  <button onClick={() => handlePrint(o)}>Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
