"use client";

import { useEffect, useState } from "react";

export default function Coupons() {
  const [mounted, setMounted] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [form, setForm] = useState({
    code: "",
    discountPercent: 0,
    active: true,
    validTill: "",
  });

  useEffect(() => {
    setMounted(true);
    fetchCoupons();
  }, []);

  // Fetch coupons from backend
  const fetchCoupons = async () => {
    try {
      const token = localStorage.getItem("adminToken"); // JWT or cookie auth
      const res = await fetch("http://localhost:5000/api/admin/coupons", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();

      // Ensure coupons is always an array
      const list = Array.isArray(data) ? data : data.coupons || [];
      setCoupons(list);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
      setCoupons([]);
    }
  };

  if (!mounted) return null;

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add coupon
  const addCoupon = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/admin/coupons/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Coupon added!");
        setForm({ code: "", discountPercent: 0, active: true, validTill: "" });
        fetchCoupons();
      } else {
        alert(data.message || "Failed to add coupon");
      }
    } catch (err) {
      console.error("Failed to add coupon:", err);
    }
  };

  // Delete coupon
  const deleteCoupon = async (id) => {
    if (!confirm("Are you sure to delete this coupon?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch("http://localhost:5000/api/admin/coupons/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ couponId: id }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Coupon deleted!");
        setCoupons(coupons.filter((c) => c._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Format date safely
  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return isNaN(d) ? "-" : d.toLocaleDateString();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Coupons</h2>

      {/* Add Coupon Form */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-4 rounded shadow">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Coupon Code</label>
          <input
            type="text"
            name="code"
            placeholder="Enter coupon code"
            value={form.code}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Discount %</label>
          <input
            type="number"
            name="discountPercent"
            placeholder="Enter discount percentage"
            value={form.discountPercent}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Valid Till</label>
          <input
            type="date"
            name="validTill"
            value={form.validTill}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="flex items-center mt-6">
          <input
            type="checkbox"
            name="active"
            checked={form.active}
            onChange={handleChange}
          />
          <span className="ml-2 font-semibold">Active</span>
        </div>

        <button
          onClick={addCoupon}
          className="bg-green-500 text-white px-4 py-2 rounded col-span-2 hover:bg-green-600 transition"
        >
          Add Coupon
        </button>
      </div>

      {/* Coupons Table */}
      <table className="w-full border">
        <thead>
          <tr className="border-b bg-gray-100">
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Discount %</th>
            <th className="p-2 text-left">Active</th>
            <th className="p-2 text-left">Valid Till</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(coupons) ? coupons : []).map((c) => (
            <tr key={c._id} className="border-b hover:bg-gray-50">
              <td className="p-2">{c.code}</td>
              <td className="p-2">{c.discountPercent}</td>
              <td className="p-2">{c.active ? "✅" : "❌"}</td>
              <td className="p-2">{formatDate(c.validTill)}</td>
              <td className="p-2 space-x-2">
                <button
                  onClick={() => deleteCoupon(c._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {(!coupons || coupons.length === 0) && (
            <tr>
              <td colSpan={5} className="p-2 text-center text-gray-500">
                No coupons found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
