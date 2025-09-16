"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";  //  Router for redirect
import "./globals.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ServiceCard from "../components/ServiceCard";
import Image from "next/image";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [popularServices, setPopularServices] = useState([]);
  const [isAffiliateLoggedIn, setIsAffiliateLoggedIn] = useState(false); //  login state
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("https://drimtuch-server.onrender.com/api/categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchPopularServices() {
      try {
        const res = await fetch("https://drimtuch-server.onrender.com/api/services");
        const data = await res.json();
        const filtered = data.filter(
          (s) => s.isPopular === true || s.isPopular === "true"
        );
        setPopularServices(filtered);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    }
    fetchPopularServices();
  }, []);

  //  if affiliate logged in (localStorage এ token)
  useEffect(() => {
    const token = localStorage.getItem("affiliateToken");
    setIsAffiliateLoggedIn(!!token);
  }, []);

  const handleAffiliateClick = () => {
    if (isAffiliateLoggedIn) {
      router.push("/affiliate/dashboard");
    } else {
      router.push("/affiliate/login");
    }
  };

  return (
    <div>
      <Navbar />

      {/* Banner */}
      <section className="h-[60vh] flex flex-col justify-center items-center bg-black text-orange-600 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to DrimTuch
        </h1>
        <p className="text-lg md:text-xl text-white">
          আপনার সকল ডিজিটাল সলিউশনের জন্য এক ঠিকানা
        </p>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            আমাদের সার্ভিস ক্যাটাগরি
          </h2>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat) => (
                <Link key={cat._id} href={`/services/${cat.slug || cat._id}`}>
                  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer">
                    <div className="relative w-full h-48">
                      <Image
                        // src={cat.img}
                        src={cat.img.startsWith("http") ? cat.img : `https://drimtuch-server.onrender.com${cat.img}`}
                        alt={cat.title}
                        fill
                        className="object-cover rounded-t-2xl"
                      />
                      {console.log("check cat.img", cat.img)}
                    </div>

                    {/* <Image
                      src={cat.img}
                      alt={cat.title}
                      className="w-full h-48 object-cover rounded-t-2xl"
                    /> */}
                    <div className="p-6 text-center">
                      <h3 className="text-xl font-semibold">{cat.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">লোড হচ্ছে...</p>
          )}
        </div>
      </section>

      {/* About Us */}
      <section className="px-8 py-12 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-6 text-black">আমাদের সম্পর্কে</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mx-auto">
          DrimTuch একটি পেশাদার টিম যারা ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং
          এবং গ্রাফিক ডিজাইন সহ বিভিন্ন সেবা প্রদান করে। আমাদের লক্ষ্য হলো
          ক্লায়েন্টদের জন্য বিশ্বমানের ডিজিটাল সমাধান নিশ্চিত করা।
        </p>
      </section>

      {/* ✅ Affiliate Signup Section */}
      <section className="px-8 py-16 bg-black text-orange-600 text-center">
        <h2 className="text-3xl font-bold mb-6">
          সবার জন্য ঘরে বসে দারুন আয়ের সুযোগ
        </h2>
        <p className="text-lg max-w-2xl mx-auto mb-6 text-white">
          অনলাইন থেকে আয় শুরু করুন মোবাইল দিয়েই। এবং কোন বিষয়ে দক্ষতা ছারাই আয়ের সুযোগ পাচ্ছেন। আমার নিয়ে আসলাম আপনাদের জন্য দারুন সুযোগ। আমাদের সার্ভিস গুলা শেয়ার করে আপনিও ইনকাম করতে পারবেন ঘরে বসে। আমরা দিচ্ছি চাহিদা সম্পুর্ন বিভিন্ন সার্ভিস যা শেয়ার করার মাধ্যমে। এবং সেই সার্ভিস ক্লাইন্ট নিলেই পাচ্ছেন দারুন আয়ের সুযোগ। আপনি একটিভ ভাবে কাজ করলে ইনশাআল্লাহ্‌ মাসে ১০,০০০ থেকে ২০,০০০ টাকা বা এর বেশি ও ইনকাম সম্ভব । আপনি লিখা পড়া করছেন বা বেকার অথবা চাকরি করছেন বা ব্যাবসা । এর পাশাপাশি খুব সহজেই আয় করতে পারবেন এর মাধ্যমে ইনশাআল্লাহ্‌। আর মাত্র ১০০০ টাকা হলেই তুলতে পারবে বিকাশ , নগদ , রকেটের মাধ্যমে।
        </p>
        <button
          onClick={handleAffiliateClick}
          className="custom-3d px-6 py-3 bg-orange-600 text-black font-bold rounded-2xl hover:bg-white hover:text-black transition cursor-pointer"
        >
          ঘরে বসে আয়
        </button>
      </section>

      {/* Popular Services */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Popular Services
        </h2>

        {popularServices.length > 0 ? (
          <div className="flex flex-col md:flex-row justify-center gap-6">
            {popularServices.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">লোড হচ্ছে...</p>
        )}
      </section>

      <Footer />
    </div>
  );
}
