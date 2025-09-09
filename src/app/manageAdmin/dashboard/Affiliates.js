"use client";

import { useEffect, useState } from "react";

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);

  const fetchAffiliates = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("https://drimtuch-server.onrender.com/api/admin/affiliates", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAffiliates(data.affiliates || []);
  };

  useEffect(() => {
    fetchAffiliates();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-yellow-500">All Affiliates</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Name</th>
              <th className="border px-3 py-2 text-left">Email</th>
              <th className="border px-3 py-2 text-right">Total Earnings</th>
              <th className="border px-3 py-2 text-right">Available Balance</th>
              <th className="border px-3 py-2 text-right">Pending Earnings</th>
              <th className="border px-3 py-2 text-right">Successful Referrals</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((a) => (
              <tr key={a._id} className="hover:bg-yellow-50 transition-colors duration-200">
                <td className="border px-3 py-2">{a.name || "-"}</td>
                <td className="border px-3 py-2">{a.email || "-"}</td>
                <td className="border px-3 py-2 text-right">৳ {a.totalEarnings || 0}</td>
                <td className="border px-3 py-2 text-right">৳ {a.availableBalance || 0}</td>
                <td className="border px-3 py-2 text-right">৳ {a.pendingEarnings || 0}</td>
                <td className="border px-3 py-2 text-right">{a.successfulReferrals || 0}</td>

              </tr>
            ))}
            {affiliates.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No affiliates found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
