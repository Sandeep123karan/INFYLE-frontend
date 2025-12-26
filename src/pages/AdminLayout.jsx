




// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../assets/2.png";

// import Vendors from "../pages/Vendors.jsx";
// import {
//   FiHome,
//   FiUsers,
//   FiLayers,
//   FiBox,
//   FiShoppingCart,
//   FiClock,
//   FiSettings,
//   FiLogOut,
//   FiChevronRight,
//   FiMenu,
//   FiX,
//   FiTrendingUp,
//   FiPackage,
//   FiGrid,
//   FiUser,
//   FiBell,
//   FiSearch,
//   FiChevronLeft,
// } from "react-icons/fi";
// import {
//   HiOutlineChartBar,
//   HiOutlineUserGroup,
//   HiOutlineCollection,
//   HiOutlineCog,
//   HiOutlineShoppingBag,
// } from "react-icons/hi";

// import DashboardHome from "./Dashboard.jsx";
// import AdminOrdersPage from "./AdminOrdersPage.jsx";
// import OrderListPage from "./OrderListPage.jsx";
// import UsersPage from "./UsersPage.jsx";
// import Categories from "./Categories.jsx";
// import SubCategories from "./SubCategories.jsx";
// import AdminProductPage from "./AdminProductPage.jsx";
// import ProductList from "./ProductList.jsx";
// import OrderHistory from "./OrderHistory.jsx";
// import Setting from "./Setting.jsx";
// import TransactionPage from "../pages/TransactionPage.jsx";


// export default function AdminLayout() {
//   const [active, setActive] = useState("Dashboard");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 820);
//   const [notifications, setNotifications] = useState(3);
//   const [userDropdown, setUserDropdown] = useState(false);

//   const navigate = useNavigate();
//   const sidebarRef = useRef(null);

//   // Detect screen resize
//   useEffect(() => {
//     const checkScreen = () => {
//       const mobile = window.innerWidth < 820;
//       setIsMobile(mobile);
//       if (mobile) {
//         setSidebarOpen(false);
//         setSidebarCollapsed(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };
    
//     window.addEventListener("resize", checkScreen);
//     checkScreen();
    
//     return () => window.removeEventListener("resize", checkScreen);
//   }, []);

//   // Toggle sidebar collapse (only on desktop)
//   const toggleSidebar = () => {
//     if (isMobile) {
//       setSidebarOpen(!sidebarOpen);
//     } else {
//       setSidebarCollapsed(!sidebarCollapsed);
//       setSidebarOpen(true); // Keep sidebar open on desktop when collapsed
//     }
//   };

//   // Close sidebar when clicking outside on mobile
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         isMobile &&
//         sidebarOpen &&
//         sidebarRef.current &&
//         !sidebarRef.current.contains(event.target) &&
//         !event.target.closest('.hamburger')
//       ) {
//         setSidebarOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isMobile, sidebarOpen]);

//   const menuItems = [
//     { name: "Dashboard", icon: <HiOutlineChartBar />, color: "bg-gradient-to-br from-blue-500 to-cyan-400" },
//     { name: "Categories", icon: <FiGrid />, color: "bg-gradient-to-br from-purple-500 to-pink-400" },
//     { name: "Products", icon: <FiPackage />, color: "bg-gradient-to-br from-green-500 to-emerald-400" },
//     { name: "Orders", icon: <HiOutlineShoppingBag />, color: "bg-gradient-to-br from-amber-500 to-yellow-400" },
//     { name: "Users", icon: <HiOutlineUserGroup />, color: "bg-gradient-to-br from-rose-500 to-pink-400" },
//     { name: "Vendors", icon: <HiOutlineCollection />, color: "bg-gradient-to-br from-orange-500 to-red-400" },
//     { name: "History", icon: <FiClock />, color: "bg-gradient-to-br from-indigo-500 to-blue-400" },
//     { name: "Setting", icon: <HiOutlineCog />, color: "bg-gradient-to-br from-gray-600 to-gray-400" },
//     { 
//   name: "Transactions", 
//   icon: <FiShoppingCart />, 
//   color: "bg-gradient-to-br from-indigo-500 to-violet-400" 
// },
//   ];

