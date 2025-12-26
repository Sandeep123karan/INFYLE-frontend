
// import React, { useState } from "react";
// import axios from "axios";
// import { FiUpload, FiChevronRight, FiChevronLeft, FiCheck, FiUser, FiHome, FiBriefcase } from "react-icons/fi";

// export default function VendorKYC() {
//   const [step, setStep] = useState(1);
//   const [form, setForm] = useState({
//     shopName: "",
//     address: "",
//     email: "",
//     phone: "",
//     gmail: "",
//     fssai: "",
//     fatherName: "",
//     businessName: "",
//     gstin: "",
//     pickupAddress: "",
//     businessType: "",
//     bankAccountNumber: "",
//     bankName: "",
//     ifscCode: "",
//   });

//   const [shopPhoto, setShopPhoto] = useState(null);
//   const [aadhaarPhoto, setAadhaarPhoto] = useState(null);
//   const [panPhoto, setPanPhoto] = useState(null);
//   const [fssaiPhoto, setFssaiPhoto] = useState(null);
//   const [gstCertificate, setGstCertificate] = useState(null);
//   const [bankProof, setBankProof] = useState(null);
//   const [addressProof, setAddressProof] = useState(null);
//   const [businessRegistration, setBusinessRegistration] = useState(null);

//   const updateForm = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const nextStep = () => {
//     if (step < 3) setStep(step + 1);
//   };

//   const prevStep = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const submit = async (e) => {
//     e.preventDefault();

//     const data = new FormData();
//     // Personal Information
//     data.append("shopName", form.shopName);
//     data.append("address", form.address);
//     data.append("email", form.email);
//     data.append("phone", form.phone);
//     data.append("gmail", form.gmail);
//     data.append("fssai", form.fssai);
//     data.append("fatherName", form.fatherName);
    
//     // Business Information
//     data.append("businessName", form.businessName);
//     data.append("gstin", form.gstin);
//     data.append("pickupAddress", form.pickupAddress);
//     data.append("businessType", form.businessType);
//     data.append("bankAccountNumber", form.bankAccountNumber);
//     data.append("bankName", form.bankName);
//     data.append("ifscCode", form.ifscCode);

//     // Files
//     if (shopPhoto) data.append("shopPhoto", shopPhoto);
//     if (aadhaarPhoto) data.append("aadhaarPhoto", aadhaarPhoto);
//     if (panPhoto) data.append("panPhoto", panPhoto);
//     if (fssaiPhoto) data.append("fssaiPhoto", fssaiPhoto);
//     if (gstCertificate) data.append("gstCertificate", gstCertificate);
//     if (bankProof) data.append("bankProof", bankProof);
//     if (addressProof) data.append("addressProof", addressProof);
//     if (businessRegistration) data.append("businessRegistration", businessRegistration);

//     try {
//       const token = localStorage.getItem("vendorToken");
//       await axios.post("https://server-amber-beta-38.vercel.app/api/vendor/update-profile", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       alert("Vendor KYC Submitted Successfully!");
//       window.location.href = "/vendor/dashboard";

//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
//             Vendor KYC Verification
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Complete all steps to become a verified vendor
//           </p>
//         </div>

