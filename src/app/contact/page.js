// src/app/contact/page.js
"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSuccess("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-black text-white px-4 py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left Column - Contact Info */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-yellow-400">Contact Us</h1>
            <p className="text-gray-300">
              Reach out to us using the form or via the contact information below.
            </p>

            <div className="space-y-4">
              <div>
                <h2 className="font-semibold text-yellow-400">Address</h2>
                <p className="text-gray-300">123 DrimTuch Street, Dhaka, Bangladesh</p>
              </div>

              <div>
                <h2 className="font-semibold text-yellow-400">Phone</h2>
                <p className="text-gray-300">+880 1700 123456</p>
              </div>

              <div>
                <h2 className="font-semibold text-yellow-400">Email</h2>
                <p className="text-gray-300">info@drimtuch.com</p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-900 p-8 rounded-xl shadow-lg">
            {success && (
              <p className="bg-green-600 text-white p-2 mb-4 rounded">{success}</p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={5}
                  className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
