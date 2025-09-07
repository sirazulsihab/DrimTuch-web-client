"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const title = searchParams.get("title");
  const price = Number(searchParams.get("price"));

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [adminNumbers, setAdminNumbers] = useState({
    bkash: "",
    nagad: "",
    rocket: "",
  });

  const finalPrice = price - discount;

  // Fetch Admin Payment Numbers
  useEffect(() => {
    const fetchAdminNumbers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/adminPayment/payment-numbers");
        const data = await res.json();
        setAdminNumbers(data);
      } catch (err) {
        console.error("Failed to fetch admin numbers", err);
      }
    };
    fetchAdminNumbers();
  }, []);

  // Apply Coupon
  const applyCoupon = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon, serviceId }),
      });
      const data = await res.json();

      if (data.valid) {
        setDiscount(data.discountAmount);
        alert("Coupon Applied!");
      } else {
        setDiscount(0);
        alert("Invalid Coupon");
      }
    } catch (err) {
      console.error("Coupon error", err);
    }
  };

  
  // Place Order
  const placeOrder = async () => {
    if (!customerName || !customerEmail || !customerPhone || !paymentMethod || !transactionId) {
      return alert("Please fill all required fields");
    }

    let affiliateCode = null;
    if (typeof window !== "undefined") {
    const affiliateData = localStorage.getItem("affiliate");
    if (affiliateData) {
        const { code, timestamp } = JSON.parse(affiliateData);
        const now = new Date().getTime();
        if (now - timestamp < 60 * 60 * 1000) { // ১ ঘন্টা
        affiliateCode = code;
        } else {
        localStorage.removeItem("affiliate");
        }
    }
    }


    try {
      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          amount: finalPrice,
          customerName,
          customerEmail,
          customerPhone,
          couponCode: coupon || null,
          affiliateCode,   // localStorage থেকে এসেছে
          paymentMethod,
          transactionId,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Order placed successfully! Your order number is ${data.orderNumber}`);
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (err) {
      console.error("Order error", err);
      alert("Something went wrong while placing the order.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="md:col-span-2 space-y-4">
        <h2 className="text-3xl font-bold text-yellow-500">Place Your Order</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={customerPhone}
          onChange={(e) => setCustomerPhone(e.target.value)}
          className="border p-2 w-full rounded"
        />

        {/* Coupon */}
        <div className="flex">
          <input
            type="text"
            placeholder="Coupon Code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="border p-2 w-full rounded-l"
          />
          <button
            onClick={applyCoupon}
            className="px-4 bg-yellow-500 text-black rounded-r hover:bg-black hover:text-yellow-400 transition cursor-pointer"
          >
            Apply
          </button>
        </div>

        {/* Payment Method */}
        <select
          className="border p-2 w-full rounded"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select Payment Method</option>
          <option value="bkash">Bkash</option>
          <option value="nagad">Nagad</option>
          <option value="rocket">Rocket</option>
        </select>

        {paymentMethod && (
          <p className="bg-gray-100 p-2 rounded text-sm">
            Send money to this {paymentMethod} number:{" "}
            <span className="font-bold">
              {adminNumbers[paymentMethod] || "Not available"}
            </span>
          </p>
        )}

        <input
          type="text"
          placeholder="Transaction ID"
          value={transactionId}
          onChange={(e) => setTransactionId(e.target.value)}
          className="border p-2 w-full rounded"
        />

        <button
          onClick={placeOrder}
          className="w-full px-4 py-2 bg-yellow-500 text-black font-semibold rounded hover:bg-black hover:text-yellow-400 transition cursor-pointer"
        >
          Place Order
        </button>
      </div>

      {/* Right Section - Summary */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p className="flex justify-between">
          <span>Service:</span> <span>{title}</span>
        </p>
        <p className="flex justify-between">
          <span>Price:</span> <span>৳ {price}</span>
        </p>
        {discount > 0 && (
          <p className="flex justify-between text-green-600">
            <span>Discount:</span> <span>-৳ {discount}</span>
          </p>
        )}
        <hr className="my-2" />
        <p className="flex justify-between font-bold text-lg">
          <span>Total:</span> <span>৳ {finalPrice}</span>
        </p>
      </div>
    </div>
  );
}