//         {/* Progress Steps */}
//         <div className="flex items-center justify-center mb-10">
//           {[1, 2, 3].map((stepNum) => (
//             <div key={stepNum} className="flex items-center">
//               <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
//                 step >= stepNum 
//                   ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md'
//                   : 'bg-gray-200 text-gray-500'
//               }`}>
//                 {step > stepNum ? <FiCheck size={20} /> : stepNum}
//               </div>
//               {stepNum < 3 && (
//                 <div className={`w-24 h-1 mx-2 transition-all duration-300 ${
//                   step > stepNum ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-200'
//                 }`} />
//               )}
//             </div>
//           ))}
//           <div className="ml-6 text-sm text-gray-600">
//             Step {step} of 3
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
//           {/* Form Header */}
//           <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50/50">
//             <div className="flex items-center space-x-3">
//               <div className="p-2.5 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 shadow-sm">
//                 {step === 1 ? <FiUser className="text-white" size={20} /> :
//                  step === 2 ? <FiHome className="text-white" size={20} /> :
//                  <FiBriefcase className="text-white" size={20} />}
//               </div>
//               <div>
//                 <h2 className="text-lg font-semibold text-gray-800">
//                   {step === 1 && "Personal Information"}
//                   {step === 2 && "Business & Address Details"}
//                   {step === 3 && "Document Upload"}
//                 </h2>
//                 <p className="text-sm text-gray-600">
//                   {step === 1 && "Enter your personal details for verification"}
//                   {step === 2 && "Provide business information and pickup address"}
//                   {step === 3 && "Upload required documents for KYC verification"}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Form Content */}
//           <form onSubmit={step === 3 ? submit : (e) => { e.preventDefault(); nextStep(); }} className="p-6">
//             {step === 1 && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Your Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="shopName"
//                       placeholder="Enter your full name"
//                       value={form.shopName}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Father's Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="fatherName"
//                       placeholder="Enter father's name"
//                       value={form.fatherName}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address *
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       placeholder="Enter email address"
//                       value={form.email}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number *
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       placeholder="Enter phone number"
//                       value={form.phone}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>
//                 </div>

//                 <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-100/50 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="p-2 bg-blue-100 rounded-lg">
//                       <FiCheck className="text-blue-600" size={18} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">Verification Required</p>
//                       <p className="text-xs text-gray-600 mt-1">
//                         After submitting, you'll receive an OTP to verify your phone number and email.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 2 && (
//               <div className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Business Name *
//                     </label>
//                     <input
//                       type="text"
//                       name="businessName"
//                       placeholder="Enter your business/shop name"
//                       value={form.businessName}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       GSTIN / Enrolment ID / UIN *
//                     </label>
//                     <input
//                       type="text"
//                       name="gstin"
//                       placeholder="Enter GSTIN or Enrolment ID"
//                       value={form.gstin}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       FSSAI Number *
//                     </label>
//                     <input
//                       type="text"
//                       name="fssai"
//                       placeholder="Enter FSSAI license number"
//                       value={form.fssai}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Business Type *
//                     </label>
//                     <select
//                       name="businessType"
//                       value={form.businessType}
//                       onChange={updateForm}
//                       required
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                     >
//                       <option value="">Select Business Type</option>
//                       <option value="sole_proprietor">Sole Proprietor</option>
//                       <option value="partnership">Partnership</option>
//                       <option value="llp">LLP (Limited Liability Partnership)</option>
//                       <option value="private_limited">Private Limited</option>
//                       <option value="public_limited">Public Limited</option>
//                       <option value="individual">Individual</option>
//                     </select>
//                   </div>

//                   <div className="md:col-span-2">
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Pickup Address *
//                     </label>
//                     <textarea
//                       name="pickupAddress"
//                       placeholder="Enter complete pickup address (Street, City, PIN Code, State)"
//                       value={form.pickupAddress}
//                       onChange={updateForm}
//                       required
//                       rows="3"
//                       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700 resize-none"
//                     />
//                   </div>
//                 </div>

