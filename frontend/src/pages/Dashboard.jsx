import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaBed,
  FaUser,
  FaChartBar
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../services/api";
import dashboardBg from "../assets/dashboardBg.jpg";
import Sidebar from "../components/Sidebar";

function Dashboard() {

  const [beds, setBeds] = useState([]);

  const [recentFilter, setRecentFilter ] = useState("");
  
  const navigate = useNavigate();

const [searchText, setSearchText] =
  useState("");

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

  useEffect(() => {

  const handleShortcut = (e) => {

    if (
      (e.ctrlKey || e.metaKey) &&
      e.key.toLowerCase() === "k"
    ) {

      e.preventDefault();

      document.querySelector("input")?.focus();
    }
  };

  window.addEventListener(
    "keydown",
    handleShortcut
  );

  return () => {

    window.removeEventListener(
      "keydown",
      handleShortcut
    );
  };

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

 const searchResults = beds

  .filter((bed) => {

    if (!searchText.trim()) {
      return false;
    }

    const query =
      searchText.toLowerCase();

    return (

      bed.bed_number
        ?.toLowerCase()
        .includes(query)

      ||

      bed.guest_name
        ?.toLowerCase()
        .includes(query)

      ||

      bed.emp_id
        ?.toLowerCase()
        .includes(query)

    );

  })

  .slice(0, 10);
 
  return (

   <div className="
  flex
  h-screen
  overflow-hidden
">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN */}

      <div
  className="
    relative
    flex-1
    p-6
    md:ml-64
    min-h-screen
    overflow-hidden
    bg-cover
    bg-center
    bg-no-repeat
  "


  style={{
    backgroundImage: `
      linear-gradient(
        rgba(240,244,255,0.92),
        rgba(232,240,255,0.92)
      ),
      url(${dashboardBg})
    `,
  }}
>

  {/* BACKGROUND EFFECTS */}

<div className="
  absolute
  top-10
  right-10

  w-72
  h-72

  bg-blue-300/20

  rounded-full

  blur-3xl

  pointer-events-none
"/>

<div className="
  absolute
  bottom-10
  left-10

  w-72
  h-72

  bg-purple-300/20

  rounded-full

  blur-3xl

  pointer-events-none
"/>

        {/* TITLE */}

        <div className="
  flex
  flex-col
  md:flex-row
  md:items-center
  md:justify-between
  gap-4
  mb-6
">

  <div>

    <p className="
      text-xs
      uppercase
      tracking-wider
      text-gray-500
    ">
      Leonia Dormitory Management System
    </p>

    <h1 className="
      text-3xl
      font-bold
    ">
      Dashboard
    </h1>

  </div>

 <div className="
  relative
  w-full
  md:w-[420px]
">

  <FaSearch
    className="
      absolute
      left-4
      top-1/2
      -translate-y-1/2
      text-gray-400
      z-10
    "
  />

  <input
    value={searchText}
    onChange={(e) =>
      setSearchText(e.target.value)
    }
    placeholder="Search beds, employees..."

    className="
      w-full
      h-11

      bg-white/90

      border

      rounded-full

      pl-11
      pr-20

      text-sm

      shadow-sm

      outline-none

      focus:ring-2
      focus:ring-blue-500
    "
  />

  <span
    className="
      absolute
      right-3
      top-1/2
      -translate-y-1/2

      text-xs

      bg-gray-100

      px-2
      py-1

      rounded-md
    "
  >
    Ctrl + K
  </span>

  {searchText && (

    <div className="
      absolute

      top-14
      left-0
      right-0

      bg-white

      border

      rounded-xl

      shadow-xl

      overflow-hidden

      z-50
    ">

      {searchResults.length === 0 ? (

        <div className="
          px-4
          py-3
          text-sm
          text-gray-500
        ">
          No results found
        </div>

      ) : (

        searchResults.map((bed) => (

          <div

            key={bed.id}

            onClick={() => {

              navigate(

                bed.gender_type === "boys"
                  ? "/boys"
                  : "/girls",

                {
                  state: {
                    openBedId: bed.id
                  }
                }

              );

            }}

            className="
              px-4
              py-3

              border-b

              hover:bg-blue-50

              cursor-pointer

              transition
            "
          >

            <div className="
              font-medium
            ">
              {bed.bed_number}
            </div>

            <div className="
              text-xs
              text-gray-500
            ">
              {bed.guest_name} • {bed.emp_id}
            </div>

          </div>

        ))

      )}

    </div>

  )}

</div>


</div>

   

      <div
  className="
    grid
    grid-cols-1
    md:grid-cols-2
    xl:grid-cols-3
2xl:grid-cols-3
    gap-8
    mt-10
    w-full
">


 {/* TOTAL */}

<div
  className="
    bg-white/80
    backdrop-blur-xl
    rounded-3xl
    p-5
    shadow-xl
    border
    border-white/40
    relative
  "
>

<h2 className="
  text-2xl
  font-bold
 
  mb-5
">
  Total Occupancy
</h2>


<div className="
  absolute
  top-3.5
right-3.5

  w-12
  h-12

  rounded-xl

  bg-purple-100

  flex
  items-center
  justify-center
">
  <FaChartBar className="
  text-purple-600 text-xl
"/>
</div>

<div className="
flex
items-center
justify-center
gap-5
mt-5
">

  {/* LEFT - CIRCLE */}

 <div className="
  relative
  w-32
  h-32
  shrink-0
">

  <svg
  className="
    w-32
    h-32
    -rotate-90
  "
>
      <circle
  cx="64"
  cy="64"
  r="50"

        stroke="#EDE9FE"
        strokeWidth="12"
        fill="none"
      />

      <circle
        cx="64"
  cy="64"
  r="50"
        stroke="#7C3AED"
        strokeWidth="12"
        fill="none"
        strokeDasharray={
          2 * Math.PI * 50
        }
        strokeDashoffset={
          2 * Math.PI * 50 *
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
      items-center
      justify-center
    ">
      <p className="
        text-2xl
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
    </div>

  </div>

  {/* DIVIDER */}

  <div className="
  h-24
  self-center
  w-px
  bg-gray-200
" />

  {/* RIGHT STATS */}

 <div className="
  flex
  flex-col
  gap-4
  min-w-[150px]
">

    <div className="flex items-center gap-3">

  <div className="
    w-11 h-11
    rounded-xl
    bg-blue-50
    flex items-center justify-center
  ">
    <FaBed className="
      text-blue-600 text-xl
    " />
  </div>

  <div>
    <p className="text-gray-500 text-sm">
      Total Beds
    </p>

    <p className="
      text-3xl
      font-bold
    ">
     {totalBeds}
    </p>
  </div>

</div>

   <div className="flex items-center gap-3">

  <div className="
    w-11 h-11
    rounded-xl
    bg-pink-50
    flex items-center justify-center
  ">
    <FaUser className="
      text-pink-600 text-xl
    " />
  </div>

  <div>
    <p className="text-gray-500 text-sm">
      Occupied
    </p>

    <p className="
      text-3xl
      font-bold
      text-blue-600
    ">
     {totalOccupied}
    </p>
  </div>

</div>

  <div className="flex items-center gap-3">

  <div className="
    w-11 h-11
    rounded-xl
    bg-green-50
    flex items-center justify-center
  ">
    <FaBed className="
      text-green-600 text-xl
    " />
  </div>

  <div>
    <p className="text-gray-500 text-sm">
      Available
    </p>

    <p className="
      text-3xl
      font-bold
      text-green-600
    ">
     {totalBeds - totalOccupied}
    </p>
  </div>

</div>

  </div>
  </div>



</div>

 

{/* BOYS */}

<div
  onClick={() => navigate("/boys")}
  className="
    bg-white/80
    backdrop-blur-xl
    rounded-3xl
    p-5
    shadow-xl
    border
    border-white/40
    relative
    cursor-pointer
    hover:scale-[1.02]
    transition-all
  "
>

<h2 className="
  text-2xl
  font-bold
  text-blue-600
 
">
  Men Dormitory
</h2>


<div className="
  absolute
  top-3.5
  right-3.5

  w-12
  h-12

  rounded-xl

  bg-blue-100

  flex
  items-center
  justify-center
">
  <FaBed className="
  text-blue-600 text-xl
"/>
</div>

<div className="
flex
items-center
justify-center
gap-5
mt-5
">

  {/* LEFT - CIRCLE */}

  <div className="
  relative
  w-32
  h-32
  shrink-0
">

   <svg
  className="
    w-32
    h-32
    -rotate-90
  "
>

      <circle
        cx="64"
        cy="64"
        r="50"
        stroke="#DBEAFE"
        strokeWidth="12"
        fill="none"
      />

      <circle
        cx="64"
        cy="64"
        r="50"
        stroke="#2563EB"
        strokeWidth="12"
        fill="none"
        strokeDasharray={
          2 * Math.PI * 50
        }
        strokeDashoffset={
          2 * Math.PI * 50 *
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
      items-center
      justify-center
    ">

      <p className="
        text-2xl
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

    </div>

  </div>

  {/* DIVIDER */}

 <div className="
  h-32
  self-center
  w-px
  bg-gray-200
" />

  {/* RIGHT STATS */}

  <div className="
  flex
  flex-col
  gap-4
  min-w-[145px]
">

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-blue-50

      flex
      items-center
      justify-center
    ">
      <FaBed className="
        text-blue-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Total Beds
      </p>

      <p className="
        text-3xl
        font-bold
      ">
        {boysBeds}
      </p>

    </div>

  </div>

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-pink-50

      flex
      items-center
      justify-center
    ">
      <FaUser className="
        text-pink-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Occupied
      </p>

      <p className="
        text-3xl
        font-bold
        text-blue-600
      ">
        {boysOccupied}
      </p>

    </div>

  </div>

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-green-50

      flex
      items-center
      justify-center
    ">
      <FaBed className="
        text-green-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Available
      </p>

      <p className="
        text-3xl
        font-bold
        text-green-600
      ">
        {boysBeds - boysOccupied}
      </p>

    </div>

  </div>

</div>
  </div>



</div>




{/* GIRLS */}

<div
  onClick={() => navigate("/girls")}
  className="
    bg-white/80
    backdrop-blur-xl
    rounded-3xl
    p-5
    shadow-xl
    border
    border-white/40
    relative
    cursor-pointer
    hover:scale-[1.02]
    transition-all
  "
>

<h2 className="
  text-2xl
  font-bold
  text-pink-600
 
">
  Women Dormitory
</h2>



<div className="
  absolute
  top-5
  right-5

  w-12
  h-12

  rounded-xl

  bg-pink-100

  flex
  items-center
  justify-center
">
  <FaBed className="
    text-pink-600
    text-xl
  " />
</div>

<div className="
flex
items-center
justify-center
gap-5
mt-5
">

  {/* LEFT - CIRCLE */}

 <div className="
  relative
  w-32
  h-32
  shrink-0
  
">

   <svg
  className="
    w-32
    h-32
    -rotate-90
  "
>

      <circle
        cx="65"
        cy="65"
        r="50"
        stroke="#FBCFE8"
        strokeWidth="12"
        fill="none"
      />

      <circle
        cx="65"
        cy="65"
        r="50"
        stroke="#EC4899"
        strokeWidth="12"
        fill="none"
        strokeDasharray={
          2 * Math.PI * 50
        }
        strokeDashoffset={
          2 * Math.PI * 50 *
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
      items-center
      justify-center
    ">

      <p className="
        text-2xl
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

    </div>

  </div>

  {/* DIVIDER */}

  <div className="
  h-32
  self-center
  w-px
  bg-gray-200
" />

  {/* RIGHT STATS */}

  <div className="
  flex
  flex-col
  gap-4
  min-w-[140px]
">

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-blue-50

      flex
      items-center
      justify-center
    ">
      <FaBed className="
        text-blue-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Total Beds
      </p>

      <p className="
        text-3xl
        font-bold
      ">
        {girlsBeds}
      </p>

    </div>

  </div>

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-pink-50

      flex
      items-center
      justify-center
    ">
      <FaUser className="
        text-pink-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Occupied
      </p>

      <p className="
        text-3xl
        font-bold
        text-blue-600
      ">
       {girlsOccupied}
      </p>

    </div>

  </div>

  <div className="flex items-center gap-3">

    <div className="
      w-12
      h-12
      rounded-xl
      bg-green-50

      flex
      items-center
      justify-center
    ">
      <FaBed className="
        text-green-600
        text-lg
      "/>
    </div>

    <div>

      <p className="
        text-sm
        text-gray-500
      ">
        Available
      </p>

      <p className="
        text-3xl
        font-bold
        text-green-600
      ">
        {girlsBeds - girlsOccupied}
      </p>

    </div>

  </div>

</div>


  </div>

</div>

</div>
          

        {/* RECENT OCCUPIED */}

        <div
  className="
    mt-6
    bg-white
    p-4
    rounded-xl
    shadow-sm
    w-full
  "
>

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