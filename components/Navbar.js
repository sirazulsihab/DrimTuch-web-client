"use client";
import Link from "next/link";
import "./Navbar.css";


export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md sticky top-0 bg-white z-50">
      <div className="text-2xl font-bold text-yellow-400">DrimTuch</div>
      <ul className="flex gap-6 text-lg font-medium">
        {["Home", "Services", "About Us", "Contact"].map((item) => (
          <li
            key={item}
            className="relative px-4 py-2 rounded-xl cursor-pointer custom-3d hover:text-yellow-400"
          >
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}
