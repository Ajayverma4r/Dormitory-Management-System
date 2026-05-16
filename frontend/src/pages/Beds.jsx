import { useState } from "react";

import Sidebar from "../components/Sidebar";
import BedCard from "../components/BedCard";
import BedModal from "../components/BedModal";

function Beds() {

  const [selectedBed, setSelectedBed] = useState(null);

  const [bedNumber, setBedNumber] = useState("");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [status, setStatus] = useState("available");

  // NEW LOCATION STATE
  const [location, setLocation] = useState("");

  const [beds, setBeds] = useState([
    {
      id: 1,
      bedNumber: "B101",
      room: "Room 1",
      floor: "1st Floor",
      location: "inside",
      status: "occupied",

      guest: {
        name: "Rahul Sharma",
        phone: "9876543210",
        checkIn: "2026-05-15",
      },
    },

    {
      id: 2,
      bedNumber: "B102",
      room: "Room 1",
      floor: "1st Floor",
      location: "outside",
      status: "available",

      guest: null,
    },

    {
      id: 3,
      bedNumber: "B103",
      room: "Room 2",
      floor: "2nd Floor",
      location: "inside",
      status: "occupied",

      guest: {
        name: "Aman Verma",
        phone: "9999999999",
        checkIn: "2026-05-16",
      },
    },
  ]);

  const addBed = () => {

    if (!bedNumber || !room || !floor) {
      alert("Please fill all fields");
      return;
    }

    const newBed = {
      id: Date.now(),
      bedNumber,
      room,
      floor,
      location,
      status,
      guest: null,
    };

    setBeds([...beds, newBed]);

    setBedNumber("");
    setRoom("");
    setFloor("");
    setStatus("available");
    setLocation("");
  };

  const deleteBed = (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this bed?"
  );

  if (!confirmDelete) {
    return;
  }

  const updatedBeds = beds.filter(
    (bed) => bed.id !== id
  );

  setBeds(updatedBeds);

  setSelectedBed(null);
};
  return (
    <div className="flex">

      <Sidebar />

      <div className="p-5 w-full">

        <h1 className="text-3xl font-bold">
          Bed Management
        </h1>

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

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          lg:grid-cols-5
          gap-5
          mt-5
        ">

          {beds.map((bed) => (
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
            closeModal={() => setSelectedBed(null)}
            deleteBed={deleteBed}
          />
        )}

      </div>

    </div>
  );
}

export default Beds;