import { useState } from "react";

import { NavLink } from "react-router-dom";

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

          <NavLink
            to="/dashboard"
            onClick={() =>
              setOpen(false)
            }
            className={({ isActive }) =>

  `
  px-3
  py-2
  rounded-lg
  transition

  ${

    isActive

      ? "bg-blue-600 text-white"

      : "hover:bg-gray-700"
  }
`
}
          >
            Dashboard
          </NavLink>

          <div>

  <h2 className="
    text-lg
    font-semibold
    mb-2
  ">
    Beds
  </h2>

  <div className="
    flex
    flex-col
    gap-2
    ml-4
  ">

    <NavLink
      to="/boys"
      className={({ isActive }) =>

  `
  px-3
  py-2
  rounded-lg
  transition

  ${

    isActive

      ? "bg-blue-600 text-white"

      : "hover:bg-gray-700"
  }
`
}
    >
      Boys Dormitory
    </NavLink>

    <NavLink
      to="/girls"
      className={({ isActive }) =>

  `
  px-3
  py-2
  rounded-lg
  transition

  ${

    isActive

      ? "bg-pink-400 text-white"

      : "hover:bg-pink-100"
  }
`
}
    >
      Girls Dormitory
    </NavLink>

  </div>

</div>

          <NavLink
            to="/reports"
            onClick={() =>
              setOpen(false)
            }
           className={({ isActive }) =>

  `
  px-3
  py-2
  rounded-lg
  transition

  ${

    isActive

      ? "bg-blue-600 text-white"

      : "hover:bg-gray-700"
  }
`
}
          >
            Reports
          </NavLink>

          {user?.role === "admin" && (

            <NavLink
              to="/users"
              onClick={() =>
                setOpen(false)
              }
              className={({ isActive }) =>

  `
  px-3
  py-2
  rounded-lg
  transition

  ${

    isActive

      ? "bg-blue-600 text-white"

      : "hover:bg-gray-700"
  }
`
}
            >
              Users
            </NavLink>

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