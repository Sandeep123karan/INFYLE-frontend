
// import React from "react";
// import { motion } from "framer-motion";
// import {
//   BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
// } from "recharts";
// import "./Dashboard.css";

// const data = [
//   { name: "Mon", sales: 3000 },
//   { name: "Tue", sales: 4500 },
//   { name: "Wed", sales: 3200 },
//   { name: "Thu", sales: 5000 },
//   { name: "Fri", sales: 3900 },
//   { name: "Sat", sales: 6100 },
//   { name: "Sun", sales: 4800 },
// ];

// export default function Dashboard() {
//   return (
//     <motion.div 
//       className="dash-main"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.7 }}
//     >

//       {/* TOP CARDS */}
//       <div className="dashboard-row">

//         <motion.div 
//           className="dash-card red-card"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <h3>Total Sales</h3>
//           <h2>₹ 350K</h2>
//           <span className="increase">+10.4%</span>
//         </motion.div>

//         <motion.div 
//           className="dash-card blue-card"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.3 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <h3>Total Orders</h3>
//           <h2>1,240</h2>
//           <span className="increase">+8.1%</span>
//         </motion.div>

//         <motion.div 
//           className="dash-card white-card"
//           initial={{ y: 30, opacity: 0 }}
//           animate={{ y: 0, opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           whileHover={{ scale: 1.05 }}
//         >
//           <h3>Active Vendors</h3>
//           <h2>320</h2>
//           <span className="increase">+5.3%</span>
//         </motion.div>

//       </div>

//       {/* BAR GRAPH SECTION */}
//       <motion.div 
//         className="graph-container"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.5 }}
//       >
//         <h3 className="section-title">Weekly Sales (Bar Graph)</h3>

//         <ResponsiveContainer width="100%" height={330}>
//           <BarChart data={data} margin={{ top: 20 }}>
//             <CartesianGrid strokeDasharray="4 4" opacity={0.3} />
//             <XAxis dataKey="name" />
//             <YAxis />
//             <Tooltip />
//             <Bar 
//               dataKey="sales" 
//               fill="#2563eb" 
//               animationDuration={1200}
//               radius={[10, 10, 10, 10]}
//             />
//           </BarChart>
//         </ResponsiveContainer>
//       </motion.div>

//       {/* TABLE SECTION */}
//       <motion.div 
//         className="orders-table"
//         initial={{ y: 60, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ delay: 0.6 }}
//       >
//         <h3 className="section-title">Recent Orders</h3>

//         <table>
//           <thead>
//             <tr>
//               <th>Order ID</th>
//               <th>Status</th>
//               <th>Amount</th>
//               <th>Date</th>
//             </tr>
//           </thead>

//           <tbody>
//             <motion.tr whileHover={{ scale: 1.02 }}>
//               <td>#1201</td>
//               <td className="delivered">Delivered</td>
//               <td>₹ 1450</td>
//               <td>2 Dec</td>
//             </motion.tr>

//             <motion.tr whileHover={{ scale: 1.02 }}>
//               <td>#1202</td>
//               <td className="pending">Pending</td>
//               <td>₹ 980</td>
//               <td>3 Dec</td>
//             </motion.tr>
//           </tbody>
//         </table>
//       </motion.div>
//     </motion.div>
//   );
// }







import React from "react";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
  AreaChart, Area
} from "recharts";
import {
  FiTrendingUp,
  FiShoppingBag,
  FiUsers,
  FiDollarSign,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiArrowUpRight,
  FiEye,
  FiDownload,
  FiCalendar,
  FiActivity
} from "react-icons/fi";
import {
  HiOutlineCurrencyRupee,
  HiOutlineShoppingCart,
  HiOutlineUserGroup,
  HiOutlineChartBar
} from "react-icons/hi";

// Sample data
const barData = [
  { name: "Mon", sales: 3200, target: 2800 },
  { name: "Tue", sales: 4500, target: 3500 },
  { name: "Wed", sales: 3800, target: 4000 },
  { name: "Thu", sales: 5200, target: 4200 },
  { name: "Fri", sales: 4200, target: 3800 },
  { name: "Sat", sales: 6100, target: 5000 },
  { name: "Sun", sales: 4900, target: 4500 },
];

const lineData = [
  { month: 'Jan', revenue: 3000, profit: 1800 },
  { month: 'Feb', revenue: 4200, profit: 2500 },
  { month: 'Mar', revenue: 3800, profit: 2200 },
  { month: 'Apr', revenue: 5200, profit: 3200 },
  { month: 'May', revenue: 4800, profit: 2900 },
  { month: 'Jun', revenue: 6100, profit: 3800 },
  { month: 'Jul', revenue: 5500, profit: 3500 },
];

const pieData = [
  { name: 'Electronics', value: 35, color: '#3B82F6' },
  { name: 'Fashion', value: 25, color: '#8B5CF6' },
  { name: 'Home', value: 20, color: '#10B981' },
  { name: 'Books', value: 12, color: '#F59E0B' },
  { name: 'Other', value: 8, color: '#EF4444' },
];

const recentOrders = [
  { id: '#1201', customer: 'John Doe', amount: '₹ 1,450', status: 'delivered', date: '2 Dec, 2023' },
  { id: '#1202', customer: 'Jane Smith', amount: '₹ 980', status: 'pending', date: '3 Dec, 2023' },
  { id: '#1203', customer: 'Bob Johnson', amount: '₹ 2,350', status: 'delivered', date: '4 Dec, 2023' },
  { id: '#1204', customer: 'Alice Brown', amount: '₹ 750', status: 'processing', date: '4 Dec, 2023' },
  { id: '#1205', customer: 'Charlie Wilson', amount: '₹ 1,890', status: 'delivered', date: '5 Dec, 2023' },
];

