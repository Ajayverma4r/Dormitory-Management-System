import bgImage from "../assets/bg.jpg";
import logo from "../assets/logo.png";
import leoniaLogo from "../assets/Leonia.webp";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaBed, FaChartLine } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    // OUTER WRAPPER: full viewport. This is the only element allowed to "grow".
    <div
      className="h-screen w-full relative bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-black/55"></div>

      {/*
        FULL-WIDTH ROW (NOT centered, NOT max-w capped).
        This is the key change: left and right are now independently
        positioned within the FULL screen width, not floating together
        as a centered pair. That's what keeps the left panel pinned left.
      */}
      <div className="relative z-10 h-full w-full flex flex-col lg:flex-row">

        {/* ============ LEFT PANEL ============ */}
        {/*
          - Fixed width (w-[560px]) — same px width on laptop AND large monitor.
            Never shrinks, never re-centers, because it's a flex-shrink-0 child
            of a full-width row, not a child of a centered w-fit group.
          - h-full — stretches to exactly the viewport height on any screen.
          - relative — so the curve (absolute) is positioned against THIS panel,
            not the whole page.
        */}
        <div className="hidden lg:flex relative flex-shrink-0 w-[560px] h-full flex-col justify-center text-white pl-20 pr-10">

          {/*
            CURVE SHAPE — FIXED.
            inset-y-0 (top-0 + bottom-0) instead of -top-40/-bottom-40.
            This guarantees the shape touches the top AND bottom edges of the
            panel (which is h-full = full viewport height) on EVERY screen
            height: 768px laptop, 900px, 1080px, 1440px — always edge to edge.
            left-0 anchors it to the panel's left edge (= screen's left edge).
            The rounded-r-[300px] is what creates the curve bulge on the right
            side only — it doesn't affect top/bottom attachment at all.
          */}
          <div
            className="absolute inset-y-0 left-0 w-full
                       bg-gradient-to-b from-[#0a0f2c]/90 to-[#0a0f2c]/70
                       rounded-r-[300px] -z-10"
          />

          {/* Content sits above the curve, fixed padding from the left edge (pl-20 above) */}
          <div className="relative z-10">
            <img src={leoniaLogo} alt="Leonia" className="w-56 mb-6" />

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
                <p className="text-sm">
                  Bed
                  <br /> Management
                </p>
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

        {/* ============ RIGHT PANEL (LOGIN FORM) ============ */}
        {/*
          flex-1 — takes up ALL remaining width after the fixed left panel.
          items-center justify-center — centers the card WITHIN that remaining
          space. This is the part that makes large monitors look intentional:
          extra width goes here as natural breathing room around a centered
          card, exactly like Linear/Stripe/Okta — not as a layout shift.
        */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-[420px] max-w-[90vw] flex-shrink-0">
            <div className="bg-[#0e1228]/70 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-6">

              <h2 className="text-white text-3xl font-bold text-center mb-2">
                Welcome Back!
              </h2>

              <p className="text-gray-300 text-center mb-8">Sign in to continue</p>

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
                      onChange={() => setRememberMe(!rememberMe)}
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