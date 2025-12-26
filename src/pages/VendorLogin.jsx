







// import React, { useState } from "react";
// import axios from "axios";

// export default function VendorLogin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor/login", { email, password });
//       localStorage.setItem("vendorToken", res.data.token);
//       window.location.href = "/vendor/profile-setup";
//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Vendor Login</h2>
//       <form onSubmit={submit} style={styles.form}>
//         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={styles.input} />
//         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={styles.input} />
//         <button type="submit" style={styles.button}>Login</button>
//         <p style={{ marginTop: "15px" }}>
//           Don't have an account? <a href="/vendorsignup">Signup here</a>
//         </p>
//       </form>
//     </div>
//   );
// }

// const styles = {
//   container: { padding: "50px", maxWidth: "400px", margin: "50px auto", border: "1px solid #ddd", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", textAlign: "center", backgroundColor: "#fff" },
//   title: { marginBottom: "30px", color: "#ff4d4d" },
//   form: { display: "flex", flexDirection: "column" },
//   input: { padding: "12px", marginBottom: "20px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "16px" },
//   button: { padding: "12px", borderRadius: "8px", border: "none", backgroundColor: "#ff4d4d", color: "#fff", fontSize: "16px", cursor: "pointer", transition: "0.3s" }
// };

// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const Vendor = require("../models/Vendor");

// const router = express.Router();

// /* =========================
//    VENDOR SIGNUP
// ========================= */
// router.post("/signup", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     const existing = await Vendor.findOne({ email });
//     if (existing) {
//       return res.status(400).json({
//         success: false,
//         message: "Vendor already exists",
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await Vendor.create({
//       name,
//       email,
//       password: hashedPassword,
//       status: "PENDING",
//     });

//     res.json({
//       success: true,
//       message: "Signup successful. Waiting for admin approval.",
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Signup failed",
//     });
//   }
// });

// /* =========================
//    VENDOR LOGIN (EMAIL + PASSWORD)
// ========================= */
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const vendor = await Vendor.findOne({ email });
//     if (!vendor) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     // 🔒 BLOCK LOGIN IF NOT APPROVED
//     if (vendor.status !== "APPROVED") {
//       return res.status(403).json({
//         success: false,
//         message: "Your account is not approved by admin yet",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, vendor.password);
//     if (!isMatch) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email or password",
//       });
//     }

//     const token = jwt.sign(
//       { id: vendor._id, role: "vendor" },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       success: true,
//       token,
//       vendor: {
//         id: vendor._id,
//         name: vendor.name,
//         email: vendor.email,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: "Login failed",
//     });
//   }
// });

// module.exports = router;





import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/2.png";

const API = "https://infyle-backend-5p8ajk8ku-sandeeps-projects-c6e2eb71.vercel.app/api/vendor/login";

export default function VendorLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(API, { email, password });
      localStorage.setItem("vendorToken", res.data.token);
      window.location.href = "/vendor/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5"
    }}>
      <form
        onSubmit={submit}
        style={{
          width: 350,
          background: "#fff",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
        }}
      >
        <img src={logo} style={{ width: 80, margin: "0 auto 20px", display: "block" }} />
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Vendor Login
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 15 }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 10, marginBottom: 20 }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#ff4d4d",
            color: "#fff",
            border: "none",
            borderRadius: 5
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          New vendor? <a href="/vendorsignup">Signup</a>
        </p>
      </form>
    </div>
  );
}
