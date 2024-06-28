import React from "react";
import { NAVLINKS } from "./data";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useSelector } from "react-redux";
import { userNameFormatter } from "../../utils/userNameFormatter";
import { useDispatch } from "react-redux";
import { clearUser } from "../../reduxApp/user.slice";

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
        <ul className="menu menu-horizontal gap-5">
          <UserInfo />
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

function UserNotLoggedIn() {
  return (
    <>
      <li className="flex flex-col">
        <Link
          to="/auth/login"
          className="uppercase text-xl font-mono font-medium"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          to="/auth/signup"
          className="uppercase text-xl font-mono font-medium"
        >
          Register
        </Link>
      </li>
    </>
  );
}

function UserInfo() {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return user?.id !== null ? (
    <div className="dropdown dropdown-end">
      <div className="flex items-center">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-circle avatar placeholder"
        >
          <div className="w-10 rounded-full text-xl">
            {userNameFormatter(user?.username)}
          </div>
        </div>
        <div className="ml-2 flex flex-col">
          <span className=" text-lg">{user?.username}</span>
          <span className="">{user?.email}</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
      >
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li>
          <a
            onClick={() => {
              dispatch(clearUser());
            }}
          >
            Logout
          </a>
        </li>
      </ul>
    </div>
  ) : (
    <UserNotLoggedIn />
  );
}
