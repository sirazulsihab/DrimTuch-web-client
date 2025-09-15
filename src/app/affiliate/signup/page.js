"use client";
import Navbar from "@/components/Navbar";
import { useState, useEffect } from "react";

export default function AffiliateSignup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    package: "",
    packageAmount: 0,
    selectedCourse: "",
    paymentMethod: "",
    transactionId: "",
  });

  const [adminNumbers, setAdminNumbers] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Package details
  const packages = {
    basic: { price: 1000, commission: "5%" },
    standard: { price: 1500, commission: "7%" },
    premium: { price: 2000, commission: "10%" },
  };

  // Course options
  const courses = ["Digital Marketing", "Web Design", "Graphic Design"];

  // Fetch admin payment numbers
  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const res = await fetch(
          "https://drimtuch-server.onrender.com/api/admin/payment-numbers"
        );
        if (!res.ok) throw new Error("Failed to fetch numbers");
        const data = await res.json();
        setAdminNumbers(data);
      } catch (err) {
        console.error("Payment number fetch error:", err);
      }
    };
    fetchNumbers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "package") {
      const selectedPackage = packages[value];
      setForm((prev) => ({
        ...prev,
        package: value,
        packageAmount: selectedPackage.price,
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    // Password check
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    // Package selection check
    if (!form.package || !form.packageAmount) {
      alert("Please select a package!");
      return;
    }
  
    // Course selection check
    if (!form.selectedCourse) {
      alert("Please select a course!");
      return;
    }
  
    // Payment info check
    if (!form.paymentMethod || !form.transactionId) {
      alert("Please select payment method and enter transaction ID!");
      return;
    }
  
    try {
      // Ensure packageAmount is a number
      const bodyData = {
        ...form,
        packageAmount: Number(form.packageAmount),
      };
  
      const res = await fetch(
        "https://drimtuch-server.onrender.com/api/affiliate/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bodyData),
        }
      );
  
      const data = await res.json();

  
      if (res.ok) {
        alert("✅ Signup successful! Your Referral Code: " + data.referralCode);
        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          package: "",
          packageAmount: 0,
          selectedCourse: "",
          paymentMethod: "",
          transactionId: "",
        });
      } else {
        alert("❌ Error: " + data.message);
      }
    } catch (err) {
      console.error("Register Error:", err);
      alert("Something went wrong!");
    }
  };
  

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-lg text-yellow-400">
          <h1 className="text-3xl font-bold text-center mb-6">
            Affiliate Signup
          </h1>
          <p className="text-center text-gray-400 mb-8">
            আমাদের এফিলিয়েট প্রোগ্রামে যোগ দিন এবং ইনকাম করুন!
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Package Selection */}
            <div>
              <label className="block mb-1 font-medium">Select Package</label>
              <select
                name="package"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.package}
                onChange={handleChange}
                required
              >
                <option value="">Choose a Package</option>
                <option value="basic">
                  Basic - 1000৳ (Commission {packages.basic.commission})
                </option>
                <option value="standard">
                  Standard - 1500৳ (Commission {packages.standard.commission})
                </option>
                <option value="premium">
                  Premium - 2000৳ (Commission {packages.premium.commission})
                </option>
              </select>

              {form.package && (
                <p className="bg-gray-800 mt-2 p-2 rounded text-sm text-gray-300">
                  You selected{" "}
                  <span className="font-bold capitalize">{form.package}</span> Package — Pay{" "}
                  <span className="font-bold">{form.packageAmount}৳</span> and get{" "}
                  <span className="font-bold">{packages[form.package].commission}</span> commission per sale.
                </p>
              )}
            </div>

            {/* Course Selection */}
            <div>
              <label className="block mb-1 font-medium">Select Course</label>
              <select
                name="selectedCourse"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.selectedCourse}
                onChange={handleChange}
                required
              >
                <option value="">Choose a Course</option>
                {courses.map((course, idx) => (
                  <option key={idx} value={course}>{course}</option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                name="paymentMethod"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="">Select Payment Method</option>
                <option value="bkash">Bkash</option>
                <option value="nagad">Nagad</option>
                <option value="rocket">Rocket</option>
              </select>

              {form.paymentMethod && (
                <p className="bg-gray-800 mt-2 p-2 rounded text-sm text-gray-300">
                  Send money to this {form.paymentMethod} number:{" "}
                  <span className="font-bold">
                    {adminNumbers[form.paymentMethod] || "Not available"}
                  </span>
                </p>
              )}
            </div>

            {/* Transaction ID */}
            <div>
              <label className="block mb-1 font-medium">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                placeholder="Enter your transaction ID"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.transactionId}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-yellow-400 font-semibold"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label className="block mb-1 font-medium">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm your password"
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 right-3 text-yellow-400 font-semibold"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-400 transition cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              href="/affiliate/login"
              className="text-yellow-500 hover:underline font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}


