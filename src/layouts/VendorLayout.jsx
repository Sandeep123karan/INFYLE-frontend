// // // import { Link, Outlet, useNavigate } from "react-router-dom";

// // // export default function VendorLayout() {
// // //   const navigate = useNavigate();

// // //   const logout = () => {
// // //     localStorage.removeItem("vendorToken");
// // //     navigate("/vendor-auth");
// // //   };

// // //   return (
// // //     <div style={{ display: "flex" }}>
// // //       <aside style={{ width: 220, padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
// // //         <h2>Vendor Panel</h2>
// // //         <nav className="mt-4 flex flex-col gap-2">
// // //           <Link to="/vendor/dashboard">Dashboard</Link>
// // //           <Link to="/vendor/products">Products</Link>
// // //           <Link to="/vendor/orders">Orders</Link>
// // //           <Link to="/vendor/profile">Profile</Link>
// // //         </nav>
// // //         <button onClick={logout} style={{ marginTop: 20, color: "red" }}>Logout</button>
// // //       </aside>

// // //       <main style={{ flex: 1, padding: 20 }}>
// // //         <Outlet />
// // //       </main>
// // //     </div>
// // //   );
// // // }




// // import { Link, Outlet, useNavigate } from "react-router-dom";

// // export default function VendorLayout() {
// //   const navigate = useNavigate();

// //   const logout = () => {
// //     localStorage.removeItem("vendorToken");
// //     navigate("/vendor-auth");
// //   };

// //   return (
// //     <div className="flex min-h-screen">
// //       {/* Sidebar */}
// //       <aside className="w-56 bg-gray-100 p-5">
// //         <h2 className="text-xl font-bold mb-4">Vendor Panel</h2>

// //         <nav className="flex flex-col gap-2">
// //           <Link to="/vendor/dashboard">Dashboard</Link>
// //           <Link to="/vendor/products">Products</Link>
// //           <Link to="/vendor/orders">Orders</Link>
// //           <Link to="/vendor/profile">Profile</Link>
// //         </nav>

// //         <button
// //           onClick={logout}
// //           className="mt-6 text-red-600"
// //         >
// //           Logout
// //         </button>
// //       </aside>

// //       {/* Page Content */}
// //       <main className="flex-1 p-6 bg-gray-50">
// //         <Outlet />
// //       </main>
// //     </div>
// //   );
// // }






// import { Link, Outlet, useNavigate } from "react-router-dom";

// export default function VendorLayout() {
//   const navigate = useNavigate();

//   const logout = () => {
//     localStorage.removeItem("vendorToken");
//     navigate("/vendor-auth");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <aside className="w-56 bg-gray-100 p-5">
//         <h2 className="text-xl font-bold mb-4">Vendor Panel</h2>

//         <nav className="flex flex-col gap-2">
//           <Link to="/vendor/dashboard">Dashboard</Link>
//             <Link to="/vendor/categories">Categories</Link> 
//           <Link to="/vendor/products">Products</Link> {/* ✅ */}
//           <Link to="/vendor/orders">Orders</Link>
//           <Link to="/vendor/profile">Profile</Link>
//         </nav>

//         <button onClick={logout} className="mt-6 text-red-600">
//           Logout
//         </button>
//       </aside>

//       {/* Page Content */}
//       <main className="flex-1 p-6 bg-gray-50">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";

export default function VendorLayout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("vendorToken");

  if (!token) {
    return <Navigate to="/vendor-auth" replace />;
  }

  const logout = () => {
    localStorage.removeItem("vendorToken");
    navigate("/vendor-auth");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-56 bg-gray-100 p-5">
        <h2 className="text-xl font-bold mb-4">Vendor Panel</h2>

        <nav className="flex flex-col gap-2">
          <Link to="/vendor/dashboard">Dashboard</Link>
          <Link to="/vendor/categories">Categories</Link>
          <Link to="/vendor/subcategories">SubCategories</Link>

          <Link to="/vendor/products">Products</Link>
          <Link to="/vendor/orders">Orders</Link>
          <Link to="/vendor/profile">Profile</Link>
        </nav>

        <button onClick={logout} className="mt-6 text-red-600">
          Logout
        </button>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
