import React, { useState } from "react";
import axios from "axios";

const API = "https://infyle-server.vercel.app/api/vendor";

export default function VendorKYCForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ shopName: "", email: "", phone: "", gstin: "", fssai: "" });
  const [panPhoto, setPanPhoto] = useState(null);
  const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
  const [gstCertificate, setGstCertificate] = useState(null);

  const change = e => setForm({ ...form, [e.target.name]: e.target.value });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(k => data.append(k, form[k]));
    if (panPhoto) data.append("panPhoto", panPhoto);
    if (aadhaarPhoto) data.append("aadhaarPhoto", aadhaarPhoto);
    if (gstCertificate) data.append("gstCertificate", gstCertificate);

    try {
      const token = localStorage.getItem("vendorToken");
      await axios.post(`${API}/update-profile`, data, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" }
      });
      alert("KYC submitted. Awaiting admin approval.");
      window.location.href = "/vendor/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "KYC submit failed");
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 600, margin: "50px auto", border: "1px solid #ddd", borderRadius: 10 }}>
      <h2>Vendor KYC Verification</h2>
      <form onSubmit={submit}>
        {step === 1 && (
          <>
            <input name="shopName" placeholder="Shop Name" onChange={change} required />
            <input name="email" type="email" placeholder="Email" onChange={change} required />
          </>
        )}
        {step === 2 && (
          <>
            <input name="phone" placeholder="Phone" onChange={change} required />
            <input name="gstin" placeholder="GSTIN" onChange={change} required />
          </>
        )}
        {step === 3 && (
          <>
            <input name="fssai" placeholder="FSSAI" onChange={change} required />
            <input type="file" onChange={e => setPanPhoto(e.target.files[0])} />
            <input type="file" onChange={e => setAadhaarPhoto(e.target.files[0])} />
            <input type="file" onChange={e => setGstCertificate(e.target.files[0])} />
          </>
        )}
        <div style={{ marginTop: 20 }}>
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 3 && <button type="submit">Submit KYC</button>}
        </div>
      </form>
    </div>
  );
}
