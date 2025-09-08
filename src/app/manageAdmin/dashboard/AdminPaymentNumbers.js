"use client";

import { useState, useEffect } from "react";

export default function AdminPaymentNumbers() {
  const [bkash, setBkash] = useState("");
  const [nagad, setNagad] = useState("");
  const [rocket, setRocket] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // বর্তমান নম্বর ফেচ করা
  useEffect(() => {
    async function fetchNumbers() {
      try {
        const res = await fetch("http://localhost:5000/api/admin/payment-numbers");
        if (!res.ok) throw new Error("Failed to fetch numbers");
        const data = await res.json();
        setBkash(data.bkash || "");
        setNagad(data.nagad || "");
        setRocket(data.rocket || "");
        console.log(data)
      } catch (error) {
        console.error("Error fetching payment numbers:", error);
      }
    }
    fetchNumbers();
  }, []);

  const handleUpdate = async () => {
    if (!bkash && !nagad && !rocket) {
      setMessage("Please enter at least one number.");
      return;
    }
  
    setLoading(true);
    try {
      // localStorage থেকে adminToken নিয়ে authorization header পাঠানো
      const token = localStorage.getItem("adminToken");
  
      const res = await fetch("http://localhost:5000/api/admin/payment-numbers", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // <-- এখানে টোকেন যুক্ত করলাম
        },
        body: JSON.stringify({ bkash, nagad, rocket }),
      });
  
      if (!res.ok) throw new Error("Failed to update numbers");
  
      const data = await res.json();
      setMessage(data.message || "Updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("Failed to update payment numbers.");
    }
    setLoading(false);
  };
  

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
      <h1 className="text-xl font-bold mb-4">Update Payment Numbers</h1>

      <label className="block mb-1 font-medium">Bkash Number</label>
      <input
        type="text"
        value={bkash}
        onChange={(e) => setBkash(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter Bkash number"
      />

      <label className="block mb-1 font-medium">Nagad Number</label>
      <input
        type="text"
        value={nagad}
        onChange={(e) => setNagad(e.target.value)}
        className="w-full p-2 border rounded mb-3"
        placeholder="Enter Nagad number"
      />

      <label className="block mb-1 font-medium">Rocket Number</label>
      <input
        type="text"
        value={rocket}
        onChange={(e) => setRocket(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Enter Rocket number"
      />

      <button
        onClick={handleUpdate}
        disabled={loading}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        {loading ? "Updating..." : "Update Numbers"}
      </button>

      {message && <p className="mt-3 text-center">{message}</p>}
    </div>
  );
}
