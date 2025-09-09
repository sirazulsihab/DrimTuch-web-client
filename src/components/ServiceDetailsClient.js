"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/navigation";

export default function ServiceDetailsClient({ id }) {
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState(null);

  useEffect(() => {
    async function fetchService() {
      try {
        const res = await fetch(`https://drimtuch-server.onrender.com/api/services/${id}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchService();

    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const ref = urlParams.get("ref");
      if (ref) {
        const now = new Date().getTime();
        localStorage.setItem("affiliate", JSON.stringify({ code: ref, timestamp: now }));
      }

      const token = localStorage.getItem("token");
      if (token) {
        fetch("https://drimtuch-server.onrender.com/api/affiliate/summary/me", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data?.referralCode) {
              const origin = window.location.origin;
              setReferralLink(`${origin}/services/details/${id}?ref=${data.referralCode}`);
            }
          })
          .catch((err) => console.error("Referral fetch error:", err));
      }
    }
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center h-[60vh]"><p>লোড হচ্ছে...</p></div>;
  }

  if (!service) {
    return <div className="flex justify-center items-center h-[60vh]"><p>Service পাওয়া যায়নি</p></div>;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-16 text-black rounded-3xl shadow-2xl overflow-hidden">
        {/* <Image src={service.img} alt={service.title} className="w-full h-80 object-cover" /> */}
        <div className="relative w-full h-80">
        <Image
            src={service.img}
            alt={service.title}
            fill
            className="object-cover rounded-t-2xl"
        />
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-extrabold mb-4">{service.title}</h1>
          <p className="text-lg text-gray-500 mb-6">{service.description}</p>
          {service.price && <p className="text-2xl font-bold mb-6">Price: ৳ {service.price}</p>}

          {referralLink && (
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">আপনার রেফারেল লিঙ্ক:</p>
              <input
                type="text"
                value={referralLink}
                readOnly
                className="w-full p-2 border rounded-lg text-sm"
                onClick={(e) => e.target.select()}
              />
            </div>
          )}

          <div className="flex gap-6">
            <button
              onClick={() => router.back()}
              className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-black hover:text-white transition"
            >
              Back
            </button>

            <Link
              href={`/order?serviceId=${service._id}&title=${encodeURIComponent(service.title)}&price=${service.price}`}
            >
              <button className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-black hover:text-yellow-400 transition cursor-pointer">
                Order Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
