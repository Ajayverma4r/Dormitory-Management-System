import bedsBG from "../assets/bedsBG.jpg"
import {
  FaBed,
  FaCheckCircle,
  FaUserFriends,
  FaTools,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import BedCard from "../components/BedCard";
import BedModal from "../components/BedModal";
import CreateBedModal from "../components/CreateBedModal";
import toast from "react-hot-toast";


const locationConfig = {

  Building: {

    buildings: {

      "Building 1": [
        "ROOM1",
        "ROOM2",
        "ROOM3",
        "ROOM4",
        "ROOM5",
        "ROOM6",
      ],

      "Building 2": [
        "ROOM7",
        "ROOM8",
        "ROOM9",
        "ROOM10",
        "ROOM11",
        "ROOM12",
      ],
    },

    floors: [
      "GROUND FLOOR",
      "FLOOR1",
      "FLOOR2",
    ],
  },

  Hall: {

    halls: [
      "HALL1",
      "HALL2",
      "HALL3",
      "HALL4",
    ],

    rows: [
      "ROW1",
      "ROW2",
      "ROW3",
      "ROW4",
    ],
  },

  Supermarket: {

    sections: [
      "SUPERMARKET LOWER",
      "SUPERMARKET UPPER",
    ],
  },

  Others: {},
};

function Beds({ type }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "admin";

  const isStaff =
    user?.role === "staff";

  const [selectedBed, setSelectedBed] = useState(null);
  const [showCreateModal, setShowCreateModal] =
  useState(false);
 

  // FORM STATES

  const [bedNumber, setBedNumber] = useState("");
  const [locationType, setLocationType] =
  useState("");

const [building, setBuilding] =
  useState("");


  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [genderType, setGenderType] = useState("");

  const [showGuestModal, setShowGuestModal] =
  useState(false);

const [guestName, setGuestName] =
  useState("");

const [guestPhone, setGuestPhone] =
  useState("");
 
  const [empId, setEmpId] =
  useState("");

const [checkIn, setCheckIn] =
  useState("");

  const [department,
  setDepartment] =
  useState("");

const [fan,
  setFan] =
  useState(false);

const [mattress,
  setMattress] =
  useState(false);

const [plywood,
  setPlywood] =
  useState(false);

  // BED DATA

  const [beds, setBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [summaryFilter, setSummaryFilter] =
  useState("all");

  const [locationFilter, setLocationFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  const [floorFilter, setFloorFilter] = useState("");

const [typeFilter, setTypeFilter] = useState("");
const [dynamicRooms, setDynamicRooms] =
  useState([]);

const [dynamicFloors, setDynamicFloors] =
  useState([]);

  const [currentPage, setCurrentPage] = useState(1);

const bedsPerPage = 40;

useEffect(() => {

  // RESET

  setRoomFilter("");
  setFloorFilter("");

  // DORMITORY1

  if (typeFilter === "Dormitory1") {

    setDynamicFloors([
      "GROUND FLOOR",
      "1ST FLOOR",
      "2ND FLOOR",
    ]);

    if (floorFilter === "GROUND FLOOR") {

      setDynamicRooms([
        "R101",
        "R102",
        "R103",
        "R104",
        "R105",
        "R106",
      ]);
    }

    else if (floorFilter === "1ST FLOOR") {

      setDynamicRooms([
        "R107",
        "R108",
      ]);
    }

    else if (floorFilter === "2ND FLOOR") {

      setDynamicRooms([
        "R109",
        "R110",
      ]);
    }
  }

  // DORMITORY2

  else if (typeFilter === "Dormitory2") {

    setDynamicFloors([
      "GROUND FLOOR",
      "1ST FLOOR",
      "2ND FLOOR",
    ]);

    if (floorFilter === "GROUND FLOOR") {

      setDynamicRooms([
        "R201",
        "R202",
      ]);
    }

    else if (floorFilter === "1ST FLOOR") {

      setDynamicRooms([
        "R203",
        "R204",
      ]);
    }

    else if (floorFilter === "2ND FLOOR") {

      setDynamicRooms([
        "R205",
        "R206",
      ]);
    }
  }

 // HALL

else if (typeFilter === "Hall") {

  // HALL DROPDOWN

  setDynamicFloors([
    "HALL1",
    "HALL2",
    "HALL3",
    "HALL4",
  ]);

  // ROW DROPDOWN

  setDynamicRooms([
    "ROW1",
    "ROW2",
    "ROW3",
    "ROW4",
  ]);
}

  // SUPERMARKET

  else if (typeFilter === "Supermarket") {

    setDynamicFloors([
      "LOWER",
      "UPPER",
    ]);

    setDynamicRooms([]);
  }

  // OTHERS

  else if (typeFilter === "Others") {

    setDynamicFloors([
      "OTHERS",
    ]);

    setDynamicRooms([
      "OTHERS",
    ]);
  }

  else {

    setDynamicFloors([]);

    setDynamicRooms([]);
  }

}, [typeFilter, floorFilter]);

  // FETCH BEDS

 const fetchBeds = async () => {

  try {

    const response = await API.get("/beds");

    const formattedBeds = response.data.map(
      (bed) => ({

        ...bed,

        guest: {
          name: bed.guest_name,
          empId: bed.emp_id,
          phone: bed.guest_phone,
          checkIn: bed.check_in,
        },
      })
    );

    setBeds(formattedBeds);

  } catch (error) {

    console.log(error);
  }
};

  // LOAD DATA

  useEffect(() => {

    fetchBeds();

  }, []);

  useEffect(() => {

  setCurrentPage(1);

}, [
  searchTerm,
  statusFilter,
  locationFilter,
  typeFilter,
  summaryFilter,
]);

  // ADD BED

  const addBed = async () => {

  try {

   if (
  !bedNumber ||
  !locationType ||
  !location
) {
      toast.error("Please fill all fields");
      return;
    }

    // DUPLICATE CHECK

    const existingBed = beds.find(
      (bed) =>
        bed.bed_number?.toLowerCase() ===
        bedNumber.toLowerCase()
    );

    if (existingBed) {
      toast.error("Bed number already exists");
      return;
    }

    // IF OCCUPIED → OPEN GUEST MODAL

    if (status === "occupied") {

      setShowGuestModal(true);

      return;
    }

    // CREATE AVAILABLE BED

    const response = await API.post(
      "/beds",
      {
        bed_number: bedNumber,
        room,
        floor,
        location,
        location_type: locationType,
        status,
        gender_type: type,
        department,
        fan,
        mattress,
        plywood
      }
    );

    setBeds([...beds, response.data]);

    toast.success("Bed created successfully");

    resetForm();

  } catch (error) {

    console.log(error);

    toast.error("Server Error");
  }
};

const resetForm = () => {

  setBedNumber("");

  setLocationType("");

  setRoom("");

  setFloor("");

  setLocation("");

  setStatus("available");

  setGuestName("");

  setGuestPhone("");

  setEmpId("");

  setCheckIn("");

  setDepartment("");

  setFan(false);

  setMattress(false);

  setPlywood(false);

  setShowCreateModal(false);

  setShowGuestModal(false);
};

const saveOccupiedBed = async () => {

  try {

    // VALIDATION

    if (
      !guestName ||
      !empId ||
      !guestPhone ||
      
      !checkIn
    ) {

      toast.error(
        "Please fill all details"
        
      );
      

      return;
    }

    // PHONE VALIDATION

    if (guestPhone.length !== 10) {

      toast.error(
        "Phone number must be exactly 10 digits"
      );

      return;
    }

    // SAVE BED

    const response = await API.post(
      "/beds",
      {
        bed_number: bedNumber,
        room,
        floor,
        location,
        location_type: locationType,
        status,
        gender_type: type,
        guest_name: guestName,

        emp_id: empId,

        guest_phone: guestPhone,

        check_in: checkIn,

        department,

        fan,

        mattress,

        plywood,
        }
    );

    // FORMAT RESPONSE

    const formattedBed = {

      ...response.data,

      guest: {
        name:
          response.data.guest_name,

        empId:
          response.data.emp_id,

        phone:
          response.data.guest_phone,

        checkIn:
          response.data.check_in,
      },
    };

    setBeds([
      ...beds,
      formattedBed,
    ]);

    setShowGuestModal(false);

    resetForm();


  } catch (error) {

    console.log(error);

    toast.error("Server Error");
  }
};
  // DELETE BED

  const deleteBed = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bed?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      await API.delete(`/beds/${id}`);

      const updatedBeds = beds.filter(
        (bed) => bed.id !== id
      );

      setBeds(updatedBeds);

     setSelectedBed(null);


    } catch (error) {

      console.log(error);

      toast.error("Failed to delete bed");
    }
  };

  // UPDATE BED

const updateBed = async (updatedBed) => {

  try {

    const response = await API.put(

      `/beds/${updatedBed.id}`,

      {
  room: updatedBed.room,

  floor: updatedBed.floor,

  location: updatedBed.location,

  status: updatedBed.status,

  gender_type: updatedBed.gender_type,

  guest_name:
    updatedBed.status === "available"
      ? null
      : updatedBed.guest?.name || null,

  emp_id:
    updatedBed.status === "available"
      ? null
      : updatedBed.guest?.empId || null,

  guest_phone:
    updatedBed.status === "available"
      ? null
      : updatedBed.guest?.phone || null,

  check_in:
    updatedBed.status === "available"
      ? null
      : updatedBed.guest?.checkIn || null,

      department:
  updatedBed.department,

fan:
  updatedBed.fan,

mattress:
  updatedBed.mattress,

plywood:
  updatedBed.plywood,

  maintenance_fan:
  updatedBed.maintenance_fan,

maintenance_mattress:
  updatedBed.maintenance_mattress,

maintenance_plywood:
  updatedBed.maintenance_plywood,

maintenance_bed:
  updatedBed.maintenance_bed,

maintenance_electrical:
  updatedBed.maintenance_electrical,

maintenance_cleaning:
  updatedBed.maintenance_cleaning,

maintenance_others:
  updatedBed.maintenance_others,

maintenance_comment:
  updatedBed.maintenance_comment,
}
    );

    

    

    const updatedBeds = beds.map((bed) =>

      bed.id === updatedBed.id
        ? {
            ...response.data,

            guest: {
              name:
                response.data.guest_name,

              empId:
                response.data.emp_id,

              phone:
                response.data.guest_phone,

              checkIn:
                response.data.check_in,
            },
          }
        : bed
    );

    setBeds(updatedBeds);

    setSelectedBed({
  ...response.data,

  guest: {
    name:
      response.data.guest_name,

    empId:
      response.data.emp_id,

    phone:
      response.data.guest_phone,

    checkIn:
      response.data.check_in,
  },
});

  } catch (error) {

    console.log(error);

    toast.error("Failed to update bed");
  }
};

    // FILTERED BEDS

const filteredBeds = beds.filter((bed) => {

 const matchesSearch =

  bed.bed_number
    ?.toLowerCase()
    .includes(
      searchTerm.toLowerCase()
    )

  ||

  bed.guest?.name
    ?.toLowerCase()
    .includes(
      searchTerm.toLowerCase()
    )

  ||

  bed.guest?.empId
    ?.toLowerCase()
    .includes(
      searchTerm.toLowerCase()
    );

  const matchesStatus =
    statusFilter === "" ||
    bed.status === statusFilter;

  const matchesLocation =
    locationFilter === "" ||
    bed.location === locationFilter;

    const matchesRoom =

  roomFilter === "" ||

  bed.room === roomFilter;

const matchesFloor =

  floorFilter === "" ||

  bed.floor === floorFilter;

  const matchesType =

  typeFilter === "" ||

  bed.location_type ===
    typeFilter;

  const matchesSummary =

  summaryFilter === "all"

    ? true

    : bed.status ===
      summaryFilter;

 return (

  bed.gender_type === type &&

  matchesSearch &&

  matchesStatus &&

  matchesLocation &&

matchesRoom &&

matchesFloor &&

matchesType &&

matchesSummary
);
});


// PAGINATION

const indexOfLastBed =
  currentPage * bedsPerPage;

const indexOfFirstBed =
  indexOfLastBed - bedsPerPage;

const currentBeds =
  filteredBeds.slice(
    indexOfFirstBed,
    indexOfLastBed
  );

const totalPages =
  Math.max(
    1,
    Math.ceil(
      filteredBeds.length /
      bedsPerPage
    )
  );

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div
  className="

    relative
    p-6
    w-full
    text-sm
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
      url(${bedsBG})
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

        {/* PAGE TITLE */}

<h1
  className="
    text-3xl
    font-bold
    mb-4
  "
>
  Bed Management
</h1>


{/* FILTER SECTION */}

<div
  className="
    flex
    items-center
    gap-3
    mb-5
    overflow-x-auto
    pb-2
  "
>

  {/* SEARCH */}

  <input
    type="text"
    placeholder="Search bed/EmpId/Name..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }

    className="
      h-10
      w-56
      bg-white
      border
      border-gray-200
      rounded-xl
      px-3
      text-sm
      shadow-sm
      outline-none
    "
  />

  {/* STATUS */}

  <select
    value={statusFilter}

    onChange={(e) =>
      setStatusFilter(
        e.target.value
      )
    }

    className="
      h-10
      w-40
      bg-white
      border
      border-gray-200
      rounded-xl
      px-3
      text-sm
      shadow-sm
      outline-none
    "
  >

    <option value="">
      All Status
    </option>

    <option value="available">
      Available
    </option>

    <option value="occupied">
      Occupied
    </option>

    <option value="under_maintenance">
      Under Maintenance
    </option>

  </select>

  {/* TYPE FILTER */}

  <select
    value={typeFilter}

    onChange={(e) => {

      setTypeFilter(
        e.target.value
      );

      setFloorFilter("");

      setRoomFilter("");
    }}

    className="
      h-10
      w-44
      bg-white/70
      backdrop-blur-xl
      border
      border-gray-200
      rounded-xl
      px-3
      text-sm
      shadow-sm
      outline-none
    "
  >

    <option value="">
      All Types
    </option>

    <option value="Dormitory1">
      Dormitory1
    </option>

    <option value="Dormitory2">
      Dormitory2
    </option>

    <option value="Hall">
      Hall
    </option>

    <option value="Supermarket">
      Supermarket
    </option>

    <option value="Others">
      Others
    </option>

  </select>
{/* FLOOR / ROW FILTER */}

<select
  value={floorFilter}

  onChange={(e) =>
    setFloorFilter(
      e.target.value
    )
  }

  className="
    h-10
    w-44
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
    shadow-sm
    outline-none
  "
>

  <option value="">
    All Floor / Row
  </option>

  {dynamicFloors.map((floor) => (

    <option
      key={floor}
      value={floor}
    >
      {floor}
    </option>

  ))}

</select>

{/* ROOM / HALL FILTER */}

<select
  value={roomFilter}

  onChange={(e) =>
    setRoomFilter(
      e.target.value
    )
  }

  className="
    h-10
    w-44
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
    shadow-sm
    outline-none
  "
>

  <option value="">
    All Room / Hall
  </option>

  {dynamicRooms.map((room) => (

    <option
      key={room}
      value={room}
    >
      {room}
    </option>

  ))}

</select>

</div>



{/* SUMMARY CARDS */}

<div className="
  grid
  grid-cols-1
  sm:grid-cols-2
  lg:grid-cols-4
  gap-5
  mb-6
">

  {/* TOTAL */}

  <div

  onClick={() =>
    setSummaryFilter("all")
  }

  className={`

    bg-white/70
    backdrop-blur-lg
    rounded-2xl
    p-5
    border
    shadow-sm

    flex
    items-center
    justify-between

    cursor-pointer

    hover:scale-[1.02]

    transition-all
    duration-300

    ${
      summaryFilter === "all"

        ? "ring-2 ring-blue-500"

        : ""
    }
  `}
>

    <div>

      <p className="
        text-gray-500
        text-sm
      ">
        Total Beds
      </p>

      <h2 className="
        text-3xl
        font-bold
        mt-1
      ">

        {
          beds.filter(
            (b) =>
              b.gender_type === type
          ).length
        }

      </h2>

    </div>

    <FaBed className="
      text-4xl
      text-blue-500
    "/>

  </div>

  {/* AVAILABLE */}

 <div

  onClick={() =>
    setSummaryFilter(
      "available"
    )
  }

  className={`

    bg-white/70
    backdrop-blur-lg
    rounded-2xl
    p-5
    border
    shadow-sm

    flex
    items-center
    justify-between

    cursor-pointer

    hover:scale-[1.02]

    transition-all
    duration-300

    ${
      summaryFilter ===
      "available"

        ? "ring-2 ring-green-500"

        : ""
    }
  `}
>

    <div>

      <p className="
        text-gray-500
        text-sm
      ">
        Available
      </p>

      <h2 className="
        text-3xl
        font-bold
        text-green-600
        mt-1
      ">

        {
          beds.filter(
            (b) =>
              b.gender_type === type &&
              b.status === "available"
          ).length
        }

      </h2>

    </div>

    <FaCheckCircle className="
      text-4xl
      text-green-500
    "/>

  </div>

  {/* OCCUPIED */}

  <div

  onClick={() =>
    setSummaryFilter(
      "occupied"
    )
  }

  className={`

    bg-white/70
    backdrop-blur-lg
    rounded-2xl
    p-5
    border
    shadow-sm

    flex
    items-center
    justify-between

    cursor-pointer

    hover:scale-[1.02]

    transition-all
    duration-300

    ${
      summaryFilter ===
      "occupied"

        ? "ring-2 ring-red-500"

        : ""
    }
  `}
>

    <div>

      <p className="
        text-gray-500
        text-sm
      ">
        Occupied
      </p>

      <h2 className="
        text-3xl
        font-bold
        text-red-500
        mt-1
      ">

        {
          beds.filter(
            (b) =>
              b.gender_type === type &&
              b.status === "occupied"
          ).length
        }

      </h2>

    </div>

    <FaUserFriends className="
      text-4xl
      text-red-400
    "/>

  </div>

  {/* MAINTENANCE */}

  <div

  onClick={() =>
    setSummaryFilter(
      "under_maintenance"
    )
  }

  className={`

    bg-white/70
    backdrop-blur-lg
    rounded-2xl
    p-5
    border
    shadow-sm

    flex
    items-center
    justify-between

    cursor-pointer

    hover:scale-[1.02]

    transition-all
    duration-300

    ${
      summaryFilter ===
      "under_maintenance"

        ? "ring-2 ring-yellow-500"

        : ""
    }
  `}
>

    <div>

      <p className="
        text-gray-500
        text-sm
      ">
        Under Maintenance
      </p>

      <h2 className="
        text-3xl
        font-bold
        text-yellow-500
        mt-1
      ">

        {
          beds.filter(
            (b) =>
              b.gender_type === type &&
              b.status ===
                "under_maintenance"
          ).length
        }

      </h2>

    </div>

    <FaTools className="
      text-4xl
      text-yellow-500
    "/>

  </div>

</div>

{/* ADD BED BUTTON */}

{isAdmin && (

<div className="
  flex
  justify-end
  mb-5
">

  <button

    onClick={() =>
      setShowCreateModal(true)
    }

    className="
      bg-blue-600
      hover:bg-blue-700
      text-white
      px-5
      py-3
      rounded-2xl
      shadow-lg
      text-sm
      font-semibold
      transition-all
    "
  >

    + Add New Bed

  </button>

</div>

)}
     

{/* GUEST MODAL */}

{showGuestModal && (

  <div className="
    fixed
    inset-0
    bg-black/50
    flex
    justify-center
    items-center
    z-[999]
  ">

    <div className="
      bg-white
      p-6
      rounded-xl
      w-[400px]
      shadow-xl
    ">

      <h2 className="
        text-2xl
        font-bold
        mb-5
      ">
        Person Details
      </h2>

      <div className="flex flex-col gap-4">

        {/* GUEST NAME */}

        <input
          type="text"
          placeholder="Person Name"
          value={guestName}
          onChange={(e) =>
            setGuestName(e.target.value)
          }
          className="
            border
            p-3
            rounded-lg
          "
        />

        {/* PHONE */}

       <input
  type="text"
  placeholder="Phone Number"
  value={guestPhone}
  onChange={(e) => {

    const value =
      e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setGuestPhone(value);
    }
  }}
  className="
    border
    p-3
    rounded-lg
  "
/>

        {/* EMP ID */}

        <input
          type="text"
          placeholder="EMP ID"
          value={empId}
          onChange={(e) =>
            setEmpId(e.target.value)
          }
          className="
            border
            p-3
            rounded-lg
          "
        />

        {/* DEPARTMENT */}

<select

  value={department}

  onChange={(e) =>
    setDepartment(
      e.target.value
    )
  }

  className="
    border
    p-3
    rounded-lg
  "
>

  <option value="">
    Select Department
  </option>

  <option value="IT">
    IT
  </option>

  <option value="HR">
    HR
  </option>

  <option value="Finance">
    Finance
  </option>

  <option value="Operations">
    Operations
  </option>

  <option value="Management">
    Management
  </option>

</select>

        {/* CHECK IN */}

        <input
          type="date"
          value={checkIn}
          onChange={(e) =>
            setCheckIn(e.target.value)
          }
          className="
            border
            p-3
            rounded-lg
          "
        />

        {/* PROVIDED AMENITIES */}

<div>

  <p className="
    font-semibold
    mb-2
  ">
    Provided Amenities
  </p>

  <div className="
  flex
  flex-wrap
  items-center
  gap-2
  mb-4
">

    {/* FAN */}

    <label className="
      flex
      items-center
      gap-2
    ">

      <input
        type="checkbox"

        checked={fan}

        onChange={(e) =>
          setFan(
            e.target.checked
          )
        }
      />

      Fan

    </label>


    {/* MATTRESS */}

    <label className="
      flex
      items-center
      gap-2
    ">

      <input
        type="checkbox"

        checked={mattress}

        onChange={(e) =>
          setMattress(
            e.target.checked
          )
        }
      />

      Mattress

    </label>


    {/* PLYWOOD */}

    <label className="
      flex
      items-center
      gap-2
    ">

      <input
        type="checkbox"

        checked={plywood}

        onChange={(e) =>
          setPlywood(
            e.target.checked
          )
        }
      />

      Plywood

    </label>

  </div>

</div>

      </div>

      <div className="
        flex
        gap-3
        mt-5
      ">

        <button
          onClick={saveOccupiedBed}
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Save
        </button>

        <button
          onClick={() =>
            setShowGuestModal(false)
          }
          className="
            bg-gray-600
            text-white
            px-5
            py-2
            rounded-lg
          "
        >
          Cancel
        </button>

      </div>

    </div>

  </div>
)}

       <div className="
  bg-white/70
  backdrop-blur-lg
  rounded-2xl
  border
  shadow-sm
  overflow-x-auto
">

  <table className="
    w-full
    text-sm
  ">

    <thead className="
      bg-gray-50
      text-gray-700
    ">

      <tr>

        <th className="p-4 text-left">
          Bed
        </th>

        <th className="p-4 text-left">
          Hall / Room
        </th>

        <th className="p-4 text-left">
          Floor / Row
        </th>

        <th className="p-4 text-left">
          Location
        </th>

        <th className="p-4 text-left">
          Status
        </th>

        <th className="p-4 text-left">
  Actions
</th>

      </tr>

    </thead>

    <tbody>

      {currentBeds.map((bed) => (

        <tr
          key={bed.id}

          onClick={() =>
  setSelectedBed(bed)
}

          className="
            border-t
            hover:bg-blue-50/50
            transition
            cursor-pointer
          "
        >

          <td className="
            p-4
            font-semibold
          ">
            {bed.bed_number}
          </td>

          <td className="p-4">
            {bed.room}
          </td>

          <td className="p-4">
            {bed.floor}
          </td>

          <td className="p-4">

            <span className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-medium

              ${
                bed.location ===
                "inside"

                  ? "bg-blue-100 text-blue-700"

                  : "bg-orange-100 text-orange-700"
              }
            `}>

              {bed.location}

            </span>

          </td>

          <td className="p-4">

            <span className={`
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold

              ${
                bed.status ===
                "available"

                  ? "bg-green-100 text-green-700"

                  : bed.status ===
                    "under_maintenance"

                  ? "bg-yellow-100 text-yellow-700"

                  : "bg-red-100 text-red-700"
              }
            `}>

              {
                bed.status.replace(
                  "_",
                  " "
                )
              }

            </span>

          </td>

          <td className="p-4">

  <button

    onClick={(e) => {

      e.stopPropagation();

      setSelectedBed(bed);
    }}

    className="
      px-4
      py-1.5
      rounded-lg
      bg-blue-600
      text-white
      text-xs
      font-medium
      hover:bg-blue-700
      transition
    "
  >

    View

  </button>

</td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

        {/* PAGINATION styling */}

{/* PAGINATION */}

<div className="
  flex
  justify-center
  items-center
  gap-3
  mt-8
  mb-4
">

  {/* PREV */}

  <button
    disabled={currentPage === 1}

    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }

    className="
      px-4
      py-2
      rounded-full
      border
      bg-white
      shadow-sm
      hover:bg-gray-100
      disabled:opacity-40
      transition
    "
  >
    ← Prev
  </button>

  {/* PAGE NUMBER */}

  <div className="
    px-5
    py-2
    rounded-full
    bg-blue-600
    text-white
    font-semibold
    shadow-md
  ">

    {currentPage} / {totalPages}

  </div>

  {/* NEXT */}

  <button
    disabled={
      currentPage === totalPages
    }

    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }

    className="
      px-4
      py-2
      rounded-full
      border
      bg-white
      shadow-sm
      hover:bg-gray-100
      disabled:opacity-40
      transition
    "
  >
    Next →
  </button>

</div>



{/* CREATE BED MODAL */}

<CreateBedModal

  isOpen={showCreateModal}

  closeModal={() =>
    setShowCreateModal(false)
  }

>

<div className="
  grid
  grid-cols-1
  md:grid-cols-2
  gap-4
  items-start
">

{/* BED NUMBER */}

<input
  type="text"
  placeholder="Bed Number"
  value={bedNumber}

  onChange={(e) =>
    setBedNumber(
      e.target.value.toUpperCase()
    )
  }

  className="
    h-10
    w-44
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
/>

{/* LOCATION TYPE */}

<select
  value={locationType}

  onChange={(e) => {

    setLocationType(
      e.target.value
    );

    setRoom("");
    setFloor("");
    setBuilding("");
  }}

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>
  <option value="">
  Select Type
</option>
 <option value="Dormitory1">
  Dormitory1
</option>

<option value="Dormitory2">
  Dormitory2
</option>

<option value="Hall">
  Hall
</option>

<option value="Supermarket">
  Supermarket
</option>

<option value="Others">
  Others
</option>

</select>

{/* FLOOR */}

{(locationType === "Dormitory1" ||
  locationType === "Dormitory2") && (

<select
  value={floor}

  onChange={(e) => {

    setFloor(
      e.target.value
    );

    setRoom("");
  }}

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

  <option value="">
    Select Floor
  </option>

  <option value="GROUND FLOOR">
    Ground Floor
  </option>

  <option value="1ST FLOOR">
    1st Floor
  </option>

  <option value="2ND FLOOR">
    2nd Floor
  </option>

</select>

)}



{/* HALL SELECT */}

{locationType === "Hall" && (

<select
  value={room}

  onChange={(e) =>
    setRoom(
      e.target.value
    )
  }

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

  <option value="">
    Select Hall
  </option>

  <option value="HALL1">
    HALL1
  </option>

  <option value="HALL2">
    HALL2
  </option>

  <option value="HALL3">
    HALL3
  </option>

  <option value="HALL4">
    HALL4
  </option>

</select>

)}

{/* ROW SELECT */}

{locationType === "Hall" && (

<select
  value={floor}

  onChange={(e) =>
    setFloor(
      e.target.value
    )
  }

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

  <option value="">
    Select Row
  </option>

  <option value="ROW1">
    ROW1
  </option>

  <option value="ROW2">
    ROW2
  </option>

  <option value="ROW3">
    ROW3
  </option>

  <option value="ROW4">
    ROW4
  </option>

</select>

)}

{/* ROOM */}

{locationType !== "Hall" && (

<select
  value={room}

  onChange={(e) =>
    setRoom(
      e.target.value
    )
  }

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

<option value="">
  Select Room
</option>

{/* DORMITORY1 */}

{locationType === "Dormitory1" &&
 floor === "GROUND FLOOR" && (

<>
  <option value="R101">R101</option>
  <option value="R102">R102</option>
  <option value="R103">R103</option>
  <option value="R104">R104</option>
  <option value="R105">R105</option>
  <option value="R106">R106</option>
</>

)}

{locationType === "Dormitory1" &&
 floor === "1ST FLOOR" && (

<>
  <option value="R107">R107</option>
  <option value="R108">R108</option>
</>

)}

{locationType === "Dormitory1" &&
 floor === "2ND FLOOR" && (

<>
  <option value="R109">R109</option>
  <option value="R110">R110</option>
</>

)}

{/* DORMITORY2 */}

{locationType === "Dormitory2" &&
 floor === "GROUND FLOOR" && (

<>
  <option value="R201">R201</option>
  <option value="R202">R202</option>
</>

)}

{locationType === "Dormitory2" &&
 floor === "1ST FLOOR" && (

<>
  <option value="R203">R203</option>
  <option value="R204">R204</option>
</>

)}

{locationType === "Dormitory2" &&
 floor === "2ND FLOOR" && (

<>
  <option value="R205">R205</option>
  <option value="R206">R206</option>
</>

)}



{/* SUPERMARKET */}

{locationType === "Supermarket" && (

<>
  <option value="LOWER">LOWER</option>
  <option value="UPPER">UPPER</option>
</>

)}

{/* OTHERS */}

{locationType === "Others" && (

<>
  <option value="OTHERS">
    OTHERS
  </option>
</>

)} 

</select>
)}

{/* LOCATION */}

<select
  value={location}

  onChange={(e) =>
    setLocation(
      e.target.value
    )
  }

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

  <option value="">
    Select Location
  </option>

  <option value="inside">
    Inside
  </option>

  <option value="outside">
    Outside
  </option>

</select>

{/* STATUS */}

<select
  value={status}

  onChange={(e) =>
    setStatus(
      e.target.value
    )
  }

  className="
    h-10
    bg-white
    border
    border-gray-200
    rounded-xl
    px-3
    text-sm
  "
>

  <option value="">
    Select Status
  </option>

  <option value="available">
    Available
  </option>

  <option value="occupied">
    Occupied
  </option>

</select>


{/* CREATE BUTTON */}

<button
  onClick={addBed}

  className="
    h-10
    bg-blue-600
    hover:bg-blue-700
    text-white
    rounded-xl
    px-5
    text-sm
    font-semibold
    transition
  "
>

  Create Bed

</button>





</div>

</CreateBedModal>

        {/* MODAL */}

        {selectedBed && (
          <BedModal
            bed={selectedBed}
            closeModal={() =>
              setSelectedBed(null)
            }
            deleteBed={deleteBed}
            updateBed={updateBed}
            isAdmin={isAdmin}
            isStaff={isStaff}
          />
        )}

      </div>

    </div>
  );
}

export default Beds;