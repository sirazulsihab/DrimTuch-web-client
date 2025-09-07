"use client";

import { useEffect, useState } from "react";

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);

  const fetchAffiliates = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch("http://localhost:5000/api/admin/affiliates", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAffiliates(data.affiliates);
  };

  useEffect(() => { fetchAffiliates(); }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Affiliates</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2">Name</th>
            <th className="border px-2">Email</th>
            <th className="border px-2">Total Earnings</th>
            <th className="border px-2">Available Balance</th>
            <th className="border px-2">Pending Earnings</th>
            <th className="border px-2">Successful Referrals</th>
          </tr>
        </thead>
        <tbody>
          {affiliates.map((a) => (
            <tr key={a._id}>
              <td className="border px-2">{a.name}</td>
              <td className="border px-2">{a.email}</td>
              <td className="border px-2">{a.totalEarnings}</td>
              <td className="border px-2">{a.availableBalance}</td>
              <td className="border px-2">{a.pendingEarnings}</td>
              <td className="border px-2">{a.successfulReferrals}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
