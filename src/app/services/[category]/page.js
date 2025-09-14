

// "use client"; // ✅ Client-side page

// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import ServiceCard from "@/components/ServiceCard";
// import Navbar from "@/components/Navbar";

// export default function ServicesByCategoryPage() {
//   const params = useParams();
//   const { category } = params;

//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchServices() {
//       try {
//         const res = await fetch(
//           `https://drimtuch-server.onrender.com/api/services?category=${category}`
//         );
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

//   return (
//     <div>
//       <Navbar />
//       <div className="container mx-auto px-6 py-16">
//         <h2 className="text-3xl font-bold mb-8 capitalize">
//           {category.replace("-", " ")} সার্ভিসেস
//         </h2>

//         {loading ? (
//           <p className="text-gray-600">লোড হচ্ছে...</p>
//         ) : services.length > 0 ? (
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

export const dynamic = "force-dynamic"; // ✅ এটা বাধ্যতামূলক

import ServiceCard from "@/components/ServiceCard";
import Navbar from "@/components/Navbar";

// Server-side fetch
async function getServicesByCategory(category) {
  try {
    const res = await fetch(
      `https://drimtuch-server.onrender.com/api/services?category=${category}`,
      { cache: "no-store" } // dynamic fetch, সবসময় fresh data
    );
    if (!res.ok) throw new Error("Failed to fetch services");
    return res.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function ServicesByCategoryPage({ params }) {
  const { category } = params;
  const services = await getServicesByCategory(category);

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




// // ✅ Remove "use client"
// import Navbar from "@/components/Navbar";
// import ServiceCard from "@/components/ServiceCard";

// export async function generateStaticParams() {
//   const res = await fetch("https://drimtuch-server.onrender.com/api/categories");
//   const categories = await res.json();

//   return categories.map((cat) => ({
//     category: cat.slug || cat._id,
//   }));
// }

// export default async function ServicesByCategoryPage({ params }) {
//   const { category } = await params;

//   const res = await fetch(`https://drimtuch-server.onrender.com/api/services?category=${category}`, { cache: "no-store" });
//   const services = await res.json();

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
