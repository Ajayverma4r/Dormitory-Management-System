import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import BedCard from "../components/BedCard";
import BedModal from "../components/BedModal";

function Beds() {

  const [selectedBed, setSelectedBed] = useState(null);

  // FORM STATES

  const [bedNumber, setBedNumber] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

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
        alert("Please fill all fields");
        return;
      }

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

      setBedNumber("");
      setRoom("");
      setFloor("");
      setLocation("");
      setStatus("available");

    } catch (error) {

      console.log(error);

      if (
        error.response &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Server Error");
      }
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

      alert("Failed to delete bed");
    }
  };

  // UPDATE BED

const updateBed = async (updatedBed) => {

  try {

    const response = await API.put(

      `/beds/${updatedBed.id}`,

      {
        status: updatedBed.status,

        guest_name:
          updatedBed.guest?.name || "",

        emp_id:
          updatedBed.guest?.empId || "",

        guest_phone:
          updatedBed.guest?.phone || "",

        check_in:
          updatedBed.guest?.checkIn || "",
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

    alert("Failed to update bed");
  }
};

  return (

    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="p-2 w-full text-sm">

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