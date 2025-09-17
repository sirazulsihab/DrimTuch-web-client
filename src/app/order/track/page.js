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
        if (len <= 3) return "********";
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
            <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-1 gap-6">
                {/* Left Section - Track Order Form */}
                <div className="md:col-span-3 space-y-6 bg-white p-6 rounded-xl shadow-lg border border-orange-600">
                    <h2 className="text-3xl font-bold text-orange-600 mb-4">Track Your Order</h2>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter Order Number"
                            value={orderNumber}
                            onChange={(e) => setOrderNumber(e.target.value)}
                            className="border p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-orange-600"
                        />

                        <button
                            onClick={handleTrack}
                            className="w-full py-3 bg-orange-600 text-black font-semibold rounded hover:bg-black hover:text-orange-600 transition"
                        >
                            Track Order
                        </button>

                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                </div>

                {/* Right Section - Order Details */}
                {order && (
                <div className="bg-gray-100 p-6 rounded-xl shadow-lg border border-orange-600 md:col-span-3">
                    <h3 className="text-xl font-bold mb-4">Order Details</h3>
                    <table className="w-full border-separate border-spacing-y-3">
                    <tbody>
                        <tr>
                        <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Order Number
                        </td>
                        <td className="px-4 py-2 border border-black rounded-r-lg">
                            {order.orderNumber}
                        </td>
                        </tr>
                        {order.serviceId?.title && (
                        <tr>
                            <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Service
                            </td>
                            <td className="px-4 py-2 border border-black rounded-r-lg">
                            {order.serviceId.title}
                            </td>
                        </tr>
                        )}
                        <tr>
                        <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Customer Name
                        </td>
                        <td className="px-4 py-2 border border-black rounded-r-lg">
                            {order.customerName}
                        </td>
                        </tr>
                        {order.customerEmail && (
                        <tr>
                            <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Email
                            </td>
                            <td className="px-4 py-2 border border-black rounded-r-lg">
                            {maskEmail(order.customerEmail)}
                            </td>
                        </tr>
                        )}
                        <tr>
                        <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Phone
                        </td>
                        <td className="px-4 py-2 border border-black rounded-r-lg">
                            {maskPhone(order.customerPhone)}
                        </td>
                        </tr>
                        <tr>
                        <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Amount
                        </td>
                        <td className="px-4 py-2 border border-black rounded-r-lg">
                            ৳ {order.finalAmount}
                        </td>
                        </tr>
                        <tr>
                        <td className="bg-black text-white font-semibold px-4 py-2 rounded-l-lg w-1/3">
                            Status
                        </td>
                        <td className="px-4 py-2 border border-black rounded-r-lg">
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                )}


            </div>
        </div>
    );
}
