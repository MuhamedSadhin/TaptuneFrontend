import { Menu02Icon } from "hugeicons-react";
import React, { useEffect, useState } from "react";
import logo from "../../../assets/Image/logo2.svg";
import { Link } from "react-router-dom";

function LandingNave() {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`w-full z-[5000] fixed top-0 left-0 py-5 md:py-0 transition-all duration-500 ${
        scrolling ? "bg-raisin-black shadow-xl" : ""
      }`}
    >
      <div className="flex items-center justify-between px-5 md:p-8">
        {/* LOGO */}
        <Link to={"/"}>
          <img src={logo} className="w-32" alt="Logo" />
        </Link>

        {/* MENU WRAPPER */}
        <div
          className="relative group md:cursor-pointer"
          onClick={() => setMenuOpen((prev) => !prev)} // mobile toggle
        >
          <div className="text-seasalt">
            <Menu02Icon size={45} />
          </div>

          {/* DROPDOWN */}
          <div
            className={`
              absolute top-full right-0 mt-2 shadow-lg flex flex-col bg-seasalt rounded-3xl w-52 py-8 items-center gap-3 font-medium
              transition-all duration-300
              ${menuOpen ? "opacity-100 visible" : "opacity-0 invisible"}
              md:group-hover:opacity-100 md:group-hover:visible
            `}
          >
            <Link
              to="/"
              className="text-raisin-black text-xl hover:text-raisin-black-700"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about-us"
              className="text-raisin-black text-xl hover:text-raisin-black-700"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to=""
              className="text-raisin-black text-xl hover:text-raisin-black-700"
              onClick={() => setMenuOpen(false)}
            >
              Help
            </Link>
            <Link
              to="/docs"
              className="text-raisin-black text-xl hover:text-raisin-black-700"
              onClick={() => setMenuOpen(false)}
            >
              Docs
            </Link>
            <Link
              to="/contact"
              className="text-raisin-black text-xl hover:text-raisin-black-700"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/auth"
              className="bg-raisin-black-700 py-2 px-4 rounded-full text-lg font-light hover:bg-raisin-black-600 mt-2"
              onClick={() => setMenuOpen(false)}
            >
              Get start
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingNave;
