import bgImage from "../assets/bg.jpg";

import logo from "../assets/logo.png";

import leoniaLogo from "../assets/Leonia.webp";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaBed, FaChartLine } from "react-icons/fa";


function Login() {

  const navigate = useNavigate();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");
const [showPassword, setShowPassword] = useState(false);
const [rememberMe, setRememberMe] = useState(false);

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
    className="min-h-screen relative bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url(${bgImage})` }}
  >
    <div className="absolute inset-0 bg-black/55"></div>

    <div className="relative z-10 min-h-screen flex items-center justify-center px-6">
   <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between px-10">

        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center text-white w-[520px] relative flex-shrink-0">
         <div
  className="absolute
  -left-40
  -top-40
  -bottom-40
  w-[520px]
  bg-gradient-to-b
  from-[#0a0f2c]/90
  to-[#0a0f2c]/70
  rounded-r-[300px]"
/>

          <div className="relative z-10">
            <img
              src={leoniaLogo}
              alt="Leonia"
              className="w-56 mb-6"
            />

            <h1 className="text-4xl font-bold leading-tight mb-4">
              Bed Management
              <br />
              System
            </h1>

            <div className="w-16 h-1 bg-purple-500 rounded-full mb-6"></div>

            <p className="text-lg text-gray-300 mb-10">
              One System.
              <br />
              Complete Control.
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-2 text-center">
                <FaBed className="text-purple-400 text-3xl mx-auto mb-3" />
                <p className="text-sm">Bed<br /> Management</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <FaChartLine className="text-blue-400 text-3xl mx-auto mb-3" />
                <p className="text-sm">Occupancy Tracking</p>
              </div>

              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-5 text-center">
                <FaShieldAlt className="text-cyan-400 text-3xl mx-auto mb-3" />
                <p className="text-sm">Secure Access</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE LOGIN */}
        <div className="w-full max-w-[420px] flex-shrink-0">
          <div className="bg-[#0e1228]/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

            <h2 className="text-white text-3xl font-bold text-center mb-2">
              Welcome Back!
            </h2>

            <p className="text-gray-300 text-center mb-8">
              Sign in to continue
            </p>

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm mb-5">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">

              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-12 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 outline-none focus:border-blue-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-400"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-gray-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() =>
                      setRememberMe(!rememberMe)
                    }
                  />
                  Remember me
                </label>

                <span className="text-gray-400 hover:text-white cursor-pointer">
                  Forgot Password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-base hover:opacity-90 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-gray-500 text-sm mt-6">
              © 2026 Leonia Holistic Destination
            </p>
          </div>
        </div>

      </div>
    </div>

    <img
      src={logo}
      alt="Watermark"
      className="absolute bottom-4 right-6 w-40 opacity-10 pointer-events-none"
    />
  </div>
);
}

export default Login;