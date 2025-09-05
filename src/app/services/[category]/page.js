"use client";
import { useEffect, useState } from "react";

import { use } from "react";
import ServiceCard from "../../../../components/ServiceCard";

export default function ServicesByCategory({ params: paramsPromise }) {
  // unwrap the params promise
  const params = use(paramsPromise);
  const { category } = params;

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      try {
        const res = await fetch(`http://localhost:5000/api/services?category=${category}`);
        const data = await res.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    }
    if (category) fetchServices();
  }, [category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600">লোড হচ্ছে...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 capitalize">
        {category.replace("-", " ")} সার্ভিসেস
      </h2>

      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600">এই ক্যাটাগরিতে কোনো সার্ভিস পাওয়া যায়নি।</p>
      )}
    </div>
  );
}
