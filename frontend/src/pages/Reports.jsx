import * as XLSX from "xlsx";
import ReportsBG from "../assets/reportsBG.webp" 
import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";

function Reports() {

  const [beds, setBeds] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");

  const [typeFilter, setTypeFilter] = useState("");

  const [
  roomFilter,
  setRoomFilter
] = useState("");

const [
  floorFilter,
  setFloorFilter
] = useState("");

const [dynamicRooms, setDynamicRooms] = useState([]);
const [dynamicFloors, setDynamicFloors] = useState([]);

  const [currentPage,
  setCurrentPage] =
  useState(1);

  const [isPrinting,
  setIsPrinting] =
  useState(false);

  const [reportType, setReportType] =
  useState("beds");

  const rowsPerPage = 40;
  // FETCH DATA

  const fetchBeds = async () => {


    try {

      const response = await API.get("/beds");

      setBeds(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  const fetchHistory = async () => {

  try {

    const response =
      await API.get("/beds/history");

    setHistoryData(
      response.data
    );

  } catch (error) {

    console.log(error);

  }
};

 useEffect(() => {

  if (reportType === "beds") {

    fetchBeds();

  }

  else {

    fetchHistory();

  }

}, [reportType]);

  useEffect(() => {

  if (typeFilter === "Dormitory1") {

    setDynamicFloors([
      "GROUND FLOOR",
      "1ST FLOOR",
      "2ND FLOOR",
    ]);

    if (floorFilter === "GROUND FLOOR") {
      setDynamicRooms([
        "R101","R102","R103",
        "R104","R105","R106",
      ]);
    }

    else if (floorFilter === "1ST FLOOR") {
      setDynamicRooms([
        "R107","R108",
      ]);
    }

    else if (floorFilter === "2ND FLOOR") {
  setDynamicRooms([
    "R109","R110",
  ]);
}

  }

  else if (typeFilter === "Dormitory2") {

    setDynamicFloors([
      "GROUND FLOOR",
      "1ST FLOOR",
      "2ND FLOOR",
    ]);

    if (floorFilter === "GROUND FLOOR") {
      setDynamicRooms([
        "R201","R202",
      ]);
    }

    else if (floorFilter === "1ST FLOOR") {
      setDynamicRooms([
        "R203","R204",
      ]);
    }

    else if (floorFilter === "2ND FLOOR") {
      setDynamicRooms([
        "R205","R206",
      ]);
    }

  }

else if (typeFilter === "Hall") {

  setDynamicFloors([
    "HALL1",
    "HALL2",
    "HALL3",
    "HALL4",
  ]);

  setDynamicRooms([
    "ROW1",
    "ROW2",
    "ROW3",
    "ROW4",
  ]);

}

  else if (typeFilter === "Supermarket") {

    setDynamicRooms([
      "LOWER",
      "UPPER",
    ]);

    setDynamicFloors([]);

  }

  else {

    setDynamicRooms([]);
    setDynamicFloors([]);

  }

}, [typeFilter, floorFilter]);

  // EXPORT CSV

  const reportTitle =

  genderFilter === "boys"

    ? "Boys Dormitory Report"

    : genderFilter === "girls"

      ? "Girls Dormitory Report"

      : "All Dormitory Report";

 const exportExcel = () => {

  const filteredBeds = beds.filter((bed) => {

    const matchesSearch =

      bed.bed_number
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      bed.guest_name
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )

      ||

      bed.emp_id
        ?.toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        );

    const matchesGender =

      genderFilter === "" ||

      bed.gender_type === genderFilter;

    const matchesStatus =

      statusFilter === "" ||

      bed.status === statusFilter;

    const matchesType =

      typeFilter === "" ||

      bed.location_type === typeFilter;

    const matchesRoom =

      typeFilter === "Hall"

        ? (
            roomFilter === "" ||
            bed.floor === roomFilter
          )

        : (
            roomFilter === "" ||
            bed.room === roomFilter
          );

    const matchesFloor =

      typeFilter === "Hall"

        ? (
            floorFilter === "" ||
            bed.room === floorFilter
          )

        : (
            floorFilter === "" ||
            bed.floor === floorFilter
          );

    return (

      matchesSearch &&

      matchesStatus &&

      matchesGender &&

      matchesType &&

      matchesRoom &&

      matchesFloor
    );

  });

  const excelData = filteredBeds.map(
    (bed, index) => ({

      "S.No": index + 1,

      "Bed": bed.bed_number,

      "Room / Hall": bed.room,

      "Floor / Row": bed.floor,

      "Location": bed.location,

      "Status": bed.status,

      "Name":
        bed.guest_name || "-",

      "Emp ID":
        bed.emp_id || "-",

      "Contact":
        bed.guest_phone
          ? `+91 ${bed.guest_phone}`
          : "-",

    })
  );

  const worksheet =
  XLSX.utils.aoa_to_sheet([
    ["DORMITORY MANAGEMENT SYSTEM"],
    [reportTitle],
    [""],
    [
      `Type: ${typeFilter || "All"}`
    ],
    [
      `Floor/Row: ${floorFilter || "All"}`
    ],
    [
      `Room/Hall: ${roomFilter || "All"}`
    ],
    [
      `Status: ${statusFilter || "All"}`
    ],
   [
  `Generated On: ${new Date().toLocaleString()}`
],

[
  `Total Records: ${excelData.length}`
],


    
    [""]
  ]);

  worksheet["!freeze"] = {
  xSplit: 0,
  ySplit: 10,
};

   worksheet["!merges"] = [

  {
    s: { r: 0, c: 0 },
    e: { r: 0, c: 8 },
  },

  {
    s: { r: 1, c: 0 },
    e: { r: 1, c: 8 },
  },

];

XLSX.utils.sheet_add_json(
  worksheet,
  excelData,
  {
    origin: "A10",
    skipHeader: false,
  }
);

worksheet["!cols"] = [

  { wch: 8 },   // S.No

  { wch: 15 },  // Bed

  { wch: 18 },  // Room

  { wch: 18 },  // Floor

  { wch: 15 },  // Location

  { wch: 20 },  // Status

  { wch: 30 },  // Name

  { wch: 18 },  // Emp ID

  { wch: 20 },  // Contact

];
  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Dormitory Report"
  );

  XLSX.writeFile(
    workbook,
    `${reportTitle}.xlsx`
  );

};

  // PRINT REPORT

  const printReport = () => {

  setIsPrinting(true);

  setTimeout(() => {

    window.print();

    setIsPrinting(false);

  }, 1000);

};

  // FILTERED DATA

const filteredBeds = beds.filter((bed) => {

  const matchesSearch =

    bed.bed_number
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )

    ||

    bed.guest_name
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )

    ||

    bed.emp_id
      ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      );

  const matchesGender =

    genderFilter === "" ||

    bed.gender_type ===
    genderFilter;

  const matchesStatus =

    statusFilter === "" ||

    bed.status === statusFilter;

   const matchesType =

  typeFilter === "" ||

  bed.location_type === typeFilter;

