"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import bannerImg from '../../images/areapartner.png';
import Navbar from "@/components/Navbar";

export default function AreaPartner() {
    const [faqs, setFaqs] = useState([]);
    // const [openIndex, setOpenIndex] = useState(null);



    const [openIndex, setOpenIndex] = useState(0); // ✅ প্রথমটা ডিফল্ট ওপেন থাকবে

    // const toggleAccordion = (index) => {
    //   setOpenIndex(openIndex === index ? null : index);
    // };

    useEffect(() => {
        // FAQ গুলো backend থেকে fetch হবে
        const fetchFaqs = async () => {
            try {
                // const res = await fetch("https://your-backend-api.com/api/faqs/area-partner");
                const res = await fetch("http://localhost:5000/api/faqs");
                const data = await res.json();
                setFaqs(data);
            } catch (error) {
                console.error("Failed to load FAQs:", error);
            }
        };

        fetchFaqs();
    }, []);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div>
            <Navbar/>
            <div className="bg-black min-h-screen text-white">
                {/* Header */}
                <div className="text-center py-5 bg-orange-600 text-black shadow-md">
                    <h1 className="text-3xl md:text-4xl text-white font-bold">এরিয়া পার্টনার</h1>
                </div>

                {/* Banner */}
                {/* <div className="max-w-5xl mx-auto">
                    <Image
                        src={bannerImg}
                        alt="Area Partner Banner"
                        width={1200}
                        height={200}
                        className="rounded-2xl shadow-lg object-cover w-full h-auto"
                    />
                </div> */}

                <div className="max-w-5xl mx-auto my-2">
                <div className="relative w-full h-[550px]">
                    <Image
                    src={bannerImg}
                    alt="Area Partner Banner"
                    fill
                    className="rounded-2xl shadow-lg object-cover"
                    />
                </div>
                </div>


                {/* FAQs Section */}
                <div className="max-w-5xl mx-auto my-10 pb-16">
      <h2 className="text-3xl font-bold text-orange-600 mb-8 text-center">
        সাধারণ প্রশ্নোত্তর
      </h2>

      <div className="space-y-4 px-1">
        {faqs.length > 0 ? (
          faqs.map((faq, index) => (
            <div
              key={faq._id}
              className="border border-orange-500 rounded-xl overflow-hidden shadow-md transition"
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(index)}
                className={`w-full flex justify-between items-center px-5 py-4 text-left font-semibold text-lg transition-colors cursor-pointer ${
                  openIndex === index
                    ? "bg-gray-200 text-black"
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                <span>{faq.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-black" : "text-white"
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Accordion Body (Smooth transition) */}
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 py-4 bg-gray-50 text-gray-800 leading-relaxed border-t border-gray-500">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">লোড হচ্ছে...</p>
        )}
      </div>
    </div>

            </div>
        </div>
    );
}
