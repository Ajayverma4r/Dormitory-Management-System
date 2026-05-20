import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [beds, setBeds] = useState([]);

  const [recentFilter, setRecentFilter ] = useState("");

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

  // BOYS / GIRLS

const boysBeds = beds.filter(

  (bed) =>
    bed.gender_type === "boys"

).length;

const girlsBeds = beds.filter(

  (bed) =>
    bed.gender_type === "girls"

).length;

// TOTAL OCCUPANCY

const totalOccupied =
  beds.filter(

    (bed) =>
      bed.status === "occupied"

  ).length;


// BOYS OCCUPANCY

const boysOccupied =
  beds.filter(

    (bed) =>

      bed.gender_type === "boys"

      &&

      bed.status === "occupied"

  ).length;


// GIRLS OCCUPANCY

const girlsOccupied =
  beds.filter(

    (bed) =>

      bed.gender_type === "girls"

      &&

      bed.status === "occupied"

  ).length;

  // OCCUPANCY %

  const occupancyRate =
    totalBeds > 0
      ? Math.round(
          (occupiedBeds / totalBeds) * 100
        )
      : 0;

  // RECENT OCCUPIED

 const occupiedList = beds

  .filter((bed) => {

    const isOccupied =

      bed.status === "occupied";

    const matchesDormitory =

      recentFilter === ""

      ||

      bed.gender_type ===
      recentFilter;

    return (
      isOccupied &&
      matchesDormitory
    );
  })

  // NEWEST FIRST

  .sort(
    (a, b) => b.id - a.id
  )

  // ONLY 50

  .slice(0, 50);
  
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
  md:ml-64
  mt-14
  md:mt-0
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

       <div className="
  flex
  justify-center
  gap-8
  mt-10
  flex-wrap
">

  {/* TOTAL */}

  <div className="
    bg-white
    p-5
    rounded-2xl
    shadow-md
    w-72
    text-center
  ">

    <h2 className="
      text-lg
      font-bold
      mb-4
    ">
      Total Occupancy
    </h2>

    <div className="
      relative
      w-40
      h-40
      mx-auto
    ">

      <svg
        className="
          w-40
          h-40
          -rotate-90
        "
      >

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#EDE9FE"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#7C3AED"
          strokeWidth="12"
          fill="none"

          strokeDasharray={
            2 * Math.PI * 65
          }

          strokeDashoffset={
            2 * Math.PI * 65 *

            (
              1 -
              totalOccupied /
              (totalBeds || 1)
            )
          }

          strokeLinecap="round"
        />

      </svg>

      <div className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        justify-center
      ">

        <p className="
          text-4xl
          font-bold
          text-purple-600
        ">

          {Math.round(
            (
              totalOccupied /
              (totalBeds || 1)
            ) * 100
          )}%

        </p>

        <p className="
          text-sm
          text-gray-500
        ">

          {totalOccupied}/{totalBeds}

        </p>

      </div>

    </div>

  </div>


  {/* BOYS */}

  <div className="
    bg-white
    p-5
    rounded-2xl
    shadow-md
    w-72
    text-center
  ">

    <h2 className="
      text-lg
      font-bold
      text-blue-700
      mb-4
    ">
      Boys Occupancy
    </h2>

    <div className="
      relative
      w-40
      h-40
      mx-auto
    ">

      <svg
        className="
          w-40
          h-40
          -rotate-90
        "
      >

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#DBEAFE"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#2563EB"
          strokeWidth="12"
          fill="none"

          strokeDasharray={
            2 * Math.PI * 65
          }

          strokeDashoffset={
            2 * Math.PI * 65 *

            (
              1 -
              boysOccupied /
              (boysBeds || 1)
            )
          }

          strokeLinecap="round"
        />

      </svg>

      <div className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        justify-center
      ">

        <p className="
          text-4xl
          font-bold
          text-blue-600
        ">

          {Math.round(
            (
              boysOccupied /
              (boysBeds || 1)
            ) * 100
          )}%

        </p>

        <p className="
          text-sm
          text-gray-500
        ">

          {boysOccupied}/{boysBeds}

        </p>

      </div>

    </div>

  </div>


  {/* GIRLS */}

  <div className="
    bg-white
    p-5
    rounded-2xl
    shadow-md
    w-72
    text-center
  ">

    <h2 className="
      text-lg
      font-bold
      text-pink-600
      mb-4
    ">
      Girls Occupancy
    </h2>

    <div className="
      relative
      w-40
      h-40
      mx-auto
    ">

      <svg
        className="
          w-40
          h-40
          -rotate-90
        "
      >

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#FBCFE8"
          strokeWidth="12"
          fill="none"
        />

        <circle
          cx="80"
          cy="80"
          r="65"
          stroke="#EC4899"
          strokeWidth="12"
          fill="none"

          strokeDasharray={
            2 * Math.PI * 65
          }

          strokeDashoffset={
            2 * Math.PI * 65 *

            (
              1 -
              girlsOccupied /
              (girlsBeds || 1)
            )
          }

          strokeLinecap="round"
        />

      </svg>

      <div className="
        absolute
        inset-0
        flex
        flex-col
        items-center
        justify-center
      ">

        <p className="
          text-4xl
          font-bold
          text-pink-600
        ">

          {Math.round(
            (
              girlsOccupied /
              (girlsBeds || 1)
            ) * 100
          )}%

        </p>

        <p className="
          text-sm
          text-gray-500
        ">

          {girlsOccupied}/{girlsBeds}

        </p>

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

         <div className="
  flex
  justify-between
  items-center
  mb-3
">

  <h2 className="
    text-xl
    font-bold
  ">
    Recent Occupied Beds
  </h2>

  <select
    value={recentFilter}
    onChange={(e) =>
      setRecentFilter(
        e.target.value
      )
    }
    className="
 bg-white/70 backdrop-blur-md
  backdrop-blur-md
  border
  border-gray-200
  rounded-xl
  px-3
  py-1.5
  text-sm
  shadow-sm
  outline-none
  hover:bg-white/80
  transition-all
"
  >

    <option value="">
      All
    </option>

    <option value="boys">
      Boys
    </option>

    <option value="girls">
      Girls
    </option>

  </select>

</div>

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