const matchesRoom =

  typeFilter === "Hall"

    ? (
        roomFilter === "" ||
        bed.floor === roomFilter
      )

    : (
        roomFilter === "" ||
        bed.room === roomFilter
      );

const matchesFloor =

  typeFilter === "Hall"

    ? (
        floorFilter === "" ||
        bed.room === floorFilter
      )

    : (
        floorFilter === "" ||
        bed.floor === floorFilter
      );

return (

  matchesSearch &&

  matchesStatus &&

  matchesGender &&

  matchesType &&

  matchesRoom &&

  matchesFloor
);
});


// PAGINATION

const totalPages = Math.ceil(
  filteredBeds.length /
  rowsPerPage
);

const startIndex =

  (currentPage - 1) *
  rowsPerPage;

const currentBeds =

  filteredBeds.slice(

    startIndex,

    startIndex + rowsPerPage
  );

  const totalBeds =
  filteredBeds.length;

const availableBeds =
  filteredBeds.filter(
    bed => bed.status === "available"
  ).length;

const occupiedBeds =
  filteredBeds.filter(
    bed => bed.status === "occupied"
  ).length;

const maintenanceBeds =
  filteredBeds.filter(
    bed => bed.status === "under_maintenance"
  ).length;

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
      url(${ReportsBG})
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

        <h1 className="
          text-2xl
          font-bold
          mb-4
          text-center
        ">
          Reports
        </h1>

        {/* SEARCH & FILTER */}

        <div className="
  flex
  items-center
  gap-2
  mb-3
  overflow-x-auto
  pb-2
">
  
          {/* SEARCH */}

          <input
            type="text"
            placeholder="Search Bed / Name / Emp ID"
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
           className="
  h-10
 w-36
  bg-white
  border
  border-gray-200
  px-3
  rounded-xl
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-300
  appearance-none
  cursor-pointer
