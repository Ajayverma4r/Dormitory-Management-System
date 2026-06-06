import { useState } from "react";

import { NavLink } from "react-router-dom";

import {

  FaBars,
  FaTimes,

  FaTachometerAlt,
  FaBed,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,

} from "react-icons/fa";

import SidebarClock from "./SidebarClock";



function Sidebar() {

  const [open, setOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return (

    <>

      {/* MOBILE HEADER */}

      <div className="
        md:hidden
        flex
        items-center
        justify-between

        bg-[#0B1120]

        text-white

        px-4
        py-3

        fixed
        top-0
        left-0

        w-full

        z-50
      ">

        <h1 className="
          text-xl
          font-bold
        ">
          Dormitory
        </h1>

        <button
          onClick={() =>
            setOpen(!open)
          }
        >

          {open
            ? <FaTimes size={24} />
            : <FaBars size={24} />
          }

        </button>

      </div>

      {/* OVERLAY */}

      {open && (

        <div
          onClick={() =>
            setOpen(false)
          }

          className="
            fixed
            inset-0
            bg-black/40
            z-40
            md:hidden
          "
        />

      )}

      {/* SIDEBAR */}

      <div className={`

        fixed
        top-0
        left-0

        h-full
        w-64

        bg-gradient-to-b

from-[#0f172a]/95
via-[#111827]/95
to-[#1e293b]/95

backdrop-blur-2xl

border-r
border-white/10

shadow-[0_8px_32px_rgba(15,23,42,0.4)]

        text-white

        p-5

        z-50

        transform
        transition-transform
        duration-300

        ${open
          ? "translate-x-0"
          : "-translate-x-full"
        }

        md:translate-x-0
      `}>

        {/* LOGO */}

        <div className="
          mb-10

          hidden
          md:flex

          items-center
          gap-3
        ">

          <div className="
            w-11
            h-11

            rounded-2xl

            bg-blue-600

            flex
            items-center
            justify-center

            text-white
            font-bold
            text-lg

            shadow-lg
          ">
            D
          </div>

          <div>

            <h1 className="
              text-xl
              font-bold
              text-white
              tracking-wide
            ">
              Dormitory
            </h1>

            <p className="
              text-xs
              text-gray-400
            ">
              Management System
            </p>

          </div>

        </div>

        {/* SIDEBAR GLOW EFFECT */}

<div className="
  absolute
  top-0
  right-0

  w-40
  h-40

  bg-blue-500/20

  blur-3xl

  rounded-full

  pointer-events-none
"/>

<div className="
  absolute
  bottom-0
  left-0

  w-40
  h-40

  bg-purple-500/20

  blur-3xl

  rounded-full

  pointer-events-none
"/>

        {/* MENU */}

        <div className="
  flex
  flex-col
  gap-3
  h-[calc(100vh-140px)]
">
          {/* DASHBOARD */}

          <NavLink

            to="/dashboard"

            onClick={() =>
              setOpen(false)
            }

            className={({ isActive }) =>

              `

              flex
              items-center
              gap-3

              px-4
              py-3

              rounded-2xl

              font-medium

              transition-all
              duration-300

              ${

                isActive

                  ? "bg-blue-600/90 text-white shadow-lg"

                  : "hover:bg-white/10 hover:text-white"
              }
            `
            }
          >

            <FaTachometerAlt />

            Dashboard

          </NavLink>

          {/* BEDS */}

          <div>

            <h2 className="
              text-sm
              uppercase
              tracking-wider
              text-gray-400
              mb-3
              px-2
            ">
              Beds
            </h2>

            <div className="
              flex
              flex-col
              gap-2
            ">

              {/* BOYS */}

              <NavLink

                to="/boys"

                onClick={() =>
                  setOpen(false)
                }

                className={({ isActive }) =>

                  `

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-2xl

                  font-medium

                  transition-all
                  duration-300

                  ${

                    isActive

                      ? "bg-blue-600/90 text-white shadow-lg"

                      : "hover:bg-white/10 hover:text-white"
                  }
                `
                }
              >

                <FaBed />

                Men Dormitory

              </NavLink>

              {/* GIRLS */}

              <NavLink

                to="/girls"

                onClick={() =>
                  setOpen(false)
                }

                className={({ isActive }) =>

                  `

                  flex
                  items-center
                  gap-3

                  px-4
                  py-3

                  rounded-2xl

                  font-medium

                  transition-all
                  duration-300

                  ${

                    isActive

                      ? "bg-pink-500 text-white shadow-lg"

                      : "hover:bg-white/10 hover:text-white"
                  }
                `
                }
              >

                <FaBed />

                Women Dormitory

              </NavLink>

            </div>

          </div>

          {/* REPORTS */}

          <NavLink

            to="/reports"

            onClick={() =>
              setOpen(false)
            }

            className={({ isActive }) =>

              `

              flex
              items-center
              gap-3

              px-4
              py-3

              rounded-2xl

              font-medium

              transition-all
              duration-300

              ${

                isActive

                  ? "bg-blue-600/90 text-white shadow-lg"

                  : "hover:bg-white/10 hover:text-white"
              }
            `
            }
          >

            <FaClipboardList />

            Reports

          </NavLink>

          {/* USERS */}

          {user?.role === "admin" && (

            <NavLink

              to="/users"

              onClick={() =>
                setOpen(false)
              }

              className={({ isActive }) =>

                `

                flex
                items-center
                gap-3

                px-4
                py-3

                rounded-2xl

                font-medium

                transition-all
                duration-300

                ${

                  isActive

                    ? "bg-blue-600/90 text-white shadow-lg"

                    : "hover:bg-white/10 hover:text-white"
                }
              `
              }
            >

              <FaUsers />

              Users

            </NavLink>

          )}

          <div className="mt-auto">

  <SidebarClock />

  <button

    onClick={() => {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/";

    }}

    className="
      mt-4
      w-full

      flex
      items-center
      justify-center
      gap-2

      bg-red-500/90
      hover:bg-red-600

      text-white

      px-4
      py-3

      rounded-2xl

      font-medium

      transition-all
      duration-300

      shadow-lg
    "
  >
    <FaSignOutAlt />
    Logout
  </button>

</div>
        </div>

      </div>

    </>
  );
}

export default Sidebar;