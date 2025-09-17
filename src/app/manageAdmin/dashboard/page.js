"use client";

import Orders from "./Orders";
import Affiliates from "./Affiliates";
import Services from "./Services";
import Coupons from "./Coupons";
import Payouts from "./Payouts";
import AdminPaymentNumbers from "./AdminPaymentNumbers"; 
import AdminFaqs from "./AdminFaqs";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AdminDashboard() {
  const [tab, setTab] = useState("orders");

  const handleLogout = () => {
    // লগআউট লজিক: টোকেন রিমুভ এবং লগইন পেজে রিডাইরেক্ট
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  // Sidebar বাটনের ক্লাস
  const sidebarBtnClass =
    "mb-2 text-left px-3 py-2 rounded transition-colors duration-200 font-semibold hover:bg-orange-600 hover:text-black";

  return (
    <div>
      <Navbar />

      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow p-4 flex flex-col">
          <h2 className="text-xl font-bold mb-6 text-orange-600">Admin Dashboard</h2>

          <button onClick={() => setTab("orders")} className={sidebarBtnClass}>
            Orders
          </button>
          <button onClick={() => setTab("affiliates")} className={sidebarBtnClass}>
            Affiliates
          </button>
          <button onClick={() => setTab("services")} className={sidebarBtnClass}>
            Services
          </button>
          <button onClick={() => setTab("paymentMethod")} className={sidebarBtnClass}>
            Payment Method
          </button>
          <button onClick={() => setTab("coupons")} className={sidebarBtnClass}>
            Coupons
          </button>
          <button onClick={() => setTab("payouts")} className={sidebarBtnClass}>
            Payout Requests
          </button>
          <button onClick={() => setTab("faqs")} className={sidebarBtnClass}>
            FAQs
          </button>

          <div className="mt-auto">
            <button
              onClick={handleLogout}
              className="w-full px-3 py-2 mt-4 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {tab === "orders" && <Orders />}
          {tab === "affiliates" && <Affiliates />}
          {tab === "services" && <Services />}
          {tab === "paymentMethod" && <AdminPaymentNumbers />}
          {tab === "coupons" && <Coupons />}
          {tab === "payouts" && <Payouts />}
          {tab === "faqs" && <AdminFaqs />}
        </div>
      </div>
      <Footer/>
    </div>
  );
}
