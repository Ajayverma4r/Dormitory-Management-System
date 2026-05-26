import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import BedCard from "../components/BedCard";
import BedModal from "../components/BedModal";
import toast from "react-hot-toast";


const hallRoomOptions = [

  "HALL1",
  "HALL2",
  "HALL3",
  "HALL4",

  "ROOM1",
  "ROOM2",
  "ROOM3",
  "ROOM4",

  "SUPERMARKET",

  "OTHERS",
];

function Beds({ type }) {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const isAdmin =
    user?.role === "admin";

  const isStaff =
    user?.role === "staff";

  const [selectedBed, setSelectedBed] = useState(null);

  // FORM STATES

  const [bedNumber, setBedNumber] = useState("");
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

  const [locationFilter, setLocationFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("");

  const [floorFilter, setFloorFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

const bedsPerPage = 40;

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
roomFilter,
floorFilter,
]);

  // ADD BED

  const addBed = async () => {

  try {

    if (
      !bedNumber ||
      !room ||
      !floor ||
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
        status,
        gender_type: type,
        department,
        fan,
        mattress,
        plywood
      }
    );

    setBeds([...beds, response.data]);

    resetForm();

  } catch (error) {

    console.log(error);

    toast.error("Server Error");
  }
};

const resetForm = () => {

  setBedNumber("");
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

 return (

  bed.gender_type === type &&

  matchesSearch &&

  matchesStatus &&

  matchesLocation &&

matchesRoom &&

matchesFloor
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

      <div className="
  p-2
  w-full
  text-sm
  md:ml-64
  mt-14
  md:mt-0
  overflow-x-hidden
">

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
    flex-wrap
    gap-3
    mb-4
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
      w-64
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

  {/* LOCATION */}

  <select
    value={locationFilter}

    onChange={(e) =>
      setLocationFilter(
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
      All Location
    </option>

    <option value="inside">
      Inside
    </option>

    <option value="outside">
      Outside
    </option>

  </select>

  {/* ROOM */}

  <select
    value={roomFilter}

    onChange={(e) => {

      setRoomFilter(
        e.target.value
      );

      setFloorFilter("");
    }}

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
      All Hall / Room
    </option>

    {hallRoomOptions.map((item) => (

      <option
        key={item}
        value={item}
      >
        {item}
      </option>

    ))}

  </select>

  {/* FLOOR */}

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

    {roomFilter.startsWith("HALL") && (

      <>

        <option value="ROW1">
          Row1
        </option>

        <option value="ROW2">
          Row2
        </option>

        <option value="ROW3">
          Row3
        </option>

        <option value="ROW4">
          Row4
        </option>

      </>

    )}

    {roomFilter.startsWith("ROOM") && (

      <>

        <option value="FLOOR1">
          Floor1
        </option>

        <option value="FLOOR2">
          Floor2
        </option>

        <option value="FLOOR3">
          Floor3
        </option>

      </>

    )}

     {(roomFilter === "SUPERMARKET" ||
    roomFilter === "OTHERS") && (

    <option value="OTHERS">
      Others
    </option>

  )}

  </select>

</div>


        {/* ADD BED FORM */}
  {isAdmin && (
        <div className="
        bg-white
        rounded-2xl
        shadow-sm
        border
        p-4
        ">

          <h2 className="text-lg font-bold mb-2">
            Add New Bed
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-5
            gap-2
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
                border
                p-1.5
                rounded-md
              "
            />

            {/* ROOM */}

            <select
  value={room}

  onChange={(e) => {

    const value =
      e.target.value;

    setRoom(value);

    // RESET FLOOR/ROW

    setFloor("");
  }}

  className="
    border
    p-1.5
    rounded-md
  "
>

  <option value="">
    Select Hall / Room
  </option>

  {hallRoomOptions.map((item) => (

    <option
      key={item}
      value={item}
    >
      {item}
    </option>

  ))}

</select>

            {/* FLOOR */}

            <select
  value={floor}

  onChange={(e) =>
    setFloor(e.target.value)
  }

  className="
    border
    p-1.5
    rounded-md
  "
>

  <option value="">
    Select Floor / Row
  </option>

  {/* HALLS */}

  {room.startsWith("HALL") && (

    <>

      <option value="ROW1">
        Row1
      </option>

      <option value="ROW2">
        Row2
      </option>

      <option value="ROW3">
        Row3
      </option>

      <option value="ROW4">
        Row4
      </option>

    </>

  )}

  {/* ROOMS */}

  {room.startsWith("ROOM") && (

    <>

      <option value="FLOOR1">
        Floor1
      </option>

      <option value="FLOOR2">
        Floor2
      </option>

      <option value="FLOOR3">
        Floor3
      </option>

    </>

  )}

  {/* SUPERMARKET / OTHERS */}

  {(room === "SUPERMARKET" ||
    room === "OTHERS") && (

    <option value="OTHERS">
      Others
    </option>

  )}

</select>

            

            {/* LOCATION */}

            <select
              value={location}
              onChange={(e) =>
                setLocation(e.target.value)
              }
              className="
                border
                p-1.5
                rounded-md
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

  onChange={(e) => {

    const newStatus =
      e.target.value;

    setStatus(newStatus);

    // RESET ONLY USER DETAILS

    setGuestName("");

    setGuestPhone("");

    setEmpId("");

    setDepartment("");

    setCheckIn("");

    // DO NOT RESET AMENITIES

  }}

  className="
    border
    p-1.5
    rounded-md
  "
>

  <option value="">
    Status
  </option>

  <option value="available">
    Available
  </option>

  <option value="occupied">
    Occupied
  </option>

</select>

          </div>

          

          {/* BUTTON */}

          <button
            onClick={addBed}
           className="
  mt-3
  h-10
  bg-blue-600
  text-white
  px-5
  rounded-xl
  text-sm
  shadow-sm
  hover:bg-blue-700
  transition-all
"
          >
            Create New Bed
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
    z-50
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

        {/* BED GRID */}

        <div className="
          grid
          grid-cols-2
          md:grid-cols-5
          lg:grid-cols-9
          gap-2
          mt-3
          justify-center
        ">

        {currentBeds.map((bed) => (

  <BedCard
    key={bed.id}
    bed={bed}
    onClick={setSelectedBed}
  />

))}

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