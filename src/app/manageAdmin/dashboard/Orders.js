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
    await fetch("http://localhost:5000/api/admin/orders/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId, status }),
    });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Status Badge function
  const getStatusBadge = (status) => {
    let color = "bg-gray-200 text-gray-800";
    if (status === "pending") color = "bg-yellow-100 text-yellow-700";
    if (status === "approved") color = "bg-green-100 text-green-700";
    if (status === "working") color = "bg-blue-100 text-blue-700";
    if (status === "completed") color = "bg-purple-100 text-purple-700";
    if (status === "rejected") color = "bg-red-100 text-red-700";

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${color}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  // 🔹 Payment Method Badge function
  const getPaymentBadge = (method) => {
    let color = "bg-gray-200 text-gray-800";
    if (method === "bkash") color = "bg-pink-100 text-pink-700";
    if (method === "nagad") color = "bg-orange-100 text-orange-700";
    if (method === "rocket") color = "bg-blue-100 text-blue-700";

    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded ${color}`}>
        {method?.charAt(0).toUpperCase() + method?.slice(1)}
      </span>
    );
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Orders</h2>
      <table className="min-w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">Order #</th>
            <th className="border px-2 py-1">Customer</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Payment</th>
            <th className="border px-2 py-1">Txn ID</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Affiliate</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id} className="hover:bg-gray-50">
              <td className="border px-2 py-1">
                <div className="font-semibold">{o.orderNumber}</div>
                <div className="text-xs text-gray-600">{o.serviceId?.title}</div>
              </td>

              {/* Customer Info: Name, Phone, Email */}
              <td className="border px-2 py-1">
                <div className="font-semibold">{o.customerName}</div>
                <div className="text-xs text-gray-600">{o.customerPhone}</div>
                {o.customerEmail && (
                  <div className="text-xs text-gray-600">{o.customerEmail}</div>
                )}
              </td>

              <td className="border px-2 py-1">৳ {o.finalAmount}</td>

              {/* Payment Method Badge */}
              <td className="border px-2 py-1">{getPaymentBadge(o.paymentMethod)}</td>
              <td className="border px-2 py-1">{o.transactionId}</td>

              {/* Status Badge */}
              <td className="border px-2 py-1">{getStatusBadge(o.status)}</td>

              <td className="border px-2 py-1">{o.affiliateId?.name || "-"}</td>

              {/* Action Dropdown */}
              <td className="border px-2 py-1">
                <select
                  value={o.status}
                  onChange={(e) => updateStatus(o._id, e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="working">Working</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
