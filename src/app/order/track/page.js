"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function TrackOrder() {
    const [orderNumber, setOrderNumber] = useState("");
    const [order, setOrder] = useState(null);
    const [error, setError] = useState("");

    const handleTrack = async (e) => {
        e.preventDefault();
        setError("");
        setOrder(null);

        try {
            const res = await fetch(
                `https://drimtuch-server.onrender.com/api/orders/track/${orderNumber}`
            );

            if (!res.ok) {
                const data = await res.json();
                setError(data.message || "Something went wrong");
                return;
            }

            const data = await res.json();
            setOrder(data);
        } catch (err) {
            setError("Server error");
        }
    };

    // 🔹 Helper functions to mask phone & email
    const maskPhone = (phone) => {
        if (!phone) return "";
        const len = phone.length;
        if (len <= 3) return "***";
        return "*".repeat(len - 3) + phone.slice(-3);
    };

    const maskEmail = (email) => {
        if (!email) return "";
        const [name, domain] = email.split("@");
        const visible = Math.ceil(name.length / 2);
        return name.slice(0, visible) + "*".repeat(name.length - visible) + "@" + domain;
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-3 gap-6">
                {/* Left Section - Track Order Form */}
                <div className="md:col-span-2 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-yellow-400">
                    <h2 className="text-3xl font-bold text-yellow-500 mb-4">Track Your Order</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Order Number"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />

                        <button
                            onClick={handleTrack}
                            className="w-full py-3 bg-yellow-500 text-black font-semibold rounded hover:bg-black hover:text-yellow-400 transition"
                        >
                            Track Order
                        </button>

                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>

                {/* Right Section - Order Details */}
                {order && (
                    <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-yellow-400 md:col-span-3">
                        <h3 className="text-xl font-bold mb-4">Order Details</h3>
                        <p className="mb-2">
                            <span className="font-semibold">Order Number:</span> {order.orderNumber}
                        </p>
                        {order.serviceId?.title && (
                            <p className="mb-2">
                                <span className="font-semibold">Service:</span> {order.serviceId.title}
                            </p>
                        )}
                        <p className="mb-2">
                            <span className="font-semibold">Customer Name:</span> {order.customerName}
                        </p>
                        {order.customerEmail && (
                            <p className="mb-2">
                                <span className="font-semibold">Email:</span> {maskEmail(order.customerEmail)}
                            </p>
                        )}
                        <p className="mb-2">
                            <span className="font-semibold">Phone:</span> {maskPhone(order.customerPhone)}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Amount:</span> ৳ {order.finalAmount}
                        </p>
                        <p className="mb-2">
                            <span className="font-semibold">Status:</span> {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
