import { useState } from "react";

import { Link } from "react-router-dom";

import {
  FaBars,
  FaTimes,
} from "react-icons/fa";

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
        bg-gray-900
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
        bg-gray-900
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

        {/* TITLE */}

        <h1 className="
          text-2xl
          font-bold
          mb-10
          hidden
          md:block
        ">
          Dormitory
        </h1>

        {/* MENU */}

        <div className="
          flex
          flex-col
          gap-5
        ">

          <Link
            to="/dashboard"
            onClick={() =>
              setOpen(false)
            }
            className="
              text-lg
              hover:text-blue-300
            "
          >
            Dashboard
          </Link>

          <Link
            to="/beds"
            onClick={() =>
              setOpen(false)
            }
            className="
              text-lg
              hover:text-blue-300
            "
          >
            Beds
          </Link>

          <Link
            to="/reports"
            onClick={() =>
              setOpen(false)
            }
            className="
              text-lg
              hover:text-blue-300
            "
          >
            Reports
          </Link>

          {user?.role === "admin" && (

            <Link
              to="/users"
              onClick={() =>
                setOpen(false)
              }
              className="
                text-lg
                hover:text-blue-300
              "
            >
              Users
            </Link>

          )}

          {/* LOGOUT */}

          <button
            onClick={() => {

              localStorage.removeItem(
                "token"
              );

              localStorage.removeItem(
                "user"
              );

              window.location.href = "/";
            }}

            className="
              mt-10
              bg-red-600
              text-white
              px-4
              py-2
              rounded-md
              hover:bg-red-700
            "
          >
            Logout
          </button>

        </div>

      </div>

    </>
  );
}

export default Sidebar;