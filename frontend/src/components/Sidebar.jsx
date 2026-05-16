import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-[240px] h-screen bg-gray-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-10">
        Dormitory
      </h1>

      <div className="flex flex-col gap-5">

        <Link
          className="hover:text-green-400"
          to="/"
        >
          Dashboard
        </Link>

        <Link
          className="hover:text-green-400"
          to="/beds"
        >
          Beds
        </Link>

        <Link
          className="hover:text-green-400"
          to="/reports"
        >
          Reports
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;