"use client";

import { useEffect, useState } from "react";

export default function Coupons() {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const fetchCoupons = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coupons");
      const data = await res.json();
      setCoupons(data);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    }
  };

  const addCoupon = async () => {
    try {
      const res = await fetch("/api/coupons/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, discountPercent: discount }),
      });
      const data = await res.json();
      alert(data.message || "Coupon added!");
      setCode("");
      setDiscount("");
      fetchCoupons();
    } catch (err) {
      console.error("Failed to add coupon:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Coupons</h2>
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Coupon Code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Discount %"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={addCoupon}
          className="bg-green-500 px-4 py-2 rounded text-white"
        >
          Add
        </button>
      </div>

      <table className="w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Code</th>
            <th className="border px-2 py-1">Discount %</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((c) => (
            <tr key={c._id}>
              <td className="border px-2 py-1">{c.code}</td>
              <td className="border px-2 py-1">{c.discountPercent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
