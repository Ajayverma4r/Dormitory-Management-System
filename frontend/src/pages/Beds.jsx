import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import BedCard from "../components/BedCard";
import BedModal from "../components/BedModal";
import toast from "react-hot-toast";

function Beds() {

  const [selectedBed, setSelectedBed] = useState(null);

  // FORM STATES

  const [bedNumber, setBedNumber] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

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

  // BED DATA

  const [beds, setBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [locationFilter, setLocationFilter] = useState("");

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

        guest_name: guestName,

        emp_id: empId,

        guest_phone: guestPhone,

        check_in: checkIn,
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

    setSelectedBed(null);

  } catch (error) {

    console.log(error);

    toast.error("Failed to update bed");
  }
};

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

        {/* HEADER */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-2
        ">

          <div className="w-full text-center">

            <h1
              className="
                text-2xl
                font-bold
                mb-1
              "
            >
              Bed Management
            </h1>

          </div>

          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search bed..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="
              border
              p-1.5
              rounded-md
              w-full
              md:w-56
              outline-none
              focus:ring-1
              focus:ring-blue-400
            "
          />

          <select
         value={statusFilter}
         onChange={(e) =>
         setStatusFilter(e.target.value)
         }
         className="
         border
       p-1.5
       rounded-md
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

</select>

<select
  value={locationFilter}
  onChange={(e) =>
    setLocationFilter(e.target.value)
  }
  className="
    border
    p-1.5
    rounded-md
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

        </div>


        {/* ADD BED FORM */}

        <div className="
          bg-white
          p-2
          rounded-lg
          shadow-sm
          mt-2
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

            <input
              type="text"
              placeholder="Room"
              value={room}
              onChange={(e) =>
             setRoom(
               e.target.value.toUpperCase()
              )
              }
              className="
                border
                p-1.5
                rounded-md
              "
            />

            {/* FLOOR */}

            <input
              type="text"
              placeholder="Floor"
              value={floor}
             onChange={(e) =>
             setFloor(
             e.target.value.toUpperCase()
             )
              }
              className="
                border
                p-1.5
                rounded-md
              "
            />

            

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
  onChange={(e) =>
    setStatus(e.target.value)
  }
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
              mt-2
              bg-blue-600
              text-white
              px-3
              py-1.5
              rounded-md
              hover:bg-blue-700
            "
          >
            Create New Bed
          </button>

        </div>

        {/* GUEST MODAL */}

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

         {beds
  .filter((bed) => {

    const matchesSearch =
      bed.bed_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "" ||
      bed.status === statusFilter;

    const matchesLocation =
      locationFilter === "" ||
      bed.location === locationFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesLocation
    );
  })
  .map((bed) => (
              <BedCard
                key={bed.id}
                bed={bed}
                onClick={setSelectedBed}
              />
            ))}

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
          />
        )}

      </div>

    </div>
  );
}

export default Beds;