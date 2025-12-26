




import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/2.png"; // <- correct path to your logo

const LOGIN_API = "http://localhost:7002/api/vendor/login";
const SIGNUP_API = "http://localhost:7002/api/vendor/signup";

export default function VendorAuth() {
  const [mode, setMode] = useState("login"); // login | signup
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");
    setLoading(true);

    try {
      if (mode === "login") {
        const res = await axios.post(LOGIN_API, {
          email: form.email,
          password: form.password,
        });
        localStorage.setItem("vendorToken", res.data.token);
        window.location.href = "/vendor/dashboard";
      } else {
        await axios.post(SIGNUP_API, form);
        setMsg("Signup successful. Waiting for admin approval.");
        setForm({ name: "", email: "", password: "" });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white p-6 rounded-xl shadow">

        <div className="text-center mb-4">
          <img src={logo} className="w-14 mx-auto mb-2" alt="Logo" />
          <h2 className="font-bold text-lg">
            Vendor {mode === "login" ? "Login" : "Signup"}
          </h2>
        </div>

        {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
        {msg && <p className="text-green-600 text-sm mb-2">{msg}</p>}

        <form onSubmit={submit} className="space-y-3">
          {mode === "signup" && (
            <input
              placeholder="Vendor Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full border px-3 py-2 rounded"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Please wait..." : mode === "login" ? "Login" : "Signup"}
          </button>
        </form>

        <p className="text-xs text-center mt-4">
          {mode === "login" ? (
            <>
              New vendor?{" "}
              <span
                onClick={() => setMode("signup")}
                className="text-blue-600 cursor-pointer"
              >
                Signup
              </span>
            </>
          ) : (
            <>
              Already approved?{" "}
              <span
                onClick={() => setMode("login")}
                className="text-blue-600 cursor-pointer"
              >
                Login
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

