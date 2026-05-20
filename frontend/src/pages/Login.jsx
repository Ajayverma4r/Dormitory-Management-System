import bgImage from "../assets/bg.jpg";

import logo from "../assets/logo.png";

import leoniaLogo from "../assets/Leonia.webp";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(

          "/auth/login",

          {
            username,
            password,
          }
        );

      localStorage.setItem(

        "token",

        response.data.token
      );

      localStorage.setItem(

        "user",

        JSON.stringify(
          response.data.user
        )
      );

      navigate("/dashboard");

    } catch (error) {

      setError(
        error.response?.data?.message
        ||
        "Login Failed"
      );
    }
  };


  return (

    <div
  className="
    min-h-screen
    flex
    items-center
    justify-center
    p-4
    bg-cover
    bg-center
    relative
  "

  style={{
    backgroundImage:
      `url(${bgImage})`
  }}
>

  <div className="
  absolute
  inset-0
  bg-black/40
  backdrop-blur-[2px]
"></div>

{/* LEONIA LOGO */}

<img
  src={leoniaLogo}

  alt="Leonia"

  className="
    absolute
    top-5
    left-6
    w-44
    object-contain
    drop-shadow-lg
    select-none
  "
/>

      {/* LOGIN CARD */}

      <div className="
        relative z-10
        w-full
        max-w-sm
        bg-white/70
        backdrop-blur-xl
        border
        border-white/30
        shadow-2xl
        rounded-3xl
        p-2
      ">

        {/* TITLE */}

        <div className="
          text-center
          mb-8
        ">

          <h1 className="
  text-2xl
  font-bold
  text-gray-800
  whitespace-nowrap
">
  Leonia Holistic Destination
</h1>

          <p className="
            text-gray-500
            mt-2
          ">
            Bed Management System
          </p>

        </div>

        

        {/* ERROR */}

        {error && (

          <div className="
            bg-red-100
            text-red-600
            p-3
            rounded-xl
            text-sm
            mb-4
            text-center
          ">

            {error}

          </div>
        )}

        {/* FORM */}

        <form
          onSubmit={handleLogin}
          className="
  flex
  flex-col
  gap-6
  mt-6
"
        >

          {/* USERNAME */}

          <input
            type="text"

            placeholder="Username"

            value={username}

            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }

            required

            className="
  w-full
  px-4
  py-2
  rounded-2xl
  bg-white/60
  backdrop-blur-md
  border
  border-white/30
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-300
  transition-all
  text-gray-700
  placeholder:text-gray-400
"
          />

          {/* PASSWORD */}

          <input
            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }

            required

           className="
  w-full
  px-4
  py-2
  rounded-2xl
  bg-white/60
  backdrop-blur-md
  border
  border-white/30
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-300
  transition-all
  text-gray-700
  placeholder:text-gray-400
"
          />

          {/* BUTTON */}

          <button
            type="submit"

            className="
  w-full
  py-2
  rounded-2xl
  bg-gradient-to-r
  from-blue-500
  via-indigo-500
  to-purple-500
  text-white
  font-semibold
  text-lg
  shadow-lg
  hover:scale-[1.02]
  hover:shadow-2xl
  transition-all
  duration-300
"
          >

            Login

          </button>

        </form>

      </div>

      {/* WATERMARK LOGO */}

<img
  src={logo}

  alt="Ajay Verma"

  className="
    absolute
    bottom-4
    right-6
    w-39
    opacity-10
    hover:opacity-30
    transition-all
    duration-300
    select-none
    pointer-events-none
  "
/>

    </div>
  );
}

export default Login;