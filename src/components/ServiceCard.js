"use client";
import Link from "next/link";
import Navbar from "./Navbar";
import Image from "next/image";

export default function ServiceCard({ service }) {
  const { _id, title, description, img, price } = service;

  return (
    <div className="bg-black text-orange-600 rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:bg-orange-600 hover:text-black">
      {/* <div className="relative w-full h-48">
<Image
        src={img}
        alt={title}
        fill
        className="w-full h-48 object-cover"
      />
      </div>
       */}

      <div className="relative w-full h-48">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover rounded-t-2xl"
        />
      </div>


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
          {/* <button className="px-4 py-2 rounded-lg bg-orange-600 text-black font-semibold hover:bg-black hover:text-orange-600 transition cursor-pointer">
            Order Now
          </button> */}
          <Link href={`/order?serviceId=${_id}&title=${encodeURIComponent(title)}&price=${price}`}>
            <button className="px-4 py-2 rounded-lg bg-orange-600 text-black font-semibold hover:bg-black hover:text-orange-600 transition cursor-pointer">
              Order Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
