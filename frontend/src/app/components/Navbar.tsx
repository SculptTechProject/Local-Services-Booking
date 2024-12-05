"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 border-b border-b-gray-700 z-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex justify-between items-center h-24">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/logoo.svg"
            alt="Logo"
            width={80}
            height={80}
            className="svg-white"
            style={{
              filter: "brightness(0) invert(1)",
            }}
          />
          <span className="text-white font-bold text-lg">Local Services</span>
        </div>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:flex-row items-center gap-6 lg:static lg:w-auto lg:h-auto ${
            isOpen
              ? "absolute flex flex-col justify-center top-24 left-0 w-full h-[calc(100vh-6rem)] bg-gray-800"
              : "hidden"
          }`}
        >
          <li>
            <Link
              href="#PopularProviders"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-yellow-300 transition-all duration-300"
            >
              Popular Providers
            </Link>
          </li>
          <li>
            <Link
              href="#Categories"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-yellow-300 transition-all duration-300"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="#Contact"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-yellow-300 transition-all duration-300"
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Burger Button */}
        <button
          className="space-y-2 lg:hidden flex flex-col"
          aria-label="Burger"
          onClick={handleToggleOpen}
        >
          <span
            className={`h-0.5 w-8 bg-gray-200 rounded-lg transition-transform ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-8 bg-gray-200 rounded-lg transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`h-0.5 w-8 bg-gray-200 rounded-lg transition-transform ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
