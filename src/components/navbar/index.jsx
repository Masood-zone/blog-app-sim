import React from "react";
import { NAVLINKS } from "./data";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

function Navbar() {
  const location = useLocation();
  return (
    <nav className="navbar shadow-md">
      <div className="navbar-start">
        <a href="/">
          <span className="font-light font-mono text-3xl py-7 px-5">
            Blog App
          </span>
        </a>
      </div>
      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal gap-5">
          {NAVLINKS.map((navlink) => (
            <li key={navlink.id} className="relative flex flex-col ">
              <Link
                to={navlink.url}
                className="uppercase text-xl font-mono font-medium"
              >
                {navlink.name}
              </Link>
              {location.pathname === navlink.url && (
                <span className="absolute -bottom-[17px] w-full rounded-none border-b-4 border-b-black h-1 "></span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end lg:hidden ">
        <MobileView />
      </div>
    </nav>
  );
}

export default Navbar;

function MobileView() {
  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <Menu />
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {NAVLINKS.map((navlink) => (
          <li key={navlink.id} className="relative flex flex-col ">
            <Link
              to={navlink.url}
              className={`capitalize text-xl font-mono font-medium ${
                location.pathname === navlink.url && "bg-black text-white"
              }`}
            >
              {navlink.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
