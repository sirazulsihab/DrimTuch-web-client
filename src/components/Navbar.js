

"use client";
import Link from "next/link";
import "./Navbar.css";

export default function Navbar() {
  const navItems = [
    { name: "Home", path: "/" },
    // { name: "Services", path: "/services" },
    { name: "Services", path: "#" },
    { name: "About Us", path: "#" },
    { name: "Contact", path: "#" },
    { name: "Track Order", path: "/order/track" },
  ];

  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 bg-white z-50">
      <div className="text-2xl font-bold text-yellow-400">
        <Link href="/">DrimTuch</Link>
      </div>
      <ul className="flex gap-6 text-lg font-medium">
        {navItems.map((item) => (
          <li
            key={item.name}
            className="relative px-4 py-2 rounded-xl cursor-pointer custom-3d hover:text-yellow-400"
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
