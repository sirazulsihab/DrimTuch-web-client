"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function AffiliateLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); // যদি form submit এ কল করা হয়
    try {
      const res = await fetch("http://localhost:5000/api/affiliate/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // email/password অবশ্যই state বা variable থেকে আসবে
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Login failed");
      }

      const data = await res.json();


      //   localStorage.setItem("affiliateToken", data.token);

      localStorage.setItem("token", data.token); // ✅ save token
      localStorage.setItem("user", JSON.stringify({ _id: data.userId }));


      // Redirect to dashboard
      window.location.href = "/affiliate/dashboard";

    } catch (error) {
      console.error("Login error:", error);
      alert(error.message || "Something went wrong. Please try again.");
    }
  };


  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black text-yellow-400 px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center">Affiliate Login</h2>

          <label className="block mb-2 text-sm font-semibold">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="block mb-2 text-sm font-semibold">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full py-3 mt-2 bg-yellow-500 text-black font-bold rounded-lg hover:bg-black hover:text-yellow-400 transition"
          >
            Login
          </button>

          <p className="text-sm text-gray-300 mt-4 text-center">
            Don't have an account?{" "}
            <a
              href="/affiliate/signup"
              className="text-yellow-400 hover:text-yellow-200 font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
