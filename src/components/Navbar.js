"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '../images/logo.png';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Services", path: "#", dropdown: true },
    { name: "ঘরে বসে আয়", path: "/affiliate/dashboard" },
    { name: "এরিয়া পার্টনার", path: "#" },
    { name: "About Us", path: "/about" },
    { name: "Mission & Vision", path: "#" },
    { name: "Contact", path: "/contact" },
  ];

  const serviceDropdown = [
    { name: "ডিজিটাল মার্কেটিং", path: "/services/digital-marketing/" },
    { name: "ডিজিটাল সার্ভিসেস", path: "/services/digital-services/" },
    { name: "এ আই সার্ভিস", path: "/services/ai-services/" },
    { name: "কনসালটেন্সি সার্ভিস", path: "/services/consultancy/" },
    { name: "লোকাল বিজনেস", path: "/services/local-business/" },
    { name: "Track Order", path: "/order/track" },
  ];

  return (
    <nav className="bg-black text-yellow-400 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-4 md:px-8">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link href="/">
          <Image src={logo}
            width={75}
            height={75}
          />
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex text-lg font-medium">
          {navItems.map((item) =>
            item.dropdown ? (
              <li
                key={item.name}
                className="relative px-4 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-yellow-400 transition custom-3d"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <span>{item.name}</span>
                {servicesOpen && (
                  <ul className="absolute top-full left-0 bg-black text-white shadow-lg rounded pt-1 w-56">
                    {serviceDropdown.map((sub) => (
                      <li key={sub.name} className="custom-3d m-1 rounded">
                        <Link
                          href={sub.path}
                          className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item.name}
                className="relative px-4 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-yellow-400 transition custom-3d"
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            )
          )}
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-2 px-4 pb-4">
          {navItems.map((item) =>
            item.dropdown ? (
              <li key={item.name} className="custom-3d rounded">
                <span className="block px-4 py-2 font-semibold">
                  {item.name}
                </span>
                <ul className="pl-6">
                  {serviceDropdown.map((sub) => (
                    <li key={sub.name} className="custom-3d my-1 rounded">
                      <Link
                        href={sub.path}
                        className="block px-4 py-2 hover:bg-yellow-400 hover:text-black rounded"
                        onClick={() => setMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li
                key={item.name}
                className="px-4 py-2 rounded-xl cursor-pointer hover:text-black hover:bg-yellow-400 transition custom-3d"
                onClick={() => setMenuOpen(false)}
              >
                <Link href={item.path}>{item.name}</Link>
              </li>
            )
          )}
        </ul>
      )}
    </nav>
  );
}
