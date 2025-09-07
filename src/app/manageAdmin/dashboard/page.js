"use client";

import Orders from "./Orders";
import Affiliates from "./Affiliates";
import Services from "./Services";
import Coupons from "./Coupons";
import Payouts from "./Payouts";
import { useState } from "react";
import Navbar from "@/components/Navbar";

export default function AdminDashboard() {
  const [tab, setTab] = useState("orders");

  return (
    <div>
      <Navbar/>
    
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow p-4 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <button onClick={() => setTab("orders")} className="mb-2 text-left">Orders</button>
        <button onClick={() => setTab("affiliates")} className="mb-2 text-left">Affiliates</button>
        <button onClick={() => setTab("services")} className="mb-2 text-left">Services</button>
        <button onClick={() => setTab("coupons")} className="mb-2 text-left">Coupons</button>
        <button onClick={() => setTab("payouts")} className="mb-2 text-left">Payout Requests</button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {tab === "orders" && <Orders />}
        {tab === "affiliates" && <Affiliates />}
        {tab === "services" && <Services />}
        {tab === "coupons" && <Coupons />}
        {tab === "payouts" && <Payouts />}
      </div>
    </div>
    </div>
  );
}
