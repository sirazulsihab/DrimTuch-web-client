"use client";
import { useEffect, useState } from "react";

export default function Checkout() {
  const [refCode, setRefCode] = useState(null);

  useEffect(() => {
    // URL থেকে referral code ক্যাচ করা
    const params = new URLSearchParams(window.location.search);
    const code = params.get("ref");
    if (code) {
      setRefCode(code);
      localStorage.setItem("referralCode", code);
    }
  }, []);

  const handleOrder = async () => {
    const referralCode = localStorage.getItem("referralCode");
    const res = await fetch("/api/order/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: "CUSTOMER_ID",
        items: [{ name: "Service A", price: 100 }],
        totalAmount: 100,
        referralCode,
      }),
    });
    const data = await res.json();
    alert("Order Successful!");
  };

  return (
    <div className="p-8 bg-white rounded-xl max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>
      <button
        onClick={handleOrder}
        className="px-4 py-2 bg-black text-yellow-400 rounded-lg"
      >
        Place Order
      </button>
    </div>
  );
}
