import { useEffect, useState } from "react";
import API from "../services/api";

import Sidebar from "../components/Sidebar";

function Reports() {

  const [beds, setBeds] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");

  const [currentPage,
  setCurrentPage] =
  useState(1);

  const [isPrinting,
  setIsPrinting] =
  useState(false);

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

  useEffect(() => {

    fetchBeds();

  }, []);

  // EXPORT CSV

  const reportTitle =

  genderFilter === "boys"

    ? "Boys Dormitory Report"

    : genderFilter === "girls"

      ? "Girls Dormitory Report"

      : "All Dormitory Report";

  const exportCSV = () => {

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

  bed.gender_type === genderFilter;


      const matchesStatus =

        statusFilter === "" ||

        bed.status === statusFilter;

    return (

  matchesSearch &&

  matchesStatus &&

  matchesGender
);
    });


    // HEADERS

    const headers = [
      "Bed",
      "Room",
      "Floor",
      "Status",
      "Name",
      "Emp ID",
      "Contact",
    ];

    // ROWS

    const rows = filteredBeds.map((bed) => [

      bed.bed_number,

      bed.room,

      bed.floor,

      bed.status,

      bed.guest_name || "",

      bed.emp_id || "",

      bed.guest_phone
        ? `+91 ${bed.guest_phone}`
        : "",
    ]);

    // CSV CONTENT

    const csvContent = [

  [reportTitle],

  [],

  headers.join(","),

  ...rows.map((row) =>
    row.join(",")
  ),

].join("\n");

    // DOWNLOAD

    const blob = new Blob(
      [csvContent],
      { type: "text/csv" }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download = "reports.csv";

    link.click();
  };

  // PRINT REPORT

  const printReport = () => {

  setIsPrinting(true);

  setTimeout(() => {

    const originalTitle =
      document.title;

    document.title =
      reportTitle;

    window.print();

    document.title =
      originalTitle;

    setIsPrinting(false);

  }, 300);
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

  return (

    matchesSearch &&

    matchesStatus &&

    matchesGender
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
  overflow-y-auto
  text-sm
  md:ml-64
  mt-14
  md:mt-0
  overflow-x-hidden
">

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
          flex-col
          md:flex-row
          gap-2
          mb-3
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
              border
              p-2
              rounded-md
              outline-none
              w-full
              md:w-72
            "
          />

          {/* FILTER */}

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="
              border
              p-2
              rounded-md
              w-full
              md:w-48
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

          {/*gender Filter */}

          <select
  value={genderFilter}
  onChange={(e) =>
    setGenderFilter(
      e.target.value
    )
  }
  className="
    border
    p-2
    rounded-md
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

          {/* EXPORT */}

          <button
            onClick={exportCSV}
            className="
              bg-green-600
              text-white
              px-4
              py-2
              rounded-md
              hover:bg-green-700
            "
          >
            Export CSV
          </button>

          {/* PRINT */}

          <button
            onClick={printReport}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-md
              hover:bg-blue-700
            "
          >
            Print Report
          </button>

        </div>

        <h2 className="
  text-xl
  font-bold
  mb-3
  text-center
">

  {reportTitle}

</h2>

        {/* TABLE */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          overflow-x-auto
          print-section
        ">

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
                  Room
                </th>

                <th className="p-3 text-left">
                  Floor
                </th>

                <th className="p-3 text-left">
                  Status
                </th>

                <th className="p-3 text-left">
                  Name
                </th>

                <th className="p-3 text-left">
                  Emp ID
                </th>

                <th className="p-3 text-left">
                  Contact
                </th>

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
      "
    >

      {/* SERIAL */}

      <td className="p-3">

        {startIndex + index + 1}

      </td>

      {/* BED */}

      <td className="p-3">
        {bed.bed_number}
      </td>

      {/* ROOM */}

      <td className="p-3">
        {bed.room}
      </td>

      {/* FLOOR */}

      <td className="p-3">
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