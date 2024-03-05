import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li className="">
        <NavLink to="/">Home</NavLink>
      </li>
      <li className="">
        <NavLink to="/user-data">User Data</NavLink>
      </li>
      <li className="">
        <NavLink to="/registration">Registration</NavLink>
      </li>
      <li className="">
        <NavLink to="/readTagId">Read Tag Id</NavLink>
      </li>
      <li className="">
        <NavLink to="/attendance">Attendance</NavLink>
      </li>
    </>
  );

  return (
    <div>
      <div className="navbar bg-my-pink bg-blue-200 rounded-b-lg text-my-blue ">
        <div className=" navbar-start">
          <h1 className=" font-bold text-3xl">Node MCU with Mongodb</h1>
        </div>

        <div className="navbar-end">
          <div className="dropdown">
            <label tabIndex={0} className="lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2  shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <div className="hidden lg:flex">
            <ul className="menu menu-horizontal px-1 gap-2">{navLinks}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
