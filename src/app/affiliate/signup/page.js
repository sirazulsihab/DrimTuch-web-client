"use client";
import Footer from "@/components/Footer";
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
  const courses = ["Social Media Management", "Video Editing", "Canva to Earning", "AI Automation", "Digital Marketing", "Social Media Design"];


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
        <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-lg text-orange-600">
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-lg">Select Package</label>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Basic Package */}
                <label className={`p-4 rounded-xl border-2 cursor-pointer transition 
                    ${form.package === "basic" ? "border-orange-600 bg-gray-900" : "border-gray-700 bg-gray-800"}`}>
                  <input
                    type="radio"
                    name="package"
                    value="basic"
                    checked={form.package === "basic"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <h3 className="text-xl font-bold">Basic</h3>
                  <p className="text-gray-300">1000৳</p>
                  <p className="text-orange-600 font-medium">
                    Commission {packages.basic.commission}%
                  </p>
                </label>

                {/* Standard Package */}
                <label className={`p-4 rounded-xl border-2 cursor-pointer transition 
                    ${form.package === "standard" ? "border-orange-600 bg-gray-900" : "border-gray-700 bg-gray-800"}`}>
                  <input
                    type="radio"
                    name="package"
                    value="standard"
                    checked={form.package === "standard"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <h3 className="text-xl font-bold">Standard</h3>
                  <p className="text-gray-300">1500৳</p>
                  <p className="text-orange-600 font-medium">
                    Commission {packages.standard.commission}%
                  </p>
                </label>

                {/* Premium Package */}
                <label className={`p-4 rounded-xl border-2 cursor-pointer transition 
                    ${form.package === "premium" ? "border-orange-600 bg-gray-900" : "border-gray-700 bg-gray-800"}`}>
                  <input
                    type="radio"
                    name="package"
                    value="premium"
                    checked={form.package === "premium"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <h3 className="text-xl font-bold">Premium</h3>
                  <p className="text-gray-300">2000৳</p>
                  <p className="text-orange-600 font-medium">
                    Commission {packages.premium.commission}%
                  </p>
                </label>
              </div>

              {/* ✅ Selection Info */}
              {form.package && (
                <p className="bg-gray-800 mt-4 p-3 rounded text-sm text-gray-300">
                  You selected{" "}
                  <span className="font-bold capitalize">{form.package}</span> Package —
                  Pay <span className="font-bold">{form.packageAmount}৳</span> and get{" "}
                  <span className="font-bold">{packages[form.package].commission}%</span> commission per sale.
                </p>
              )}
            </div>


            {/* Course Selection */}
            <div>
              <label className="block mb-2 font-medium text-lg">
                Select Course
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {courses.map((course, idx) => (
                  <div
                    key={idx}
                    onClick={() =>
                      handleChange({
                        target: { name: "selectedCourse", value: course },
                      })
                    }
                    className={`cursor-pointer p-4 rounded-xl border transition 
                      ${
                        form.selectedCourse === course
                          ? "border-orange-600 bg-gray-900 shadow-lg"
                          : "border-gray-700 bg-gray-800 hover:border-orange-600"
                      }`}
                  >
                    <p
                      className={`text-center font-medium ${
                        form.selectedCourse === course ? "text-orange-600" : "text-white"
                      }`}
                    >
                      {course}
                    </p>
                  </div>
                ))}
              </div>
            </div>


            {/* Payment Method */}
            <div>
              <label className="block mb-1 font-medium">Payment Method</label>
              <select
                name="paymentMethod"
                className="w-full p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-3 text-orange-600 font-semibold"
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
                className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-600"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-3 right-3 text-orange-600 font-semibold"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-orange-600 text-black font-bold rounded-lg hover:bg-orange-600 transition cursor-pointer"
            >
              Register
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400 text-sm">
            Already have an account?{" "}
            <a
              href="/affiliate/login"
              className="text-orange-600 hover:underline font-semibold"
            >
              Login here
            </a>
          </p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}


