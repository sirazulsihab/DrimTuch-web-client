

// "use client";
// import Link from "next/link";
// import "./Navbar.css";

// export default function Navbar() {
//   const navItems = [
//     { name: "Home", path: "/" },
//     // { name: "Services", path: "/services" },
//     { name: "Services", path: "#" },
//     { name: "About Us", path: "#" },
//     { name: "Contact", path: "#" },
//     { name: "Track Order", path: "/order/track" },
//   ];

//   return (
//     <nav className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 bg-white z-50">
//       <div className="text-2xl font-bold text-yellow-400">
//         <Link href="/">DrimTuch</Link>
//       </div>
//       <ul className="flex gap-6 text-lg font-medium">
//         {navItems.map((item) => (
//           <li
//             key={item.name}
//             className="relative px-4 py-2 rounded-xl cursor-pointer custom-3d hover:text-yellow-400"
//           >
//             <Link href={item.path}>{item.name}</Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// }


"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#" },
    { name: "About Us", path: "#" },
    { name: "Contact", path: "/contact" },
    { name: "Track Order", path: "/order/track" },
  ];

  return (
    <nav className="bg-black text-yellow-400 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8">
        <div className="text-2xl font-bold">
          <Link href="/">DrimTuch</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="relative px-4 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-yellow-400 transition"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-2 px-4 pb-4">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="px-4 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-yellow-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
