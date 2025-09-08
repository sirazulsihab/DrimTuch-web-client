"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("serviceId");
  const title = searchParams.get("title");
  const price = Number(searchParams.get("price")) || 0;

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

  // Compute final price dynamically
  const finalPrice = Math.max(price - discount, 0);

  // Fetch Admin Payment Numbers
  useEffect(() => {
    const fetchAdminNumbers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/payment-numbers"); // Public route
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data = await res.json();
        setAdminNumbers(data); // bkash, nagad, rocket নাম্বারগুলো সেট হবে
      } catch (err) {
        console.error("Failed to fetch admin numbers", err);
      }
    };
  
    fetchAdminNumbers();
  }, []);
  

  // Apply Coupon
  const applyCoupon = async () => {
    if (!coupon.trim()) return alert("Please enter a coupon code");
  
    try {
      const res = await fetch("http://localhost:5000/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon.trim(), amount: price }),  // 🔹 এখানে amount পাঠাও
      });
  
      const data = await res.json();
  
      if (data.valid && typeof data.discount === "number") {
        setDiscount(data.discount);
        alert(`Coupon applied! You saved ৳${data.discount}`);
      } else {
        setDiscount(0);
        alert(data.message || "Invalid Coupon");
      }
    } catch (err) {
      console.error("Coupon error", err);
      alert("Failed to apply coupon");
    }
  };
  

  // Simple phone validation
  const isPhoneValid = (phone) => {
    // Bangladeshi phone number pattern: 01XXXXXXXXX
    const pattern = /^(?:\+?88)?01[3-9]\d{8}$/;
    return pattern.test(phone);
  };

  // Place Order Function
  const placeOrder = async () => {
    if (!customerName.trim()) return alert("Please enter your name");
    if (!customerPhone.trim() || !isPhoneValid(customerPhone)) return alert("Please enter a valid Bangladeshi phone number");
    if (!paymentMethod) return alert("Please select a payment method");
    if (!transactionId.trim()) return alert("Please enter transaction ID");

    let affiliateCode = null;

    if (typeof window !== "undefined") {
      const affiliateData = localStorage.getItem("affiliate");
      if (affiliateData) {
        const { code, timestamp } = JSON.parse(affiliateData);
        const now = new Date().getTime();
        if (now - timestamp < 60 * 60 * 1000) {
          affiliateCode = code;
        } else {
          localStorage.removeItem("affiliate");
        }
      }
    }

    try {
      const body = {
        serviceId,
        amount: price,
        finalAmount: finalPrice,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || null,
        customerPhone: customerPhone.trim(),
        couponCode: coupon.trim() || null,
        affiliateCode: affiliateCode || null,
        paymentMethod,
        transactionId: transactionId.trim(),
      };

      const res = await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Order placed successfully! Your order number is ${data.orderNumber}`);
        // Reset form
        setCustomerName("");
        setCustomerEmail("");
        setCustomerPhone("");
        setCoupon("");
        setDiscount(0);
        setPaymentMethod("");
        setTransactionId("");
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
      <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-yellow-400">
        <h2 className="text-3xl font-bold text-yellow-500 mb-4">Place Your Order</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="email"
            placeholder="Your Email (Optional)"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          {/* Coupon */}
          <div className="flex">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border p-3 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={applyCoupon}
              className="px-5 bg-yellow-500 text-black rounded-r hover:bg-black hover:text-yellow-400 transition font-semibold"
            >
              Apply
            </button>
          </div>

          {/* Payment Method */}
          <select
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
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
              <span className="font-bold">{adminNumbers[paymentMethod] || "Not available"}</span>
            </p>
          )}

          <input
            type="text"
            placeholder="Transaction ID"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={placeOrder}
            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-black hover:text-yellow-400 transition"
          >
            Place Order
          </button>
        </div>
      </div>

      {/* Right Section - Summary */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-yellow-400">
        <h3 className="text-xl font-bold mb-4">Order Summary</h3>
        <p className="flex justify-between mb-2">
          <span>Service:</span> <span>{title}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Price:</span> <span>৳ {price}</span>
        </p>
        {discount > 0 && (
          <p className="flex justify-between text-green-600 mb-2">
            <span>Discount:</span> <span>-৳ {discount}</span>
          </p>
        )}
        <hr className="my-3" />
        <p className="flex justify-between font-bold text-lg">
          <span>Total:</span> <span>৳ {finalPrice}</span>
        </p>
      </div>
    </div>
  );
}
