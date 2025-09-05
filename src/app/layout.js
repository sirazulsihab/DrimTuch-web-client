import "./globals.css";

export const metadata = {
  title: "DrimTuch - Digital Services & Marketing Solutions",
  description: "DrimTuch - ওয়েব ডেভেলপমেন্ট, ডিজিটাল মার্কেটিং ও গ্রাফিক ডিজাইনের সেরা সমাধান।",
  keywords: "DrimTuch, Web Development, Digital Marketing, SEO, Facebook Marketing, YouTube Marketing, Bangladesh",
  author: "DrimTuch Team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-black">
        {children}
      </body>
    </html>
  );
}
