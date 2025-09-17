"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-orange-600">আমাদের সম্পর্কে</h1>
                    <p className="mb-6 leading-relaxed">
                        আমাদের লক্ষ্য হলো আপনাদের জন্য একটি সহজ, কার্যকরী এবং বিশ্বস্ত অনলাইন প্ল্যাটফর্ম তৈরি করা। <br />
                        এখানে ব্যবহারকারীরা নিজেদের প্রয়োজন অনুযায়ী সুবিধা পাবেন এবং ব্যবহারকারী চাইলে আমাদের যেকোন
                        প্রোডাক্ট প্রোমোট করেও ঘরে বসেই করতে পারবে বাড়তি আয়। আমরা সর্বদা চেষ্টা করি সর্বোচ্চ মান বজায় রাখতে।
                    </p>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-600">কেন আমাদের নির্বাচন করবেন?</h2>
                    <ul className="space-y-2 pl-2 list-inside">
                        <li>✔️ নির্ভরযোগ্যতা ও স্বচ্ছতা</li>
                        <li>✔️ ব্যবহার-বান্ধব ডিজাইন</li>
                        <li>✔️ দ্রুত সাপোর্ট ও সহায়তা</li>
                        <li>✔️ সর্বদা উন্নত প্রযুক্তির ব্যবহার</li>
                    </ul>

                    <h2 className="text-2xl font-semibold mt-8 mb-4 text-orange-600">📞 আমাদের সাথে যোগাযোগ</h2>
                    <p>
                        আপনার যেকোনো প্রশ্ন বা মতামতের জন্য আমাদের সাথে যোগাযোগ করুন। <br />
                        আমরা আপনার পাশে আছি সবসময়।
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
