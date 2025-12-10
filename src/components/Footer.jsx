// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logow.png";
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-green-900 to-black text-gray-300 pt-16 pb-10 px-8 mt-12">

      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">

        {/* LEFT – Logo + Menu */}
        <div className="pl-4">
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img src={Logo} alt="Logo" className="h-12 w-auto" />
            </Link>

          <nav className="flex flex-col gap-3 text-gray-300">
            <Link to="/" className="hover:text-white">Home</Link>
            <Link to="/about-us" className="hover:text-white">About Us</Link>
            <Link to="/schools" className="hover:text-white">Schools</Link>
          </nav>
        </div>

        {/* MIDDLE – CONTACT FORM STYLE */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-white">Contact Us</h3>

          <form className="space-y-4">

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-gray-800 text-gray-200 p-3 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-gray-800 text-gray-200 p-3 rounded-md outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Message */}
            <textarea
              placeholder="Message"
              rows="4"
              className="w-full bg-gray-800 text-gray-200 p-3 rounded-md outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition-all"
            >
              Submit Now
            </button>
          </form>
        </div>

        {/* RIGHT – Getting Started + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-5 text-white">Getting Started</h3>

          <div className="flex flex-col gap-3 text-gray-300 mb-6">
            <Link to="/Auth" className="hover:text-white">Sign Up</Link>
            <Link to="/Auth" className="hover:text-white">Login</Link>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 text-gray-300 mt-6">
            <Instagram className="hover:text-white cursor-pointer transition-colors" />
            <Facebook className="hover:text-white cursor-pointer transition-colors" />
            <Twitter className="hover:text-white cursor-pointer transition-colors" />
            <Youtube className="hover:text-white cursor-pointer transition-colors" />
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm max-w-7xl mx-auto">

        <p className="text-gray-400 text-center md:text-left">
          © {new Date().getFullYear()} EduBridge Ekiti. All Rights Reserved.
        </p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <Link className="hover:text-white" to="/privacy-policy">Privacy Policy</Link>
          <Link className="hover:text-white" to="/terms">Terms & Conditions</Link>
        </div>
      </div>

    </footer>
  );
}
