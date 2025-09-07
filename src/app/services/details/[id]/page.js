"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ServiceDetailsPage() {

  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [referralLink, setReferralLink] = useState(null);

  // service page client-side
useEffect(() => {
  if (typeof window !== "undefined") {
    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get("ref");
    if (ref) {
      const now = new Date().getTime();
      localStorage.setItem("affiliate", JSON.stringify({ code: ref, timestamp: now }));
      console.log("Affiliate code saved from service page:", ref);
    }
  }
}, []);


  useEffect(() => {
    // ✅ সার্ভিস ফেচ
    async function fetchService() {
      try {
        const res = await fetch(`http://localhost:5000/api/services/${id}`);
        const data = await res.json();
        setService(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchService();

    // ✅ অ্যাফিলিয়েট ইউজার ডাটা ফেচ
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/affiliate/summary/me", {
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
  }, [id]);

  if (loading) return <p className="text-center mt-20">লোড হচ্ছে...</p>;
  if (!service) return <p className="text-center mt-20">Service পাওয়া যায়নি</p>;

  return (
    <div className="max-w-4xl mx-auto my-16 text-black rounded-3xl shadow-2xl overflow-hidden">
      <img src={service.img} alt={service.title} className="w-full h-80 object-cover" />
      <div className="p-8">
        <h1 className="text-4xl font-extrabold mb-4">{service.title}</h1>
        <p className="text-lg text-gray-500 mb-6">{service.description}</p>
        {service.price && <p className="text-2xl font-bold mb-6">Price: ৳ {service.price}</p>}

        {/* ✅ রেফারেল লিঙ্ক */}
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

          <Link href={`/order?serviceId=${service._id}&title=${encodeURIComponent(service.title)}&price=${service.price}`}>
            <button className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-black hover:text-yellow-400 transition">
              Order Now
            </button>
        </Link>
        </div>
      </div>
    </div>
  );
}
