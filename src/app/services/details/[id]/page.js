"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ServiceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { id } = params; // now from /services/details/[id]

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [id]);

  if (loading) return <p className="text-center mt-20">লোড হচ্ছে...</p>;
  if (!service) return <p className="text-center mt-20">Service পাওয়া যায়নি</p>;

  return (
    <div className="max-w-4xl mx-auto my-16 text-black-400 rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-[1.01]">
      <img src={service.img} alt={service.title} className="w-full h-80 object-cover" />
      <div className="p-8">
        <h1 className="text-4xl font-extrabold mb-4">{service.title}</h1>
        <p className="text-lg text-gray-500 mb-6">{service.description}</p>
        {service.price && <p className="text-2xl font-bold mb-6">Price: ৳ {service.price}</p>}
        <div className="flex gap-6">
          <button
            onClick={() => router.back()}
            className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-black hover:text-white transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer"
          >
            Back
          </button>
          <button className="px-6 py-3 rounded-xl bg-yellow-400 text-black font-bold hover:bg-black hover:text-yellow-400 transition transform hover:-translate-y-1 hover:shadow-lg cursor-pointer">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
