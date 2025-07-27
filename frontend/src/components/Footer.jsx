import React from "react";
import { Link } from "react-router-dom";
import whitelogo from "./../assets/white-logo.png"
function Footer() {
  return (
    <footer className="bg-slate-900 text-white px-6 py-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-6 text-center md:text-left">
        <img src={whitelogo} width="20%" alt="Dr. Evangadi Logo" />
        <div>
          <h3 className="text-2xl font-bold text-orange-500">Dr. Evangadi</h3>
          <p className="text-sm text-slate-400 mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
        {/* Navigation Links */}
        <div className="flex flex-col sm:flex-row gap-3 text-sm mr-6">
          <Link
            to="/disclaimer"
            className="text-slate-400 hover:text-orange-400 underline"
          >
            Disclaimer |
          </Link>
          <Link
            to="/contact"
            className="text-slate-400 hover:text-orange-400 underline"
          >
            Contact |
          </Link>
          <Link
            to="/about"
            className="text-slate-400 hover:text-orange-400 underline"
          >
            About
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
