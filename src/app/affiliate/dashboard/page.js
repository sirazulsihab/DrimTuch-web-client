"use client";

import Navbar from "@/components/Navbar";
import { useEffect, useState } from "react";

export default function AffiliateDashboard() {
  const [affiliate, setAffiliate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [method, setMethod] = useState("");
  const [number, setNumber] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // alert("Please login first!");
      window.location.href = "/affiliate/login";
      return;
    }

    const fetchAffiliate = async () => {
      try {
        const res = await fetch("https://drimtuch-server.onrender.com/api/affiliate/summary/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAffiliate(data);

        console.log("affiliate Data", data);

        // Fetch withdraw history
        const histRes = await fetch("https://drimtuch-server.onrender.com/api/affiliate/withdraw-history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (histRes.ok) {
          const histData = await histRes.json();
          setHistory(histData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliate();
  }, []);

  const updatePayment = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://drimtuch-server.onrender.com/api/affiliate/payment-method", {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ method, number }),
    });
    const data = await res.json();
    alert(data.message);
    // Update local state after save
    if (res.ok) setAffiliate({ ...affiliate, paymentMethod: method, paymentNumber: number, paymentUpdatedAt: new Date().toISOString() });
  };

  const requestWithdraw = async () => {
    const token = localStorage.getItem("token");
    const availableBalance = affiliate.totalEarnings - affiliate.pendingEarnings;
    if (availableBalance < 1000) return alert("Balance must be at least 1000 for withdraw");
    const res = await fetch("https://drimtuch-server.onrender.com/api/affiliate/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount: Number(withdrawAmount) }),
    });
    const data = await res.json();
    alert(data.message);
    if (res.ok) setAffiliate({ ...affiliate, totalEarnings: affiliate.totalEarnings - Number(withdrawAmount) });
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/affiliate/login";
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!affiliate) return <p className="text-center text-red-500">Affiliate data not found</p>;

  const referralLink = `${window.location.origin}/?ref=${affiliate.referralCode}`;

  return (
    <div>
      <Navbar/>
      <div className="container mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-yellow-400">Affiliate Dashboard</h2>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition cursor-pointer"
          >
            Logout
          </button>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold">৳ {affiliate.totalEarnings}</p>
          </div>

          <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Pending Earnings</h3>
            <p className="text-3xl font-bold">৳ {affiliate.pendingEarnings}</p>
          </div>

          <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Available Balance</h3>
            <p className="text-3xl font-bold">৳ {affiliate.availableBalance}</p>
          </div>

          {/* ✅ Successful Referrals */}
          <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Successful Referrals</h3>
            <p className="text-3xl font-bold">{affiliate.successfulReferrals || 0}</p>
          </div>

          <div className="bg-black text-yellow-400 rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Wallet Number</h3>
            <p className="text-lg">
              {affiliate.paymentMethod && affiliate.paymentNumber?.trim() !== ""
                ? affiliate.walletNumber
                : "Not set"}
            </p>
            {affiliate.paymentMethod && affiliate.paymentNumber && (
              <p className="mt-2 text-sm">
                Method: {affiliate.paymentMethod.toUpperCase()} - {affiliate.paymentNumber}
              </p>
            )}
          </div>


        </div>


        {/* Affiliate Link */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8 text-center">
          <h3 className="text-xl font-bold mb-2 text-black">Your Referral Link</h3>
          <p className="text-sm text-gray-700 mb-4">{referralLink}</p>
          <button
            onClick={() => {
              navigator.clipboard.writeText(referralLink);
              alert("Referral link copied!");
            }}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg hover:bg-black hover:text-yellow-400 transition cursor-pointer"
          >
            Copy Link
          </button>
        </div>

        {/* Payment Method Update */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-2">Update Payment Method</h3>
          <select
            className="border p-2"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="bkash">Bkash</option>
            <option value="nagad">Nagad</option>
            <option value="rocket">Rocket</option>
          </select>
          <input
            type="text"
            placeholder="Wallet Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="border p-2 ml-2"
          />
          <button
            onClick={updatePayment}
            className="px-4 py-2 bg-yellow-500 text-black rounded-lg ml-2"
          >
            Save
          </button>
          {affiliate.paymentUpdatedAt &&
            new Date(affiliate.paymentUpdatedAt) > new Date(new Date().setMonth(new Date().getMonth() - 1)) && (
              <p className="text-red-500 mt-2">You can update payment method only once per month</p>
            )}
        </div>

        {/* Withdraw */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-2">Request Withdraw</h3>
          <input
            type="number"
            placeholder="Amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={requestWithdraw}
            disabled={affiliate.availableBalance < 1000}
            className={`px-4 py-2 rounded-lg ${affiliate.availableBalance >= 1000
              ? "bg-yellow-500 text-black hover:bg-black hover:text-yellow-400 transition"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
          >
            Withdraw
          </button>
          {affiliate.availableBalance < 1000 && <p className="text-red-500 mt-2">Balance must be at least 1000 for withdraw</p>}
        </div>


        {/* Withdraw History */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
          <h3 className="text-xl font-bold mb-2">Withdraw History</h3>
          {history.length === 0 ? (
            <p className="text-gray-500 text-center">No Data Available</p>
          ) : (
            <ul className="list-disc list-inside">
              {history.map((w, idx) => (
                <li key={idx}>
                  {w.amount} - {w.status} - {new Date(w.createdAt).toLocaleDateString()}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