//                 {/* Bank Details */}
//                 <div className="border-t border-gray-200 pt-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Account Number *
//                       </label>
//                       <input
//                         type="text"
//                         name="bankAccountNumber"
//                         placeholder="Enter account number"
//                         value={form.bankAccountNumber}
//                         onChange={updateForm}
//                         required
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Name *
//                       </label>
//                       <input
//                         type="text"
//                         name="bankName"
//                         placeholder="Enter bank name"
//                         value={form.bankName}
//                         onChange={updateForm}
//                         required
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         IFSC Code *
//                       </label>
//                       <input
//                         type="text"
//                         name="ifscCode"
//                         placeholder="Enter IFSC code"
//                         value={form.ifscCode}
//                         onChange={updateForm}
//                         required
//                         className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 transition-all duration-300 text-gray-700"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {step === 3 && (
//               <div className="space-y-6">
//                 {/* Mandatory Documents */}
//                 <div className="bg-gradient-to-r from-blue-50/50 to-cyan-50/50 border border-blue-100/50 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">📄 Mandatory Documents</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* PAN Card */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         PAN Card *
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-white">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setPanPhoto(e.target.files[0])}
//                           className="hidden"
//                           id="panUpload"
//                         />
//                         <label htmlFor="panUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-blue-50 rounded-full mb-3">
//                             <FiUpload className="text-blue-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload PAN Card
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {panPhoto && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {panPhoto.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* Aadhaar Card */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Aadhaar Card *
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-white">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setAadhaarPhoto(e.target.files[0])}
//                           className="hidden"
//                           id="aadhaarUpload"
//                         />
//                         <label htmlFor="aadhaarUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-blue-50 rounded-full mb-3">
//                             <FiUpload className="text-blue-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload Aadhaar Card
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {aadhaarPhoto && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {aadhaarPhoto.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* GST Certificate */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         GST Certificate *
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-white">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setGstCertificate(e.target.files[0])}
//                           className="hidden"
//                           id="gstUpload"
//                         />
//                         <label htmlFor="gstUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-blue-50 rounded-full mb-3">
//                             <FiUpload className="text-blue-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload GST Certificate
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {gstCertificate && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {gstCertificate.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* Bank Proof */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Bank Proof *
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-white">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setBankProof(e.target.files[0])}
//                           className="hidden"
//                           id="bankUpload"
//                         />
//                         <label htmlFor="bankUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-blue-50 rounded-full mb-3">
//                             <FiUpload className="text-blue-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload Bank Passbook/Cheque
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {bankProof && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {bankProof.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Optional Documents */}
//                 <div className="border border-gray-200 rounded-xl p-6">
//                   <h3 className="text-lg font-semibold text-gray-800 mb-4">📌 Optional but Helpful</h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     {/* Shop Photo */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Shop/Office Photo
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-gray-50/50">
//                         <input
//                           type="file"
//                           accept="image/*"
//                           onChange={(e) => setShopPhoto(e.target.files[0])}
//                           className="hidden"
//                           id="shopUpload"
//                         />
//                         <label htmlFor="shopUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-gray-100 rounded-full mb-3">
//                             <FiUpload className="text-gray-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload Shop Photo
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
//                           {shopPhoto && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {shopPhoto.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* FSSAI Certificate */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         FSSAI Certificate Photo
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-gray-50/50">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setFssaiPhoto(e.target.files[0])}
//                           className="hidden"
//                           id="fssaiUpload"
//                         />
//                         <label htmlFor="fssaiUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-gray-100 rounded-full mb-3">
//                             <FiUpload className="text-gray-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload FSSAI Certificate
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {fssaiPhoto && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {fssaiPhoto.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* Address Proof */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Additional Address Proof
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-gray-50/50">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setAddressProof(e.target.files[0])}
//                           className="hidden"
//                           id="addressUpload"
//                         />
//                         <label htmlFor="addressUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-gray-100 rounded-full mb-3">
//                             <FiUpload className="text-gray-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload Utility Bill/Rental Agreement
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {addressProof && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {addressProof.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>

//                     {/* Business Registration */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         Business Registration Certificate
//                       </label>
//                       <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-500 transition-colors duration-200 bg-gray-50/50">
//                         <input
//                           type="file"
//                           accept="image/*,.pdf"
//                           onChange={(e) => setBusinessRegistration(e.target.files[0])}
//                           className="hidden"
//                           id="businessUpload"
//                         />
//                         <label htmlFor="businessUpload" className="cursor-pointer text-center w-full">
//                           <div className="p-3 bg-gray-100 rounded-full mb-3">
//                             <FiUpload className="text-gray-500" size={20} />
//                           </div>
//                           <p className="text-sm text-gray-600 mb-1">
//                             Upload Registration Certificate
//                           </p>
//                           <p className="text-xs text-gray-400">PNG, JPG, PDF up to 5MB</p>
//                           {businessRegistration && (
//                             <p className="text-xs text-green-600 mt-2">
//                               ✓ {businessRegistration.name}
//                             </p>
//                           )}
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Verification Info */}
//                 <div className="bg-gradient-to-r from-green-50/50 to-emerald-50/50 border border-green-100/50 rounded-xl p-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="p-2 bg-green-100 rounded-lg">
//                       <FiCheck className="text-green-600" size={18} />
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-800">Verification Process</p>
//                       <p className="text-xs text-gray-600 mt-1">
//                         ✅ Verification typically takes 24-48 hours after submission.
//                         <br />
//                         ✅ Ensure names on PAN, GST, and bank account match exactly.
//                         <br />
//                         ✅ Pickup address state should match your GST state.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Form Actions */}
//             <div className="flex justify-between pt-6 border-t border-gray-200 mt-8">
//               <button
//                 type="button"
//                 onClick={prevStep}
//                 disabled={step === 1}
//                 className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all duration-300 font-medium ${
//                   step === 1
//                     ? 'text-gray-400 cursor-not-allowed bg-gray-100'
//                     : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
//                 }`}
//               >
//                 <FiChevronLeft size={18} />
//                 Previous
//               </button>

//               {step < 3 ? (
//                 <button
//                   type="button"
//                   onClick={nextStep}
//                   className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md font-medium"
//                 >
//                   Next Step
//                   <FiChevronRight size={18} />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl transition-all duration-300 shadow-sm hover:shadow-md font-medium"
//                 >
//                   <FiCheck size={18} />
//                   Submit KYC Application
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>

//         {/* Footer Info */}
//         <div className="mt-8 text-center text-sm text-gray-500">
//           <p>Need help? Contact support@example.com</p>
//           <p className="mt-1">Your information is secure and encrypted</p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";
import axios from "axios";
import {
  FiUpload,
  FiChevronRight,
  FiChevronLeft,
  FiCheck
} from "react-icons/fi";

const API = "https://server-amber-beta-38.vercel.app/api/vendor";

export default function VendorKYC() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    shopName: "",
    fatherName: "",
    email: "",
    phone: "",
    address: "",
    gmail: "",

    businessName: "",
    gstin: "",
    fssai: "",
    pickupAddress: "",
    businessType: "",

    bankAccountNumber: "",
    bankName: "",
    ifscCode: ""
  });

  const [files, setFiles] = useState({});

  const updateForm = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const updateFile = (e) =>
    setFiles({ ...files, [e.target.name]: e.target.files[0] });

  const submit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(form).forEach((key) => {
      data.append(key, form[key]);
    });

    Object.keys(files).forEach((key) => {
      data.append(key, files[key]);
    });

    try {
      const token = localStorage.getItem("vendorToken");

      await axios.post(`${API}/update-profile`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      alert("✅ KYC submitted successfully");
      window.location.href = "/vendor/dashboard";
    } catch (err) {
      alert(err.response?.data?.message || "KYC failed");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Vendor KYC</h2>

      <form onSubmit={submit}>
        {/* STEP 1 */}
        {step === 1 && (
          <>
            <input name="shopName" placeholder="Shop Name" onChange={updateForm} required />
            <input name="fatherName" placeholder="Father Name" onChange={updateForm} required />
            <input name="email" placeholder="Email" onChange={updateForm} required />
            <input name="phone" placeholder="Phone" onChange={updateForm} required />
            <textarea name="address" placeholder="Address" onChange={updateForm} required />
          </>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <>
            <input name="businessName" placeholder="Business Name" onChange={updateForm} required />
            <input name="gstin" placeholder="GSTIN" onChange={updateForm} required />
            <input name="fssai" placeholder="FSSAI" onChange={updateForm} required />
            <textarea name="pickupAddress" placeholder="Pickup Address" onChange={updateForm} required />
            <select name="businessType" onChange={updateForm} required>
              <option value="">Business Type</option>
              <option value="sole">Sole Proprietor</option>
              <option value="partnership">Partnership</option>
            </select>
          </>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <>
            <input type="file" name="panPhoto" onChange={updateFile} required />
            <input type="file" name="aadhaarPhoto" onChange={updateFile} required />
            <input type="file" name="gstCertificate" onChange={updateFile} required />
            <input type="file" name="bankProof" onChange={updateFile} required />
            <input type="file" name="shopPhoto" onChange={updateFile} />
          </>
        )}

        {/* ACTIONS */}
        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button type="button" onClick={() => setStep(step - 1)}>
              <FiChevronLeft /> Back
            </button>
          )}

          {step < 3 ? (
            <button type="button" onClick={() => setStep(step + 1)}>
              Next <FiChevronRight />
            </button>
          ) : (
            <button type="submit">
              <FiCheck /> Submit KYC
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
