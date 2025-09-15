// "use client";

// import { useEffect, useState } from "react";

// export default function Affiliates() {
//   const [affiliates, setAffiliates] = useState([]);

//   const fetchAffiliates = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch("https://drimtuch-server.onrender.com/api/admin/affiliates", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     setAffiliates(data.affiliates || []);
//   };

//   useEffect(() => {
//     fetchAffiliates();
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4 text-yellow-500">All Affiliates</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full border">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="border px-3 py-2 text-left">Name</th>
//               <th className="border px-3 py-2 text-left">Email</th>
//               <th className="border px-3 py-2 text-right">Total Earnings</th>
//               <th className="border px-3 py-2 text-right">Available Balance</th>
//               <th className="border px-3 py-2 text-right">Pending Earnings</th>
//               <th className="border px-3 py-2 text-right">Successful Referrals</th>
//             </tr>
//           </thead>
//           <tbody>
//             {affiliates.map((a) => (
//               <tr key={a._id} className="hover:bg-yellow-50 transition-colors duration-200">
//                 <td className="border px-3 py-2">{a.name || "-"}</td>
//                 <td className="border px-3 py-2">{a.email || "-"}</td>
//                 <td className="border px-3 py-2 text-right">৳ {a.totalEarnings || 0}</td>
//                 <td className="border px-3 py-2 text-right">৳ {a.availableBalance || 0}</td>
//                 <td className="border px-3 py-2 text-right">৳ {a.pendingEarnings || 0}</td>
//                 <td className="border px-3 py-2 text-right">{a.successfulReferrals || 0}</td>

//               </tr>
//             ))}
//             {affiliates.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-4 text-gray-500">
//                   No affiliates found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";

export default function Affiliates() {
  const [affiliates, setAffiliates] = useState([]);

  const fetchAffiliates = async () => {
    const token = localStorage.getItem("adminToken");
    // const res = await fetch("http://localhost:5000/api/admin/affiliates", {
    const res = await fetch("https://drimtuch-server.onrender.com/api/admin/affiliates", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setAffiliates(data.affiliates || []);
  };

  const handleApprove = async (id) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`https://drimtuch-server.onrender.com/api/admin/affiliates/approve/${id}`, {
    // await fetch(`http://localhost:5000/api/admin/affiliates/approve/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAffiliates();
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem("adminToken");
    await fetch(`https://drimtuch-server.onrender.com/api/admin/affiliates/reject/${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchAffiliates();
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
              <th className="border px-3 py-2 text-right">Package</th>
              <th className="border px-3 py-2 text-right">Commission %</th>
              <th className="border px-3 py-2 text-left">Payment Method</th>
              <th className="border px-3 py-2 text-left">Txn ID</th>
              <th className="border px-3 py-2 text-center">Payment Status</th>
              <th className="border px-3 py-2 text-right">Total Earnings</th>
              <th className="border px-3 py-2 text-right">Available Balance</th>
              <th className="border px-3 py-2 text-right">Pending Earnings</th>
              <th className="border px-3 py-2 text-right">Referrals</th>
              <th className="border px-3 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {affiliates.map((a) => (
              <tr
                key={a._id}
                className="hover:bg-yellow-50 transition-colors duration-200"
              >
                <td className="border px-3 py-2">{a.name || "-"}</td>
                <td className="border px-3 py-2">{a.email || "-"}</td>
                <td className="border px-3 py-2 text-right">৳ {a.packageAmount || 0}</td>
                <td className="border px-3 py-2 text-right">{a.commissionRate || 0}%</td>
                <td className="border px-3 py-2">{a.paymentMethod || "-"}</td>
                <td className="border px-3 py-2">{a.transactionId || "-"}</td>
                <td className="border px-3 py-2 text-center">
                  {a.paymentStatus === "pending" && (
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-800 rounded text-xs">
                      Pending
                    </span>
                  )}
                  {a.paymentStatus === "approved" && ( // ✅ success → approved
                    <span className="px-2 py-1 bg-green-200 text-green-800 rounded text-xs">
                      Approved
                    </span>
                  )}
                  {a.paymentStatus === "rejected" && (
                    <span className="px-2 py-1 bg-red-200 text-red-800 rounded text-xs">
                      Rejected
                    </span>
                  )}
                </td>
                <td className="border px-3 py-2 text-right">৳ {a.totalEarnings || 0}</td>
                <td className="border px-3 py-2 text-right">৳ {a.availableBalance || 0}</td>
                <td className="border px-3 py-2 text-right">৳ {a.pendingEarnings || 0}</td>
                <td className="border px-3 py-2 text-right">{a.successfulReferrals || 0}</td>
                <td className="border px-3 py-2 text-center">
                  {a.paymentStatus === "pending" && (
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => handleApprove(a._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(a._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                      >
                        Reject
                      </button>
                    </div>
                  )}
                  {a.paymentStatus !== "pending" && (
                    <span className="text-gray-400 text-sm">No Action</span>
                  )}
                </td>
              </tr>
            ))}
            {affiliates.length === 0 && (
              <tr>
                <td colSpan={12} className="text-center py-4 text-gray-500">
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
