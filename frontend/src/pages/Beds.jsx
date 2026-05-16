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
  const [status, setStatus] = useState("available");

  // BED DATA

  const [beds, setBeds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // FETCH BEDS

  const fetchBeds = async () => {

    try {

      const response = await API.get("/beds");

      setBeds(response.data);

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

      // SAVE TO BACKEND

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

      // UPDATE UI

      setBeds([...beds, response.data]);

      // RESET FORM

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

    // DELETE FROM BACKEND

    await API.delete(`/beds/${id}`);

    // UPDATE UI

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

  const updateBed = (updatedBed) => {

    const updatedBeds = beds.map((bed) =>
      bed.id === updatedBed.id
        ? updatedBed
        : bed
    );

    setBeds(updatedBeds);

    setSelectedBed(updatedBed);
  };

  return (
    <div className="flex">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="p-5 w-full">

        <div className="
  flex
  flex-col
  md:flex-row
  md:items-center
  md:justify-between
  gap-4
">

  <h1 className="text-3xl font-bold">
    Bed Management
  </h1>

  <input
    type="text"
    placeholder="Search bed..."
    value={searchTerm}
    onChange={(e) =>
      setSearchTerm(e.target.value)
    }
    className="
      border
      p-3
      rounded-lg
      w-full
      md:w-72
      outline-none
      focus:ring-2
      focus:ring-blue-400
    "
  />

</div>

        {/* ADD BED FORM */}

        <div className="
          bg-white
          p-5
          rounded-xl
          shadow-md
          mt-5
        ">

          <h2 className="text-xl font-bold mb-5">
            Add New Bed
          </h2>

          <div className="
            grid
            grid-cols-1
            md:grid-cols-5
            gap-4
          ">

            {/* BED NUMBER */}

            <input
              type="text"
              placeholder="Bed Number"
              value={bedNumber}
              onChange={(e) =>
                setBedNumber(e.target.value)
              }
              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* ROOM */}

            <input
              type="text"
              placeholder="Room"
              value={room}
              onChange={(e) =>
                setRoom(e.target.value)
              }
              className="
                border
                p-3
                rounded-lg
              "
            />

            {/* FLOOR */}

            <input
              type="text"
              placeholder="Floor"
              value={floor}
              onChange={(e) =>
                setFloor(e.target.value)
              }
              className="
                border
                p-3
                rounded-lg
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
                p-3
                rounded-lg
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
                p-3
                rounded-lg
              "
            >
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
              mt-5
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-lg
              hover:bg-blue-700
            "
          >
            Add Bed
          </button>

        </div>

        {/* BED GRID */}

        {/* BED GRID */}

<div className="
  grid
  grid-cols-2
  md:grid-cols-4
  lg:grid-cols-7
  gap-4
  mt-5
">

  {beds
    .filter((bed) =>
      bed.bed_number
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
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