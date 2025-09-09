// "use client";
// import { useEffect, useState } from "react";

// import { use } from "react";
// import ServiceCard from "../../../components/ServiceCard";
// import Navbar from "@/components/Navbar";

// export default function ServicesByCategory({ params: paramsPromise }) {
//   // unwrap the params promise
//   const params = use(paramsPromise);
//   const { category } = params;

//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         const res = await fetch(`https://drimtuch-server.onrender.com/api/services?category=${category}`);
//         const data = await res.json();
//         setServices(data);
//       } catch (error) {
//         console.error("Error fetching services:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     if (category) fetchServices();
//   }, [category]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-[60vh]">
//         <p className="text-gray-600">লোড হচ্ছে...</p>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold mb-8 capitalize">
//           {category.replace("-", " ")} সার্ভিসেস
//         </h2>

//         {services.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {services.map((service) => (
//               <ServiceCard key={service._id} service={service} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">এই ক্যাটাগরিতে কোনো সার্ভিস পাওয়া যায়নি।</p>
//         )}
//       </div>
//     </div>
//   );
// }
// src/app/services/[category]/page.js

import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";

// ✅ Static params for all categories
export async function generateStaticParams() {
  try {
    const res = await fetch("https://drimtuch-server.onrender.com/api/categories");
    const categories = await res.json();

    // category.slug বা fallback _id ব্যবহার করুন
    return categories.map((cat) => ({
      category: cat.slug || cat._id,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return []; // fallback empty array
  }
}

// ✅ Server Component
export default async function ServicesByCategory({ params }) {
  const { category } = params;

  let services = [];
  try {
    const res = await fetch(
      `https://drimtuch-server.onrender.com/api/services?category=${category}`,
      { next: { revalidate: 60 } } // Optional: ISR every 60s
    );
    services = await res.json();
  } catch (error) {
    console.error("Error fetching services:", error);
  }

  return (
    <div>
      <Navbar />
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
    </div>
  );
}
