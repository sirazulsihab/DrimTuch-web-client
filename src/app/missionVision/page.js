"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Mission() {
    return (
        <div>
            <Navbar />
            <div className="min-h-screen bg-white text-gray-800 px-6 py-12">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-orange-600">আমাদের মিশন</h1>
                    <p className="leading-relaxed">
                        আমাদের মিশন হলো ব্যবহারকারীদের জন্য একটি নিরাপদ ও নির্ভরযোগ্য প্ল্যাটফর্ম তৈরি করা।
                        আমরা চাই সহজ ব্যবহারের মাধ্যমে সবার জন্য প্রযুক্তিকে হাতের নাগালে আনা এবং সর্বদা
                        আপডেট ও আধুনিক সেবা প্রদান করা।
                    </p>
                </div>

                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6 text-orange-600">আমাদের ভিশন</h1>
                    <p className="leading-relaxed">
                        আমাদের ভিশন হলো একটি ডিজিটাল সমাধান তৈরি করা, যা সবার জন্য সহজলভ্য হবে।
                        প্রযুক্তিকে ব্যবহার করে মানুষের দৈনন্দিন কাজ আরও সহজ এবং কার্যকর করা আমাদের
                        মূল উদ্দেশ্য।
                    </p>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
