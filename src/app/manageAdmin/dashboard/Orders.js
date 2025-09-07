"use client";

import { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("http://localhost:5000/api/admin/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setOrders(data.orders);
  };

  const updateStatus = async (orderId, status) => {
    const token = localStorage.getItem("adminToken");
    await fetch("/api/admin/orders/status", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ orderId, status }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">Order #</th>
            <th className="border px-2">Customer</th>
            <th className="border px-2">Amount</th>
            <th className="border px-2">Status</th>
            <th className="border px-2">Affiliate</th>
            <th className="border px-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="border px-2">{o.orderNumber}</td>
              <td className="border px-2">{o.customerName}</td>
              <td className="border px-2">{o.finalAmount}</td>
              <td className="border px-2">{o.status}</td>
              <td className="border px-2">{o.affiliateId?.name || "-"}</td>
              <td className="border px-2 space-x-2">
                <button className="bg-green-500 px-2 rounded" onClick={() => updateStatus(o._id, "approved")}>Approve</button>
                <button className="bg-red-500 px-2 rounded" onClick={() => updateStatus(o._id, "rejected")}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
