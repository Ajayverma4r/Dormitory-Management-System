import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [beds, setBeds] = useState([]);

  // FETCH DATA

  const fetchBeds = async () => {

    try {

      const response = await API.get("/beds");

      setBeds(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  useEffect(() => {

    fetchBeds();

  }, []);

  // COUNTS

  const totalBeds = beds.length;

  const availableBeds = beds.filter(
    (bed) => bed.status === "available"
  ).length;

  const occupiedBeds = beds.filter(
    (bed) => bed.status === "occupied"
  ).length;

  const insideBeds = beds.filter(
    (bed) => bed.location === "inside"
  ).length;

  const outsideBeds = beds.filter(
    (bed) => bed.location === "outside"
  ).length;

  // OCCUPANCY %

  const occupancyRate =
    totalBeds > 0
      ? Math.round(
          (occupiedBeds / totalBeds) * 100
        )
      : 0;

  // RECENT OCCUPIED

  const occupiedList = beds.filter(
    (bed) => bed.status === "occupied"
  );

  return (

   <div className="
  flex
  h-screen
  overflow-hidden
">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div className="
  p-2
  w-full
  h-screen
  overflow-y-auto
  text-sm
">

        {/* TITLE */}

        <h1 className="
          text-2xl
          font-bold
          mb-4
          text-center
        ">
          Dashboard
        </h1>

        {/* STATS */}

        <div className="
          grid
          grid-cols-2
          md:grid-cols-5
          gap-3
        ">

          {/* TOTAL */}

          <div className="
            bg-blue-100
            p-2
            rounded-xl
            text-center
            shadow-sm
            hover:scale-105
            transition-all
            duration-300
          ">

            <h2 className="font-semibold">
              Total Beds
            </h2>

            <p className="
              text-2xl
              font-bold
              text-blue-700
            ">
              {totalBeds}
            </p>

          </div>

          {/* AVAILABLE */}

          <div className="
            bg-green-100
            p-2
            rounded-xl
            text-center
            shadow-sm
            hover:scale-105
            transition-all
            duration-300
          ">

            <h2 className="font-semibold">
              Available
            </h2>

            <p className="
              text-2xl
              font-bold
              text-green-700
            ">
              {availableBeds}
            </p>

          </div>

          {/* OCCUPIED */}

          <div className="
            bg-red-100
            p-2
            rounded-xl
            text-center
            shadow-sm
            hover:scale-105
            transition-all
            duration-300
          ">

            <h2 className="font-semibold">
              Occupied
            </h2>

            <p className="
              text-2xl
              font-bold
              text-red-700
            ">
              {occupiedBeds}
            </p>

          </div>

          {/* INSIDE */}

          <div className="
            bg-indigo-100
            p-2
            rounded-xl
            text-center
            shadow-sm
            hover:scale-105
            transition-all
            duration-300
          ">

            <h2 className="font-semibold">
              Inside
            </h2>

            <p className="
              text-2xl
              font-bold
              text-indigo-700
            ">
              {insideBeds}
            </p>

          </div>

          {/* OUTSIDE */}

          <div className="
            bg-orange-100
            p-2
            rounded-xl
            text-center
            shadow-sm
            hover:scale-105
            transition-all
            duration-300
          ">

            <h2 className="font-semibold">
              Outside
            </h2>

            <p className="
              text-2xl
              font-bold
              text-orange-700
            ">
              {outsideBeds}
            </p>

          </div>

        </div>

        {/* OCCUPANCY RATE */}

        {/* OCCUPANCY RATE */}

<div className="
  mt-6
  bg-white
  p-6
  rounded-xl
  shadow-sm
  flex
  flex-col
  items-center
  justify-center
">

  <h2 className="
    text-xl
    font-bold
    mb-5
  ">
    Occupancy Rate
  </h2>

  <div className="relative w-40 h-40">

    {/* OUTER CIRCLE */}

    <div
      className="
       w-40
h-40
        rounded-full
        flex
        items-center
        justify-center
      "
      style={{
        background: `conic-gradient(
          #2563eb ${occupancyRate * 3.6}deg,
          #e5e7eb 0deg
        )`,
      }}
    >

      {/* INNER CIRCLE */}

      <div className="
        w-28
        h-28
        bg-white
        rounded-full
        flex
        items-center
        justify-center
        shadow-inner
      ">

        <span className="
          text-2xl
          font-bold
          text-blue-600
        ">
          {occupancyRate}%
        </span>

      </div>

    </div>

  </div>

</div>

        {/* RECENT OCCUPIED */}

        <div className="
          mt-6
          bg-white
          p-2
          rounded-xl
          shadow-sm
        ">

          <h2 className="
            text-xl
            font-bold
            mb-3
          ">
            Recent Occupied Beds
          </h2>

          <div className="space-y-2">

  {/* HEADER */}

  <div className="
    grid
    grid-cols-3
    px-3
    text-sm
    font-bold
    text-gray-600
  ">

    <span>Bed</span>

    <span className="text-center">
      Name
    </span>

    <span className="text-right">
      Emp ID
    </span>

  </div>

            {occupiedList.length > 0 ? (

              occupiedList.map((bed) => (

                <div
  key={bed.id}
  className="
    grid
    grid-cols-3
    items-center
    border
    rounded-md
    px-3
    py-2
    text-sm
    hover:bg-gray-50
    transition-all
  "
>

  {/* BED */}

  <span className="font-semibold">
    {bed.bed_number}
  </span>

  {/* NAME */}

  <span className="text-center">
    {bed.guest_name || "No Name"}
  </span>

  {/* EMP ID */}

  <span className="
    text-right
    text-blue-600
    font-medium
  ">
    {bed.emp_id || "No Emp ID"}
  </span>

</div>



              ))

            ) : (

              <p>No occupied beds</p>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;