//   const renderContent = () => {
//     switch (active) {
//       case "Dashboard": return <DashboardHome />;
//       case "Order Management": return <AdminOrdersPage />;
//       case "Order List": return <OrderListPage />;
//       case "Users": return <UsersPage />;
//       case "Categories": return <Categories />;
//       case "Sub-Categories": return <SubCategories />;
//       case "Products": return <AdminProductPage />;
//       case "ProductList": return <ProductList />;
//       case "History": return <OrderHistory />;
//       case "Setting": return <Setting />;
//       case "Vendors": return <Vendors />;
//       case "Transactions":   // 🔥 yahin link hoga
//       return <TransactionPage />;
//       default: return <DashboardHome />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
//       {/* Top Navigation */}
//       <nav className="fixed top-0 right-0 left-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 h-16 shadow-sm">
//         <div className="flex items-center justify-between px-6 h-full">
//           {/* Left section */}
//           <div className="flex items-center space-x-4">
//             <button
//               onClick={toggleSidebar}
//               className="p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
//             >
//               {isMobile ? (
//                 sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />
//               ) : (
//                 sidebarCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />
//               )}
//             </button>
            
//             <div className="flex items-center space-x-3">
//               <img 
//                 src={logo} 
//                 alt="Logo" 
//                 className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-sm"
//               />
//               <span className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
//                 Admin Panel
//               </span>
//             </div>
//           </div>

//           {/* Center - Search Bar */}
//           <div className="hidden lg:flex flex-1 max-w-xl mx-8">
//             <div className="relative w-full">
//               <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="text"
//                 placeholder="Search dashboard..."
//                 className="w-full pl-12 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
//               />
//             </div>
//           </div>

//           {/* Right section */}
//           <div className="flex items-center space-x-3">
//             {/* Notification Bell */}
//             <button className="relative p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 text-gray-600 hover:text-gray-900 group">
//               <FiBell size={20} />
//               {notifications > 0 && (
//                 <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
//                   {notifications}
//                 </span>
//               )}
//             </button>
            
//             {/* User Profile */}
//             <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
//               <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
//                 A
//               </div>
//               <div className="hidden md:block">
//                 <p className="text-sm font-medium text-gray-800">Admin User</p>
//                 <p className="text-xs text-gray-500">Administrator</p>
//               </div>
//             </div>
            
//             {/* Logout Button */}
//             <button
//               onClick={() => {
//                 localStorage.removeItem("token");
//                 navigate("/login");
//               }}
//               className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
//             >
//               <FiLogOut size={18} />
//               <span className="hidden sm:inline font-medium">Logout</span>
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* Sidebar */}
//       <aside
//         ref={sidebarRef}
//         className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 transform transition-all duration-300 ease-in-out ${
//           isMobile 
//             ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full')
//             : 'translate-x-0'
//         } ${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white/90 backdrop-blur-lg border-r border-gray-200/60 shadow-sm`}
//       >
//         <div className="flex flex-col h-full">
//           {/* Menu Items */}
//           <div className={`flex-1 overflow-y-auto py-6 ${sidebarCollapsed ? 'px-3' : 'px-4'}`}>
//             <div className="space-y-1">
//               {menuItems.map((item) => (
//                 <button
//                   key={item.name}
//                   onClick={() => setActive(item.name)}
//                   className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} px-3 py-3.5 rounded-xl transition-all duration-300 group relative ${
//                     active === item.name
//                       ? 'bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 shadow-sm'
//                       : 'hover:bg-gray-50/80'
//                   }`}
//                   title={sidebarCollapsed ? item.name : ''}
//                 >
                 
//                   {sidebarCollapsed && active === item.name && (
//                     <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-r-full"></div>
//                   )}
                  
//                   <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
//                     <div className={`p-2.5 rounded-lg ${item.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}>
//                       <div className="text-white">
//                         {React.cloneElement(item.icon, { size: 18 })}
//                       </div>
//                     </div>
                    