"
          />

          {/* FILTER */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
  h-10
w-36
  bg-white
  border
  border-gray-200
  px-3
  rounded-xl
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-300
  appearance-none
  cursor-pointer
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

          {/*gender Filter */}

          <select
  value={genderFilter}
  onChange={(e) =>
    setGenderFilter(
      e.target.value
    )
  }
className="
  h-10
  w-36
  bg-white
  border
  border-gray-200
  px-3
  rounded-xl
  text-sm
  shadow-sm
  outline-none
  focus:ring-2
  focus:ring-blue-300
  appearance-none
  cursor-pointer
"
>

  <option value="">
    All Dormitory
  </option>

  <option value="boys">
    Boys Dormitory
  </option>

  <option value="girls">
    Girls Dormitory
  </option>

</select>

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
   w-36
    bg-white
    border
    border-gray-200
    px-3
    rounded-xl
    text-sm
    shadow-sm
    outline-none
    focus:ring-2
    focus:ring-blue-300
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
  onChange={(e) => {

  setFloorFilter(e.target.value);

  setRoomFilter("");

}}

  className="
    h-10
  w-36
    bg-white
    border
    border-gray-200
    px-3
    rounded-xl
    text-sm
    shadow-sm
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
    setRoomFilter(e.target.value)
  }

  className="
    h-10
   w-36
    bg-white
    border
    border-gray-200
    px-3
    rounded-xl
    text-sm
    shadow-sm
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
 <div className="
  grid
  grid-cols-2
  md:grid-cols-4
  gap-4
  mb-4
">

  <div className="
    bg-white
    rounded-xl
    p-4
    shadow-sm
    text-center
  ">
    <p>Total Beds</p>

    <h2 className="
      text-3xl
      font-bold
    ">
      {totalBeds}
    </h2>
  </div>

  <div className="
    bg-green-50
    rounded-xl
    p-4
    shadow-sm
    text-center
  ">
    <p>Available</p>

    <h2 className="
      text-3xl
      font-bold
      text-green-700
    ">
      {availableBeds}
    </h2>
  </div>

  <div className="
    bg-red-50
    rounded-xl
    p-4
    shadow-sm
    text-center
  ">
    <p>Occupied</p>

    <h2 className="
      text-3xl
      font-bold
      text-red-700
    ">
      {occupiedBeds}
    </h2>
  </div>

  <div className="
    bg-yellow-50
    rounded-xl
    p-4
    shadow-sm
    text-center
  ">
    <p>Maintenance</p>

    <h2 className="
      text-3xl
      font-bold
      text-yellow-700
    ">
      {maintenanceBeds}
    </h2>
  </div>

</div>

<div className="
  flex
  justify-between
  items-center
  mb-4
">

  <h2 className="
    text-xl
    font-bold
  ">
    {reportTitle}
  </h2>

 <div className="
  flex
  gap-3
  items-center
">

  <select
    value={reportType}
    onChange={(e) =>
      setReportType(e.target.value)
    }
    className="
      bg-white
      border
      border-gray-200
      px-4
      py-2
      rounded-xl
      text-sm
      shadow-md
    "
  >
    <option value="beds">
  Bed Report
</option>

<option value="backup">
  Occupancy Backup
</option>
  </select>

  <button
    onClick={exportExcel}
    className="
      bg-green-500/90
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      shadow-md
      hover:bg-green-600
    "
  >
    Export Excel
  </button>

  <button
    onClick={printReport}
    className="
      bg-blue-500/90
      text-white
      px-4
      py-2
      rounded-xl
      text-sm
      shadow-md
      hover:bg-blue-600
    "
  >
    Print Report
  </button>

</div>

</div>


