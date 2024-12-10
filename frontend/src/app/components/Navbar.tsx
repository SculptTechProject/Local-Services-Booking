"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AOS from "aos";


function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    AOS.refresh(); 
  }, [isOpen]);

  return (
    <nav
      className="sticky top-0 bg-sky-800 border-b border-b-gray-700 z-50"
      data-aos="fade-down"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-8 flex justify-between items-center h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
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
        </Link>

        {/* Navigation Links */}
        <ul
          className={`lg:flex lg:flex-row items-center gap-6 lg:static lg:w-auto lg:h-auto ${
            isOpen
              ? "absolute flex flex-col justify-center top-24 left-0 w-full h-[calc(100vh-6rem)] bg-sky-800"
              : "hidden"
          }`}
        >
          <li>
            <Link
              href="/login-client"
              onClick={handleCloseMenu}
              className="block text-base font-bold px-5 py-2 text-teal-100 hover:text-indigo-300 transition-all duration-30"
            >
              Client Login
            </Link>
          </li>
          <li>
            <Link
              href="/login-provider"
              onClick={handleCloseMenu}
              className="block text-base font-bold px-5 py-2 text-teal-100 hover:text-indigo-300 transition-all duration-30"
            >
              Provider Login
            </Link>
          </li>
          <li>
            <Link
              href="/popular-providers"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-indigo-300 transition-all duration-300"
            >
              Popular Providers
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-indigo-300 transition-all duration-300"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={handleCloseMenu}
              className="block text-base font-semibold px-5 py-2 text-gray-200 hover:text-indigo-300 transition-all duration-300"
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
          data-aos="fade-down"
        >
          <span
            className={`h-0.5 w-8 bg-sky-200 rounded-lg transition-transform ${
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


