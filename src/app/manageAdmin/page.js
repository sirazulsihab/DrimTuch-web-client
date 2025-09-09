"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ যদি আগেই লগইন থাকে, সরাসরি Dashboard-এ পাঠিয়ে দাও
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      router.push("/manageAdmin/dashboard");
    }
  }, [router]);

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("https://drimtuch-server.onrender.com/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setLoading(false);
        return setError(data.message || "Invalid credentials");
      }

      // ✅ টোকেন সেভ করো
      localStorage.setItem("adminToken", data.token);

      // ✅ Dashboard এ পাঠাও
      router.push("/manageAdmin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-2xl shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Admin Login
          </h2>

          {error && (
            <p className="text-red-500 mb-4 text-center font-medium">{error}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3 w-full rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3 w-full rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-black hover:text-yellow-400"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}
