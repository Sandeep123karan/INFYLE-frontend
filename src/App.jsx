


// import React from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// /* AUTH */
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import VendorAuth from "./pages/VendorAuth";

// /* VENDOR */
// import VendorLayout from "./layouts/VendorLayout";
// import VendorDashboard from "./pages/vendor/VendorDashboard";

// /* ADMIN */
// import AdminLayout from "./pages/AdminLayout";
// import Dashboard from "./pages/Dashboard";
// import Categories from "./pages/Categories";
// import ProductList from "./pages/ProductList";
// import OrderListPage from "./pages/OrderListPage";
// import OrderHistory from "./pages/OrderHistory";
// import Setting from "./pages/Setting";
// import VendorApproval from "./pages/admin/VendorApproval";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>

//         {/* DEFAULT */}
//         <Route path="/" element={<Navigate to="/login" />} />

//         {/* AUTH */}
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/vendor-auth" element={<VendorAuth />} />

//         {/* ================= VENDOR LAYOUT ================= */}
//         <Route path="/vendor" element={<VendorLayout />}>
//           <Route path="dashboard" element={<VendorDashboard />} />
//           {/* future */}
//           {/* <Route path="products" element={<VendorProducts />} /> */}
//           {/* <Route path="orders" element={<VendorOrders />} /> */}
//           {/* <Route path="profile" element={<VendorProfile />} /> */}
//         </Route>

//         {/* ================= ADMIN ================= */}
//         <Route path="/AdminLayout" element={<AdminLayout />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/categories" element={<Categories />} />
//         <Route path="/ProductList" element={<ProductList />} />
//         <Route path="/admin/order-list" element={<OrderListPage />} />
//         <Route path="/orderhistory" element={<OrderHistory />} />
//         <Route path="/pages/Setting" element={<Setting />} />
//         <Route path="/admin/vendor-approval" element={<VendorApproval />} />

//         {/* 404 */}
//         <Route path="*" element={<h2 className="text-center mt-10">404 | Not Found</h2>} />

//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;








import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* AUTH */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VendorAuth from "./pages/VendorAuth";

/* VENDOR */
import VendorLayout from "./layouts/VendorLayout";
import VendorDashboard from "./pages/vendor/VendorDashboard";
import Products from "./pages/vendor/Products";  
import VendorCategories from "./pages/vendor/VendorCategories";





import VendorSubCategories from "./pages/vendor/VendorSubCategories"; // ✅ ADD THIS

/* ADMIN */
import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import ProductList from "./pages/ProductList";
import OrderListPage from "./pages/OrderListPage";
import OrderHistory from "./pages/OrderHistory";
import Setting from "./pages/Setting";
import VendorApproval from "./pages/admin/VendorApproval";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/vendor-auth" element={<VendorAuth />} />

        {/* ================= VENDOR ================= */}
        <Route path="/vendor" element={<VendorLayout />}>
          <Route path="dashboard" element={<VendorDashboard />} />
          <Route path="categories" element={<VendorCategories />} />
          <Route path="products" element={<Products />} /> 
          <Route path="/vendor/subcategories" element={<VendorSubCategories />} />{/* ✅ FIX */}
          {/* future */}
          {/* <Route path="orders" element={<VendorOrders />} /> */}
          {/* <Route path="profile" element={<VendorProfile />} /> */}
          
        </Route>

        {/* ================= ADMIN ================= */}
        <Route path="/AdminLayout" element={<AdminLayout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/ProductList" element={<ProductList />} />
        <Route path="/admin/order-list" element={<OrderListPage />} />
        <Route path="/orderhistory" element={<OrderHistory />} />
        <Route path="/pages/Setting" element={<Setting />} />
        <Route path="/admin/vendor-approval" element={<VendorApproval />} />
        

        {/* 404 */}
        <Route
          path="*"
          element={<h2 className="text-center mt-10">404 | Not Found</h2>}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
