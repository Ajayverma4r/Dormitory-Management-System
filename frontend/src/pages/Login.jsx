import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import toast from "react-hot-toast";


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
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

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        response.data.token
      );

      // SAVE USER

      localStorage.setItem(
        "user",
        JSON.stringify(
          response.data.user
        )
      );

      toast.success("Login Success");

      navigate("/dashboard");

    } catch (error) {

      console.log(error);

      toast.error("Invalid Credentials");
    }
  };

  return (

    <div className="
      flex
      justify-center
      items-center
      h-screen
      bg-gray-100
    ">

      <form
        onSubmit={handleLogin}
        className="
          bg-white
          p-8
          rounded-xl
          shadow-md
          w-96
        "
      >

        <h1 className="
          text-3xl
          font-bold
          text-center
          mb-6
        ">
          Login
        </h1>

        {/* USERNAME */}

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-md
            mb-4
            outline-none
          "
          required
        />

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-md
            mb-4
            outline-none
          "
          required
        />

        {/* BUTTON */}

        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            text-white
            py-3
            rounded-md
            hover:bg-blue-700
          "
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;