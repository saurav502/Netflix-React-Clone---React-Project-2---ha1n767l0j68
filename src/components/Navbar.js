import React, { useState, useEffect } from "react";
import logo from "../images/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    backgroundColor: isScrolled ? "black" : "rgb(26 26 26 / 14%)",
  };

  return (
    <header
      className="flex justify-between items-center w-full fixed z-[100] top-0 px-14"
      style={navbarStyle}
    >
      <div className="flex items-center gap-4">
        <img src={logo} className="w-24 cursor-pointer bg-transparent" />
        {/* <h1 className="text-red-600 font-bold text-2xl">NETFLIX</h1> */}
        <ul className="flex gap-4 cursor-pointer">
          <li className=" text-white hover:text-gray-400">My List</li>
          <li className=" text-white hover:text-gray-400">Movies</li>
          <li className=" text-white hover:text-gray-400">TV Shows</li>
        </ul>
      </div>
      <div className="">
        <button className="text-white pr-4">Sign In</button>
        <button className="bg-red-600 px-6 py-2 rounded cursor-pointer text-white">
          Sign In
        </button>
      </div>
    </header>
  );
};

export default Navbar;
