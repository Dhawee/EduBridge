import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Button from "../components/Button";
import AuthPage from "../pages/AuthPage";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About Us", "Schools"];

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 top-4
      w-[75%] md:w-[85%] rounded-2xl transition-all duration-500 z-50 backdrop-blur-md
      ${
        isScrolled
          ? "bg-white/80 shadow-xl border border-gray-200 scale-100"
          : "bg-white/30 border border-white/30 scale-95"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between h-20 items-center">

          {/* LOGO */}
          <div className="shrink-0">
            <Link to="/">
              <img className="h-14" src={Logo} alt="Logo" />
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center w-full justify-end font-semibold text-green-700">
            <div className="flex items-center space-x-14 mr-32">
              {menuItems.map((item) => {
                let path = "/";
                if (item === "About Us") path = "/about-us";
                else if (item === "Schools") path = "/schools";
                return (
                  <Link
                    key={item}
                    className="relative group transition-all duration-300"
                    to={path}
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[0.5px] bg-green-700 transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                );
              })}
            </div>

            {/* SINGLE BUTTON — GET STARTED */}
            <div>
              <Button text="Get Started" variant="solid" to="/auth" />
            </div>
          </div>

          {/* MOBILE MENU BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-700 focus:outline-none"
            >
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden bg-white/90 backdrop-blur-md shadow-lg transform transition-all duration-300 origin-top 
        ${isOpen ? "block opacity-100 scale-y-100" : "hidden opacity-0 scale-y-0"}`}
      >
        {menuItems.map((item) => {
          let path = "/";
          if (item === "About Us") path = "/about-us";
          else if (item === "Schools") path = "/schools";
          return (
            <Link
              key={item}
              className="block px-4 py-2 text-green-700 hover:bg-gray-100 transition"
              to={path}
              onClick={() => setIsOpen(false)}
            >
              {item}
            </Link>
          );
        })}

        {/* MOBILE: SINGLE GET STARTED BUTTON */}
        <div className="px-4 py-3">
          <Button
            text="Get Started"
            variant="solid"
            to="/auth"
            className="block w-full text-center"
            onClick={() => setIsOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
}
