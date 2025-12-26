import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:7002/api/admin/vendors";

export default function VendorApproval() {
  const [vendors, setVendors] = useState([]);
  const token = localStorage.getItem("token");

  const fetchVendors = async () => {
    const res = await axios.get(API, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVendors(res.data.vendors || []);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const approve = async (id) => {
    await axios.put(
      `${API}/${id}/approve`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVendors();
  };

  const reject = async (id) => {
    if (!window.confirm("Reject this vendor?")) return;

    await axios.put(
      `${API}/${id}/reject`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchVendors();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Vendor Approval</h2>

      <table border="1" width="100%" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {vendors.map((v) => (
            <tr key={v._id}>
              <td>{v.name}</td>
              <td>{v.email}</td>
              <td>{v.status}</td>
              <td>
                {v.status === "PENDING" ? (
                  <>
                    <button onClick={() => approve(v._id)}>Approve</button>
                    <button
                      onClick={() => reject(v._id)}
                      style={{ marginLeft: 10, color: "red" }}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  "—"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}