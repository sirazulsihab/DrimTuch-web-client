"use client";

import { useEffect, useState } from "react";

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // JWT token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first!");
      window.location.href = "/affiliate/login"; // redirect if not logged in
      return;
    }
  
    const fetchAffiliate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/affiliate/summary/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          throw new Error("Failed to fetch affiliate data");
        }
  
        const data = await res.json();
        setAffiliate(data);
      } catch (err) {
        console.error(err);
        alert("Error fetching affiliate data");
      } finally {
        setLoading(false);
      }
    };
  
    fetchAffiliate();
  }, []);

  
  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!affiliate) return <p className="text-center text-red-500">Affiliate data not found</p>;

  const referralLink = `${window.location.origin}/?ref=${affiliate.referralCode}`;

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
        Affiliate Dashboard
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Total Earnings</h3>
          <p className="text-3xl font-bold">৳ {affiliate.totalEarnings}</p>
        </div>

        <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Pending Earnings</h3>
          <p className="text-3xl font-bold">৳ {affiliate.pendingEarnings}</p>
        </div>

        <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Wallet Number</h3>
          <p className="text-lg">{affiliate.walletNumber || "Not set"}</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 text-center">
        <h3 className="text-xl font-bold mb-2 text-black">Your Referral Link</h3>
        <p className="text-sm text-gray-700 mb-4">{referralLink}</p>
        <button
          onClick={() => {
            navigator.clipboard.writeText(referralLink);
            alert("Referral link copied!");
          }}
          className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-black hover:text-yellow-400 transition"
        >
          Copy Link
        </button>
      </div>

      <div className="text-center mt-10">
        <button className="px-6 py-3 bg-yellow-500 text-black font-bold rounded-2xl hover:bg-black hover:text-yellow-400 transition">
          Request Withdraw
        </button>
      </div>
    </div>
  );
}