//                     {!sidebarCollapsed && (
//                       <span className={`font-medium ${
//                         active === item.name ? 'text-blue-600' : 'text-gray-700'
//                       }`}>
//                         {item.name}
//                       </span>
//                     )}
//                   </div>
                  
//                   {!sidebarCollapsed && (
//                     <FiChevronRight className={`transition-all duration-300 ${
//                       active === item.name 
//                         ? 'text-blue-500 opacity-100' 
//                         : 'text-gray-300 opacity-0 group-hover:opacity-60'
//                     }`} />
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sidebar Footer - Only show when not collapsed */}
//           {!sidebarCollapsed && (
//             <div className="p-5 border-t border-gray-200/60 bg-gradient-to-b from-transparent to-white/30">
//               <div className="mb-3">
//                 <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
//                   Storage Usage
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
//                   <div 
//                     className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
//                     style={{ width: '65%' }}
//                   ></div>
//                 </div>
//                 <div className="flex justify-between text-xs text-gray-500">
//                   <span>65% used</span>
//                   <span>2.4GB / 5GB</span>
//                 </div>
//               </div>
//               <div className="text-center text-xs text-gray-400 pt-3 border-t border-gray-200/40">
//                 <p>© 2024 Admin Panel v2.1</p>
//                 <p className="mt-0.5">Premium Dashboard</p>
//               </div>
//             </div>
//           )}
          
//           {/* Collapsed Footer - Minimal */}
//           {sidebarCollapsed && (
//             <div className="p-4 border-t border-gray-200/60 flex justify-center">
//               <div className="text-xs text-gray-400 rotate-180 [writing-mode:vertical-rl]">
//                 v2.1
//               </div>
//             </div>
//           )}
//         </div>
//       </aside>

//       {/* Overlay for mobile */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 transition-all duration-300"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Main Content */}
//       <main className={`pt-16 transition-all duration-300 ${
//         !isMobile && !sidebarCollapsed ? 'ml-64' : !isMobile && sidebarCollapsed ? 'ml-20' : 'ml-0'
//       }`}>
//         <div className="p-6">
//           {/* Breadcrumb & Header */}
//           <div className="mb-8">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
//               <div>
//                 <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//                   {active}
//                 </h1>
//                 <p className="text-gray-500 mt-1">
//                   Welcome back! Here's what's happening with your store today.
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2 text-sm text-gray-600">
//                 <span className="text-gray-400">Dashboard</span>
//                 <FiChevronRight size={14} />
//                 <span className="font-medium text-gray-800">{active}</span>
//               </div>
//             </div>

           
//           </div>

//           {/* Main Content Container */}
//           <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
//             {/* Content Header */}
//             <div className="px-6 py-4 border-b border-gray-200/60 bg-gradient-to-r from-white to-gray-50/50">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {active} Overview
//                 </h2>
//                 <div className="flex items-center space-x-2">
//                   <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">
//                     Export
//                   </button>
//                   <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
//                     Add New
//                   </button>
//                 </div>
//               </div>
//             </div>

//             {/* Content Area */}
//             <div className="p-6">
//               {renderContent()}
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="mt-8 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-100/50 rounded-2xl p-6">
//             <div className="flex items-center justify-between">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
//                 <p className="text-gray-600 text-sm mt-1">Perform common tasks quickly</p>
//               </div>
//               <div className="flex space-x-3">
//                 <button className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
//                   Generate Report
//                 </button>
//                 <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200">
//                   View Analytics
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <footer className="mt-12 px-6 py-4 border-t border-gray-200/60 bg-white/50">
//           <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
//             <div className="mb-3 md:mb-0">
//               © 2024 Admin Panel. All rights reserved.
//             </div>
//             <div className="flex items-center space-x-4">
//               <a href="#" className="hover:text-gray-700 transition-colors duration-200">Privacy Policy</a>
//               <a href="#" className="hover:text-gray-700 transition-colors duration-200">Terms of Service</a>
//               <a href="#" className="hover:text-gray-700 transition-colors duration-200">Support</a>
//             </div>
//           </div>
//         </footer>
//       </main>
//     </div>
//   );
// }







