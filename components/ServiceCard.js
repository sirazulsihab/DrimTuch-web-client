"use client";
import Link from "next/link";

export default function ServiceCard({ service }) {
  const { _id, title, description, img, price } = service;

  return (
    <div className="bg-black text-yellow-400 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-yellow-400 hover:text-black">
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-300 line-clamp-1 mb-2">{description}</p>
        {price && <p className="mt-2 text-sm font-bold">৳ {price}</p>}

        <div className="mt-4 flex gap-4">
          <Link href={`/services/details/${_id}`}>
            <button className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-black hover:text-white transition cursor-pointer">
              See Details
            </button>
          </Link>
          <button className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-semibold hover:bg-black hover:text-yellow-400 transition cursor-pointer">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}
