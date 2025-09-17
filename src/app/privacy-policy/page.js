// app/privacy/page.js
"use client";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPolicy() {
  return (
    <div>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-orange-600 mb-2">প্রাইভেসি পলিসি</h1>
            <p className="text-gray-600">আপনার ডেটা আমাদের কাছে নিরাপদ — নিচে বিস্তারিত শর্তাবলী দেওয়া আছে।</p>
          </header>

          <article className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">১. ভূমিকা</h2>
              <p className="leading-relaxed text-gray-700">
                আমরা (যে প্ল্যাটফর্ম/কোম্পানির নাম) ব্যবহারকারীর গোপনীয়তা গুরুত্বের সাথে বিবেচনা করি।
                এই প্রাইভেসি পলিসিতে বলা আছে আমরা কিভাবে ব্যক্তিগত তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষিত করি
                এবং আপনার কোন কোন অধিকার রয়েছে।
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">২. আমরা কী তথ্য সংগ্রহ করি</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>নাম, ইমেইল, ফোন নম্বর ইত্যাদি পরিচয় সংক্রান্ত তথ্য।</li>
                <li>রেজিস্ট্রেশন ও আদেশ/অর্ডার সংক্রান্ত তথ্য (যেমন পেমেন্ট ট্রানজেকশন আইডি)।</li>
                <li>ব্রাউজিং সূত্র, আইপি ঠিকানা ও কুকি-ভিত্তিক তথ্য (সাইট ব্যবহারের উদ্দেশ্যে)।</li>
                <li>আপনি যখন আমাদেরকে উপগ্রহগত তথ্য (যেমন ফিডব্যাক বা যোগাযোগ) দেন সে রেকর্ড।</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৩. আমরা তথ্যটি কিভাবে ব্যবহার করি</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>সেবা প্রদানে এবং আপনার অর্ডার/রেজিস্ট্রেশন প্রসেস করতে।</li>
                <li>অ্যাকাউন্ট যাচাই, নিরাপত্তা নিশ্চিতকরণ ও প্রতারণা রোধে।</li>
                <li>আপডেট, নোটিফিকেশন ও কাস্টমার সাপোর্টের জন্য যোগাযোগ করতে।</li>
                <li>পরিসংখ্যানগত বিশ্লেষণ করে আমাদের সেবা উন্নত করতে।</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৪. কুকি এবং অনুরূপ প্রযুক্তি</h2>
              <p className="leading-relaxed text-gray-700">
                আমাদের সাইট কুকি ব্যবহার করতে পারে যাতে সেশন বজায় থাকে, ব্যবহারকারীর পছন্দ স্মরণ হয়
                এবং সাইট বিশ্লেষণ করা যায়। আপনি ব্রাউজার সেটিং থেকে কুকি নিষ্ক্রিয় করতে পারেন; তবে
                তা করলে কিছু বৈশিষ্ট্য সীমিত হতে পারে।
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৫. তথ্য শেয়ারিং ও তৃতীয় পক্ষ</h2>
              <p className="leading-relaxed text-gray-700">
                আমরা আপনার ব্যক্তিগত তথ্য কোনো তৃতীয়-পক্ষকে বিক্রি বা শেয়ার করি না।</p>

            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৬. তথ্য সংরক্ষণকাল</h2>
              <p className="leading-relaxed text-gray-700">
                আমরা প্রয়োজন অনুযায়ী আপনার তথ্য সংরক্ষণ করি — সাধারণত যতক্ষণ আপনি আমাদের সেবা ব্যবহার
                করছেন অথবা আইনগতভাবে কেবলমাত্র প্রয়োজনীয় সময় পর্যন্ত।
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৭. আপনার অধিকার</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>আপনি আপনার ব্যক্তিগত তথ্য দেখা, সংশোধন বা মুছে দেয়ার অনুরোধ করতে পারবেন।</li>
                <li>আপনি আমাদের কাছে সরাসরি যোগাযোগ করে আপনার ডেটা ব্যবহারের উপর সীমা আরোপ করতে পারবেন।</li>
                <li>ডেটা পোর্টেবিলিটি বা প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নের জন্য আমাদেরকে জানাতে পারেন।</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৮. নিরাপত্তা</h2>
              <p className="leading-relaxed text-gray-700">
                আমরা আপনার তথ্য সুরক্ষিত রাখতে কৌশলগত ও প্রযুক্তিগত ব্যবস্থা গ্রহণ করি (যেমন এনক্রিপশন,
                নিরাপদ সার্ভার ও অভিগমন নিয়ন্ত্রণ)। তথাপি অনলাইন কোন ব্যবস্থা 100% ঝুঁকিমুক্ত নয় —
                তাই সন্দেহ হলে আমাদের জানান।
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">৯. শিশুদের তথ্য</h2>
              <p className="leading-relaxed text-gray-700">
                আমাদের সেবা প্রাপ্তির জন্য সাধারণত বয়সসীমা প্রযোজ্য; আমরা সনাক্ত করে থাকি না এমন কোনো
                শিশুদের ব্যক্তিগত তথ্য ইচ্ছাকৃতভাবে সংগ্রহ করি না। যদি কোনো শিশু সংক্রান্ত তথ্য পাওয়া যায়,
                আমরা তা মুছে দেবার ব্যবস্থা নেব।
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-orange-600 mb-3">১০. পলিসি হালনাগাদ</h2>
              <p className="leading-relaxed text-gray-700">
                আমরা মাঝে মাঝে আমাদের প্রাইভেসি পলিসি আপডেট করতে পারি; বড় কোন পরিবর্তন হলে সাইটে
                এটি নির্দেশনা হিসেবে প্রকাশ করবো এবং প্রয়োজনে ইমেইলেও জানানো হবে। পলিসি প্রকাশের তারিখ:
                <strong className="ml-1">15 সেপ্টেম্বর 2025</strong>.
              </p>
            </section>
          </article>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