import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/2.png";

import Vendors from "../pages/Vendors.jsx";
import {
  FiClock,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiMenu,
  FiX,
  FiPackage,
  FiGrid,
  FiBell,
  FiSearch,
  FiChevronLeft,
} from "react-icons/fi";
import {
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineCollection,
  HiOutlineCog,
  HiOutlineShoppingBag,
} from "react-icons/hi";

import DashboardHome from "./Dashboard.jsx";
import AdminOrdersPage from "./AdminOrdersPage.jsx";
import OrderListPage from "./OrderListPage.jsx";
import UsersPage from "./UsersPage.jsx";
import Categories from "./Categories.jsx";
import SubCategories from "./SubCategories.jsx";
import AdminProductPage from "./AdminProductPage.jsx";
import ProductList from "./ProductList.jsx";
import OrderHistory from "./OrderHistory.jsx";
import Setting from "./Setting.jsx";
import TransactionPage from "../pages/TransactionPage.jsx";
import VendorApproval from "./admin/VendorApproval.jsx";

export default function AdminLayout() {
  const [active, setActive] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 820);
  const [notifications] = useState(3);
  const [userDropdown, setUserDropdown] = useState(false);

  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  /* ============ SCREEN RESIZE ============ */
  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 820;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
      setSidebarCollapsed(false);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) setSidebarOpen(!sidebarOpen);
    else setSidebarCollapsed(!sidebarCollapsed);
  };

  /* ============ MENU ITEMS ============ */
  const menuItems = [
    { name: "Dashboard", icon: <HiOutlineChartBar /> },
    { name: "Categories", icon: <FiGrid /> },
    { name: "Products", icon: <FiPackage /> },
    { name: "Orders", icon: <HiOutlineShoppingBag /> },
    { name: "Users", icon: <HiOutlineUserGroup />, dropdown: true },
     { name: "VendorApproval", icon: <HiOutlineCollection /> },
    // { name: "Vendors", icon: <HiOutlineCollection /> },
    { name: "History", icon: <FiClock /> },
    { name: "Transactions", icon: <HiOutlineShoppingBag /> },
    { name: "Setting", icon: <HiOutlineCog /> },
  ];

  /* ============ RENDER CONTENT ============ */
  const renderContent = () => {
    switch (active) {
      case "Dashboard": return <DashboardHome />;
      case "Categories": return <Categories />;
      case "Sub-Categories": return <SubCategories />;
      case "Products": return <AdminProductPage />;
      case "ProductList": return <ProductList />;
      case "Orders": return <AdminOrdersPage />;
      case "OrderList": return <OrderListPage />;
      case "UserProfile": return <UsersPage />;
      case "UserOrders": return <OrderListPage />;
      case "VendorApproval": return<VendorApproval/>;
      case "History": return <OrderHistory />;
      case "Transactions": return <TransactionPage />;
      case "Setting": return <Setting />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
      {/* ================= TOP NAV ================= */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 h-16 shadow-sm">
        <div className="flex items-center justify-between px-6 h-full">
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 text-gray-600 hover:text-gray-900"
            >
              {isMobile ? (
                sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />
              ) : sidebarCollapsed ? <FiChevronRight size={24} /> : <FiChevronLeft size={24} />}
            </button>

            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Logo"
                className="w-9 h-9 rounded-xl object-cover border-2 border-white shadow-sm"
              />
              <span className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Admin Panel
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search dashboard..."
                className="w-full pl-12 pr-4 py-2.5 bg-gray-50/80 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700 placeholder-gray-400"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-3">
            <button className="relative p-2 rounded-xl transition-all duration-300 hover:bg-gray-100 text-gray-600 hover:text-gray-900 group">
              <FiBell size={20} />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            <div className="flex items-center space-x-3 p-2 rounded-xl hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
                A
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <FiLogOut size={18} />
              <span className="hidden sm:inline font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ================= SIDEBAR ================= */}
      <aside
        ref={sidebarRef}
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] z-30 transform transition-all duration-300 ease-in-out ${
          isMobile ? (sidebarOpen ? "translate-x-0" : "-translate-x-full") : "translate-x-0"
        } ${sidebarCollapsed ? "w-20" : "w-64"} bg-white/90 backdrop-blur-lg border-r border-gray-200/60 shadow-sm`}
      >
        <div className="flex flex-col h-full">
          <div className={`flex-1 overflow-y-auto py-6 ${sidebarCollapsed ? "px-3" : "px-4"}`}>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => {
                      if (item.dropdown) setUserDropdown(!userDropdown);
                      else {
                        setActive(item.name);
                        setUserDropdown(false);
                      }
                    }}
                    className={`w-full flex items-center ${
                      sidebarCollapsed ? "justify-center" : "justify-between"
                    } px-3 py-3.5 rounded-xl transition-all duration-300 group relative ${
                      active === item.name ? "bg-gradient-to-r from-blue-50 to-sky-50 border border-blue-100 shadow-sm" : "hover:bg-gray-50/80"
                    }`}
                    title={sidebarCollapsed ? item.name : ""}
                  >
                    <div className={`flex items-center ${sidebarCollapsed ? "justify-center" : "space-x-3"}`}>
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm transition-transform duration-300 group-hover:scale-110">
                        <div className="text-white">{React.cloneElement(item.icon, { size: 18 })}</div>
                      </div>
                      {!sidebarCollapsed && <span className={`font-medium ${active === item.name ? "text-blue-600" : "text-gray-700"}`}>{item.name}</span>}
                    </div>
                    {!sidebarCollapsed && item.dropdown && <FiChevronRight className={userDropdown ? "rotate-90 transition-transform duration-300" : ""} />}
                  </button>

                  {/* USERS SUBMENU */}
                  {item.dropdown && userDropdown && !sidebarCollapsed && (
                    <div className="ml-8 mt-1 space-y-1">
                      <button
                        onClick={() => setActive("UserProfile")}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Profile
                      </button>
                      <button
                        onClick={() => setActive("UserOrders")}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100 rounded"
                      >
                        Orders
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR FOOTER */}
          {!sidebarCollapsed && (
            <div className="p-5 border-t border-gray-200/60 bg-gradient-to-b from-transparent to-white/30">
              <div className="mb-3">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Storage Usage</div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full transition-all duration-500" style={{ width: "65%" }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>65% used</span>
                  <span>2.4GB / 5GB</span>
                </div>
              </div>
              <div className="text-center text-xs text-gray-400 pt-3 border-t border-gray-200/40">
                <p>© 2024 Admin Panel v2.1</p>
                <p className="mt-0.5">Premium Dashboard</p>
              </div>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="p-4 border-t border-gray-200/60 flex justify-center">
              <div className="text-xs text-gray-400 rotate-180 [writing-mode:vertical-rl]">v2.1</div>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {isMobile && sidebarOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-20 transition-all duration-300" onClick={() => setSidebarOpen(false)} />}

      {/* MAIN CONTENT */}
      <main className={`pt-16 transition-all duration-300 ${!isMobile && !sidebarCollapsed ? "ml-64" : !isMobile && sidebarCollapsed ? "ml-20" : "ml-0"}`}>
        <div className="p-6">
          {/* HEADER */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{active}</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening with your store today.</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span className="text-gray-400">Dashboard</span>
                <FiChevronRight size={14} />
                <span className="font-medium text-gray-800">{active}</span>
              </div>
            </div>
          </div>

          {/* CONTENT */}
          <div className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200/60 bg-gradient-to-r from-white to-gray-50/50 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">{active} Overview</h2>
              <div className="flex items-center space-x-2">
                <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200">Export</button>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-lg shadow-sm hover:shadow-md transition-all duration-200">Add New</button>
              </div>
            </div>
            <div className="p-6">{renderContent()}</div>
          </div>

          {/* QUICK ACTIONS */}
          <div className="mt-8 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-100/50 rounded-2xl p-6 flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              <p className="text-gray-600 text-sm mt-1">Perform common tasks quickly</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">Generate Report</button>
              <button className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200">View Analytics</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
