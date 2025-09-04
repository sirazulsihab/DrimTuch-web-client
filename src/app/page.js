"use client";

import Head from "next/head";
import "./page.css";

export default function Home() {
  return (
    <div className="bg-white text-black">
      {/* SEO Head */}
      <Head>
        <title>DrimTuch - Digital Services & Marketing Solutions</title>
        <meta
          name="description"
          content="DrimTuch - ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও গ্রাফিক ডিজাইনের সেরা সমাধান।"
        />
        <meta name="keywords" content="DrimTuch, Web Development, Digital Marketing, SEO, Facebook Marketing, YouTube Marketing, Bangladesh" />
        <meta name="author" content="DrimTuch Team" />
      </Head>

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 bg-white z-50">
        <div className="text-2xl font-bold text-yellow-400">DrimTuch</div>
        <ul className="flex gap-6 text-lg font-medium">
          {["Home", "Services", "About Us", "Contact"].map((item) => (
            <li
              key={item}
              className="relative px-4 py-2 rounded-xl cursor-pointer custom-3d hover:text-yellow-400"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>

      {/* Banner */}
      <section className="h-[60vh] flex flex-col justify-center items-center bg-black text-yellow-400 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Welcome to DrimTuch
        </h1>
        <p className="text-lg md:text-xl text-white">
          আপনার সকল ডিজিটাল সলিউশনের জন্য এক ঠিকানা
        </p>
      </section>

      {/* Services */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Web Development", "Digital Marketing", "Graphic Design"].map(
            (service) => (
              <div
                key={service}
                className="bg-yellow-400 text-black p-6 rounded-2xl shadow-lg custom-3d cursor-pointer hover:bg-black hover:text-yellow-400 transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p>
                  আপনার ব্যবসাকে এগিয়ে নিতে {service} এর মাধ্যমে আমরা সেরা সমাধান
                  দিয়ে থাকি।
                </p>
              </div>
            )
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

      {/* Popular Services */}
      <section className="px-8 py-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-black">
          Popular Services
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {["Facebook Marketing", "YouTube Marketing", "SEO Optimization"].map(
            (service) => (
              <div
                key={service}
                className="bg-black text-yellow-400 p-6 rounded-2xl shadow-lg custom-3d cursor-pointer hover:bg-yellow-400 hover:text-black transition"
              >
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p>
                  {service} এর মাধ্যমে আপনার ব্র্যান্ডকে কোটি মানুষের কাছে পৌঁছে
                  দিন। প্রমাণিত স্ট্রাটেজি ব্যবহার করি।
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-yellow-400 text-center py-6">
        <p>
          © {new Date().getFullYear()} DrimTuch. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
