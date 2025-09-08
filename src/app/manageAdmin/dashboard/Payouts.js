"use client";

import { useEffect, useState } from "react";

export default function Payouts() {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPayouts = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/admin/payouts", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      const data = await res.json();
      setPayouts(data);
    } catch (err) {
      console.error("Failed to fetch payouts:", err);
    } finally {
      setLoading(false);
    }
  };

  const approvePayout = async (id) => {
    if (!confirm("Approve this payout?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/payouts/approve/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = await res.json();
      alert(data.message || "Payout approved!");
      fetchPayouts();
    } catch (err) {
      console.error("Failed to approve payout:", err);
    }
  };

  const rejectPayout = async (id) => {
    if (!confirm("Reject this payout?")) return;
    try {
      const res = await fetch(
        `http://localhost:5000/api/admin/payouts/reject/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );
      const data = await res.json();
      alert(data.message || "Payout rejected!");
      fetchPayouts();
    } catch (err) {
      console.error("Failed to reject payout:", err);
    }
  };

  useEffect(() => {
    fetchPayouts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Payout Requests</h2>

      {loading ? (
        <p>Loading payouts...</p>
      ) : (
        <table className="w-full border">
          <thead>
            <tr>
              <th className="border px-2 py-1">Affiliate</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">Requested At</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((p) => (
              <tr key={p._id}>
                <td className="border px-2 py-1">
                  {p.affiliate?.name || "N/A"}
                </td>
                <td className="border px-2 py-1">
                  {p.affiliate?.email || "N/A"}
                </td>
                <td className="border px-2 py-1">{p.amount}</td>
                <td className="border px-2 py-1">{p.status}</td>
                <td className="border px-2 py-1">
                  {new Date(p.requestedAt).toLocaleString()}
                </td>
                <td className="border px-2 py-1 flex gap-2">
                  {p.status === "pending" && (
                    <>
                      <button
                        onClick={() => approvePayout(p._id)}
                        className="bg-green-500 px-2 py-1 rounded text-white"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => rejectPayout(p._id)}
                        className="bg-red-500 px-2 py-1 rounded text-white"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