{isPrinting && (

  <div className="mb-6 text-center">

    <h1 className="text-3xl font-bold">

  {reportTitle}

  {typeFilter &&
    ` - ${typeFilter}`}

  {floorFilter &&
    ` - ${floorFilter}`}

  {roomFilter &&
    ` - ${roomFilter}`}

</h1>

    <p className="text-gray-600 mt-2">

      {typeFilter && `Type: ${typeFilter}`}

      {floorFilter &&
        ` | Floor/Row: ${floorFilter}`}

      {roomFilter &&
        ` | Room/Hall: ${roomFilter}`}

      {statusFilter &&
        ` | Status: ${statusFilter}`}

    </p>

  </div>

)}

        {/* TABLE */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          overflow-x-auto
          print-section
        ">

          {isPrinting && (

  <div
    style={{
      textAlign: "center",
      padding: "20px",
      borderBottom: "2px solid #000",
      marginBottom: "20px",
    }}
  >

    <h1
      style={{
        fontSize: "28px",
        fontWeight: "bold",
      }}
    >
      {reportTitle}
    </h1>

    <h3>
      {typeFilter || "All Types"}

      {floorFilter &&
        ` | ${floorFilter}`}

      {roomFilter &&
        ` | ${roomFilter}`}
    </h3>

  </div>

)}

          <table className="
            w-full
            border-collapse
          ">

            {/* HEADER */}

            <thead className="bg-gray-100">

              <tr>
              
              <th className="p-3 text-left">
  S.No
</th>

                <th className="p-3 text-left">
                  Bed
                </th>

                <th className="p-3 text-left">

  {statusFilter ===
  "under_maintenance"

    ? "Room / Hall"

    : "Room"}

</th>

<th className="p-3 text-left">

  {statusFilter ===
  "under_maintenance"

    ? "Floor / Row"

    : "Floor"}

</th>

                <th className="p-3 text-left">
                  Status
                </th>

               {statusFilter !== "under_maintenance" && (

  <>

    <th className="p-3 text-left">
      Name
    </th>

    <th className="p-3 text-left">
      Emp ID
    </th>

    <th className="p-3 text-left">
      Contact
    </th>

  </>

)}

{statusFilter === "under_maintenance" && (

  <>

    <th className="p-3 text-left">
      Fan
    </th>

    <th className="p-3 text-left">
      Mattress
    </th>

    <th className="p-3 text-left">
      Electrical
    </th>

    <th className="p-3 text-left">
      Plywood
    </th>

    <th className="p-3 text-left">
      Comments
    </th>

  </>

)}

              </tr>

            </thead>

        
            {/* BODY */}

            <tbody>

              {(
  isPrinting
    ? filteredBeds
    : currentBeds
).map(

  
  (bed, index) => (

   <tr
  key={bed.id}
  className="
    border-b
    hover:bg-gray-50
    align-middle
  "
>

      {/* SERIAL */}

      <td className="p-3">

       {isPrinting
  ? index + 1
  : startIndex + index + 1}

      </td>

      {/* BED */}

      <td className="p-3">
        {bed.bed_number}
      </td>

      {/* ROOM */}

      <td
  className="p-3 align-middle"
>
  {bed.room}
</td>

      {/* FLOOR */}

      <td
  className="p-3 align-middle"
>
  {bed.floor}
</td>

      {/* STATUS */}

      <td className="p-3">

        <span className={`
          px-2
          py-1
          rounded-full
          text-xs
          font-medium

          ${
            bed.status === "available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }
        `}>

          {bed.status}

        </span>

      </td>

      {/* NAME */}

   {statusFilter !== "under_maintenance" && (

  <>

    {/* NAME */}

    <td className="p-3">
      {bed.guest_name || "-"}
    </td>

    {/* EMP ID */}

    <td className="p-3">
      {bed.emp_id || "-"}
    </td>

    {/* CONTACT */}

    <td className="p-3">

      {bed.guest_phone
        ? `+91 ${bed.guest_phone}`
        : "-"
      }

    </td>

  </>

)}

{statusFilter === "under_maintenance" && (

  <>

    {/* FAN */}

    <td
      className="p-3 font-bold"
      style={{
        color:
          bed.maintenance_fan
            ? "green"
            : "red",
      }}
    >
      {bed.maintenance_fan
        ? "✔"
        : "✖"}
    </td>

    {/* MATTRESS */}

    <td
      className="p-3 font-bold"
      style={{
        color:
          bed.maintenance_mattress
            ? "green"
            : "red",
      }}
    >
      {bed.maintenance_mattress
        ? "✔"
        : "✖"}
    </td>

    {/* ELECTRICAL */}

    <td
      className="p-3 font-bold"
      style={{
        color:
          bed.maintenance_electrical
            ? "green"
            : "red",
      }}
    >
      {bed.maintenance_electrical
        ? "✔"
        : "✖"}
    </td>

    {/* PLYWOOD */}

    <td
      className="p-3 font-bold"
      style={{
        color:
          bed.maintenance_plywood
            ? "green"
            : "red",
      }}
    >
      {bed.maintenance_plywood
        ? "✔"
        : "✖"}
    </td>

    {/* COMMENTS */}

   <td
  className="p-3"
  style={{
    maxWidth: "220px",
    wordBreak: "break-word",
    whiteSpace: "pre-wrap",
  }}
>
  {bed.maintenance_comment || "-"}
</td>
  </>

)}

    </tr>
))}

            </tbody>

          </table>


          <div className="
  flex
  justify-center
  items-center
  gap-4
  p-4
">

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
      rounded-xl
      bg-gray-200
      disabled:opacity-50
    "
  >
    Prev
  </button>

  <span className="
    font-medium
  ">

    Page {currentPage}
    of {totalPages}

  </span>

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
      rounded-xl
      bg-gray-200
      disabled:opacity-50
    "
  >
    Next
  </button>

</div>

        </div>

      </div>

    </div>
  );
}

export default Reports;