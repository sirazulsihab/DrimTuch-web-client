"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function OrderForm() {
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
        const res = await fetch("https://drimtuch-server.onrender.com/api/admin/payment-numbers");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
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
    if (!coupon.trim()) return alert("Please enter a coupon code");

    try {
      const res = await fetch("https://drimtuch-server.onrender.com/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: coupon.trim(), amount: price }),
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
    const pattern = /^(?:\+?88)?01[3-9]\d{8}$/;
    return pattern.test(phone);
  };

  // Place Order Function
  const placeOrder = async () => {
    if (!customerName.trim()) return alert("Please enter your name");
    if (!customerPhone.trim() || !isPhoneValid(customerPhone))
      return alert("Please enter a valid Bangladeshi phone number");
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

      const res = await fetch("https://drimtuch-server.onrender.com/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        alert(`Order placed successfully! Your order number is ${data.orderNumber} Save Your Order Number for futher query`);
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
    <div>
      <Navbar/>
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-orange-600">
        <h2 className="text-3xl font-bold text-orange-600 text-center rounded-xl p-2 bg-black mb-4">Submit Your Project</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="email"
            placeholder="Your Email (Optional)"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={customerPhone}
            onChange={(e) => setCustomerPhone(e.target.value)}
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />

          {/* Coupon */}
          <div className="flex">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="border p-3 w-full rounded-l focus:outline-none focus:ring-2 focus:ring-orange-600"
            />
            <button
              onClick={applyCoupon}
              className="px-5 bg-orange-600 text-black rounded-r hover:bg-black hover:text-orange-600 transition font-semibold"
            >
              CLAIM
            </button>
          </div>

          {/* Payment Method */}
          <select
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
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
            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
          />

          <button
            onClick={placeOrder}
            className="w-full py-3 bg-orange-600 text-black font-semibold rounded hover:bg-black hover:text-orange-600 transition cursor-pointer"
          >
            Submit Project
          </button>
        </div>
      </div>

      {/* Right Section - Summary */}
      <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-orange-600">
        <h3 className="text-xl font-bold mb-4">Project Summary</h3>
        <p className="flex justify-between mb-2">
          <span>Project:</span> <span>{title}</span>
        </p>
        <p className="flex justify-between mb-2">
          <span>Project Cost:</span> <span>৳ {price}</span>
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
    <Footer/>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<p className="text-center p-10">Loading order form...</p>}>
      <OrderForm />
    </Suspense>
  );
}