const topProducts = [
  { name: 'Wireless Earbuds', sales: 240, revenue: '₹ 1,92,000', growth: '+24%' },
  { name: 'Smart Watch', sales: 189, revenue: '₹ 2,27,000', growth: '+18%' },
  { name: 'Laptop Stand', sales: 312, revenue: '₹ 1,24,800', growth: '+32%' },
  { name: 'Phone Case', sales: 456, revenue: '₹ 68,400', growth: '+12%' },
];

export default function Dashboard() {
  const stats = [
    { 
      title: "Total Revenue", 
      value: "₹ 3,85,240", 
      change: "+12.4%", 
      icon: <HiOutlineCurrencyRupee />, 
      color: "from-emerald-500 to-green-400",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50",
      iconColor: "text-emerald-600"
    },
    { 
      title: "Total Orders", 
      value: "1,842", 
      change: "+8.1%", 
      icon: <HiOutlineShoppingCart />, 
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      iconColor: "text-blue-600"
    },
    { 
      title: "Active Users", 
      value: "2,548", 
      change: "+15.3%", 
      icon: <HiOutlineUserGroup />, 
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      iconColor: "text-purple-600"
    },
    { 
      title: "Conversion Rate", 
      value: "4.8%", 
      change: "+2.1%", 
      icon: <HiOutlineChartBar />, 
      color: "from-amber-500 to-orange-400",
      bgColor: "bg-gradient-to-br from-amber-50 to-orange-50",
      iconColor: "text-amber-600"
    },
  ];

  return (
    <motion.div 
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-gray-700 hover:text-gray-900 bg-white hover:bg-gray-50 border border-gray-300 rounded-xl transition-all duration-200 shadow-sm">
            <FiCalendar size={16} />
            <span>This Month</span>
          </button>
          <button className="flex items-center space-x-2 px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <FiDownload size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className={`${stat.bgColor} rounded-2xl p-5 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <span className="flex items-center text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    <FiTrendingUp size={12} className="mr-1" />
                    {stat.change}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.iconColor} bg-white shadow-sm`}>
                {React.cloneElement(stat.icon, { size: 24 })}
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className={`h-1.5 rounded-full bg-gradient-to-r ${stat.color}`}
                  style={{ width: `${60 + index * 10}%` }}
                ></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bar Chart */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Weekly Sales Performance</h3>
              <p className="text-sm text-gray-500">Target vs Actual sales</p>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-600">Actual Sales</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-300 rounded-full mr-2"></div>
                <span className="text-gray-600">Target</span>
              </div>
            </div>
          </div>
          
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(10px)'
                  }}
                />
                <Bar 
                  dataKey="sales" 
                  fill="url(#colorSales)"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="target" 
                  fill="#E5E7EB"
                  radius={[8, 8, 0, 0]}
                  animationDuration={1500}
                  animationBegin={500}
                />
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.7}/>
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Line Chart & Pie Chart */}
        <div className="space-y-6">
          {/* Line Chart */}
          <motion.div
            className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trend</h3>
                <p className="text-sm text-gray-500">Monthly revenue & profit</p>
              </div>
              <FiActivity className="text-blue-500" size={20} />
            </div>
            
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                      background: 'rgba(255, 255, 255, 0.95)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ stroke: '#3B82F6', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="profit" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ stroke: '#10B981', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationBegin={500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="px-6 py-4 border-b border-gray-200/60 bg-gradient-to-r from-white to-gray-50/50">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Amount</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-6 text-sm font-medium text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200/60">
                {recentOrders.map((order, index) => (
                  <motion.tr 
                    key={index}
                    className="hover:bg-gray-50/50 transition-colors duration-200"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1) }}
                    whileHover={{ scale: 1.005 }}
                  >
                    <td className="py-3 px-6 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="py-3 px-6 text-sm text-gray-600">{order.customer}</td>
                    <td className="py-3 px-6 text-sm font-semibold text-gray-900">{order.amount}</td>
                    <td className="py-3 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'delivered' 
                          ? 'bg-emerald-50 text-emerald-700' 
                          : order.status === 'pending'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-blue-50 text-blue-700'
                      }`}>
                        {order.status === 'delivered' && <FiCheckCircle className="mr-1" size={12} />}
                        {order.status === 'pending' && <FiClock className="mr-1" size={12} />}
                        {order.status === 'processing' && <FiActivity className="mr-1" size={12} />}
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-sm text-gray-600">{order.date}</td>
                    <td className="py-3 px-6">
                      <button className="text-blue-600 hover:text-blue-700">
                        <FiEye size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200/60 shadow-sm p-6"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <p className="text-sm text-gray-500">Best performing products</p>
            </div>
            <FiPackage className="text-purple-500" size={20} />
          </div>
          
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200/60 hover:border-blue-200 hover:bg-blue-50/30 transition-all duration-300 group"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + (index * 0.1) }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-500">{product.sales} units sold</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{product.revenue}</p>
                  <p className="text-xs text-green-600 font-medium flex items-center justify-end">
                    <FiTrendingUp className="mr-1" size={12} />
                    {product.growth}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}