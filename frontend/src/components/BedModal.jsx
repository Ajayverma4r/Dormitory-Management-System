import toast from "react-hot-toast";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdContentCopy } from "react-icons/md";

function BedModal({
  isAdmin,
  isStaff,
  bed,
  closeModal,
  deleteBed,
  updateBed,
}) {

  const [isEditing, setIsEditing] =
    useState(false);

  const [guestName, setGuestName] =
    useState(
      bed.guest?.name || ""
    );

  const [department, setDepartment] =
    useState(
      bed.department || ""
    );

  const [fan, setFan] =
    useState(
      bed.fan || false
    );

  const [mattress, setMattress] =
    useState(
      bed.mattress || false
    );

  const [plywood, setPlywood] =
    useState(
      bed.plywood || false
    );

  const [empId, setEmpId] =
    useState(
      bed.guest?.empId || ""
    );

  const [guestPhone, setGuestPhone] =
    useState(
      bed.guest?.phone || ""
    );

  const [checkIn, setCheckIn] =
    useState(
      bed.guest?.checkIn || ""
    );

  const [status, setStatus] =
    useState(
      bed.status || "available"
    );

    const [
  occupantGender,
  setOccupantGender
] = useState(
  bed.occupant_gender || ""
);

      const [
  maintenanceFan,
  setMaintenanceFan
] = useState(
  bed.maintenance_fan || false
);

const [
  maintenanceMattress,
  setMaintenanceMattress
] = useState(
  bed.maintenance_mattress || false
);

const [
  maintenancePlywood,
  setMaintenancePlywood
] = useState(
  bed.maintenance_plywood || false
);

const [
  maintenanceBed,
  setMaintenanceBed
] = useState(
  bed.maintenance_bed || false
);

const [
  maintenanceElectrical,
  setMaintenanceElectrical
] = useState(
  bed.maintenance_electrical || false
);

const [
  maintenanceCleaning,
  setMaintenanceCleaning
] = useState(
  bed.maintenance_cleaning || false
);

const [
  maintenanceOthers,
  setMaintenanceOthers
] = useState(
  bed.maintenance_others || false
);

const [
  maintenanceComment,
  setMaintenanceComment
] = useState(
  bed.maintenance_comment || ""
);

  if (!bed) return null;

  // SAVE UPDATE

  const handleSave = async () => {


    // GENDER VALIDATION

if (
  bed.gender_type === "boys" &&
  occupantGender === "female"
) {

  toast.error(
    "Female occupants cannot be assigned to Men Dormitory"
  );

  return;
}

if (
  bed.gender_type === "girls" &&
  occupantGender === "male"
) {

  toast.error(
    "Male occupants cannot be assigned to Women Dormitory"
  );

  return;
}

if (
  status === "occupied" &&
  !occupantGender
) {

  toast.error(
    "Please select gender"
  );

  return;
}

    // PHONE VALIDATION

    if (
      guestPhone &&
      guestPhone.length !== 10
    ) {

      toast.error(
        "Please enter correct phone number"
      );

      return;
    }

    // OCCUPIED VALIDATION

    if (
      status === "occupied" &&

      (
        !guestName ||
        !empId ||
        !guestPhone ||
        !checkIn ||
        !department
      )
    ) {

      toast.error(
        "Please fill all guest details for occupied bed"
      );

      return;
    }

    const updatedBed = {

      ...bed,

      status,

        occupant_gender:
    occupantGender,

      department,

      fan,

      mattress,

      plywood,

      maintenance_fan:
  maintenanceFan,

maintenance_mattress:
  maintenanceMattress,

maintenance_plywood:
  maintenancePlywood,

maintenance_bed:
  maintenanceBed,

maintenance_electrical:
  maintenanceElectrical,

maintenance_cleaning:
  maintenanceCleaning,

maintenance_others:
  maintenanceOthers,

maintenance_comment:
  maintenanceComment,

      guest:
        status === "occupied"
          ? {
              name: guestName,

              empId: empId,

              phone: guestPhone,

              checkIn: checkIn,
            }
          : null,
    };

   const success =
  await updateBed(updatedBed);

if (success) {
  setIsEditing(false);
}
  };

  const handlePrint = () => {

  const printWindow = window.open(
    "",
    "_blank"
  );

  const amenities = [];

  if (fan) amenities.push("Fan");
  if (mattress) amenities.push("Mattress");
  if (plywood) amenities.push("Plywood");

  printWindow.document.write(`

    <html>

      <head>

        <title>
          Bed Details
        </title>

        <style>

          body {
            font-family: Arial;
            padding: 20px;
          }

          h2 {
            text-align: center;
          }

          table {
            width: 100%;
            border-collapse: collapse;
          }

          td {
            padding: 8px;
            border: 1px solid #ccc;
          }

        </style>

      </head>

      <body>

        <h2>
  ${
    bed.gender_type === "boys"
      ? "Men Dormitory"
      : "Women Dormitory"
  }
</h2>

<h3 style="text-align:center;">
  Accommodation Details
</h3>

        <table>

          <tr>
            <td><b>Bed Number</b></td>
            <td>${bed.bed_number}</td>
          </tr>

          ${
  bed.location_type === "Supermarket"
  ? `
      <tr>
        <td><b>Section</b></td>
        <td>${bed.room || "-"}</td>
      </tr>
    `
  : bed.location_type === "Hall"
  ? `
      <tr>
        <td><b>Hall</b></td>
        <td>${bed.room || "-"}</td>
      </tr>

      <tr>
        <td><b>Row</b></td>
        <td>${bed.floor || "-"}</td>
      </tr>
    `
  : `
      <tr>
        <td><b>Room</b></td>
        <td>${bed.room || "-"}</td>
      </tr>

      <tr>
        <td><b>Floor</b></td>
        <td>${bed.floor || "-"}</td>
      </tr>
    `
}

          <tr>
            <td><b>Location</b></td>
            <td>${bed.location || "-"}</td>
          </tr>

          <tr>
            <td><b>Status</b></td>
            <td>${status}</td>
          </tr>

          <tr>
            <td><b>Name</b></td>
            <td>${guestName || "-"}</td>
          </tr>

          <tr>
            <td><b>EMP ID</b></td>
            <td>${empId || "-"}</td>
          </tr>

          <tr>
            <td><b>Gender</b></td>
            <td>${occupantGender || "-"}</td>
          </tr>

          <tr>
            <td><b>Department</b></td>
            <td>${department || "-"}</td>
          </tr>

          <tr>
            <td><b>Amenities</b></td>
            <td>${amenities.join(", ")}</td>
          </tr>

          <tr>
            <td><b>Check In</b></td>
            <td>
              ${
                checkIn
                  ? new Date(checkIn)
                      .toLocaleDateString(
                        "en-IN"
                      )
                  : "-"
              }
            </td>
          </tr>

        </table>

      </body>

    </html>

  `);

 printWindow.document.close();

setTimeout(() => {

  printWindow.focus();

  printWindow.print();

  setTimeout(() => {

    if (!printWindow.closed) {

      printWindow.close();

    }

  }, 1000);

}, 300);
  
};
  
  const copyPhone = async () => {
  try {

    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {

      await navigator.clipboard.writeText(
        guestPhone
      );

    } else {

      const textArea =
        document.createElement(
          "textarea"
        );

      textArea.value = guestPhone;

      textArea.style.position =
        "fixed";

      textArea.style.left =
        "-999999px";

      document.body.appendChild(
        textArea
      );

      textArea.focus();

      textArea.select();

      document.execCommand("copy");

      textArea.remove();
    }

    toast.success(
      "Phone number copied"
    );

  } catch (err) {

    console.error(err);

    toast.error(
      "Failed to copy number"
    );

  }
};

  return (

    <div style={overlayStyle}>

      <div style={modalStyle}>

        {/* BED NUMBER */}

        <h2
          style={{
            marginBottom: "10px",
            fontSize: "20px",
          }}
        >
          {bed.bed_number}
        </h2>

       

      {/* BED DETAILS */}

<p>
  <strong>Type:</strong>{" "}
  {bed.location_type || "-"}
</p>

{/* HALL */}

{bed.location_type === "Hall" && (

  <>

    <p>
      <strong>Hall:</strong>{" "}
      {bed.room}
    </p>

    <p>
      <strong>Row:</strong>{" "}
      {bed.floor}
    </p>

  </>

)}

{/* DORMITORY */}

{(bed.location_type === "Dormitory1" ||
  bed.location_type === "Dormitory2") && (

  <>

    <p>
      <strong>Floor:</strong>{" "}
      {bed.floor}
    </p>

    <p>
      <strong>Room:</strong>{" "}
      {bed.room}
    </p>

  </>

)}

{/* SUPERMARKET */}

{bed.location_type === "Supermarket" && (

  <p>
    <strong>Section:</strong>{" "}
    {bed.room}
  </p>

)}




       

        {/* STATUS */}
  <p>
  <strong>Location:</strong>{" "}
  {bed.location}
</p>
        {/* STATUS */}

<p>

  <strong>Status:</strong>{" "}

  {isEditing ? (

    <select
      value={status}
      onChange={(e) =>
        setStatus(e.target.value)
      }
      style={inputStyle}
    >

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

  ) : (

    status.replace("_", " ")

  )}

</p>

        {/* PERSON DETAILS */}

        {status === "occupied" && (

          <>

            <hr
              style={{
                margin: "10px 0",
              }}
            />

            <h3
              style={{
                marginBottom: "8px",
                fontSize: "16px",
              }}
            >
              Person Details
            </h3>

            {/* NAME */}

            <p>

              <strong>Name:</strong>

              {isEditing ? (

                <input
                  type="text"
                  value={guestName}
                  onChange={(e) =>
                    setGuestName(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

              ) : (
                ` ${guestName || "-"}`
              )}

            </p>

            {/* EMP ID */}

            <p>

              <strong>Emp ID:</strong>

              {isEditing ? (

                <input
                  type="text"
                  value={empId}
                  onChange={(e) =>
  setEmpId(
    e.target.value
      .trim()
      .toUpperCase()
  )
}
                  style={inputStyle}
                />

              ) : (
                ` ${empId || "-"}`
              )}

            </p>

            {/* PHONE */}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "8px",
              }}
            >

              <strong>Phone:</strong>

              {isEditing ? (

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginLeft: "8px",
                    gap: "8px",
                  }}
                >

                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "bold",
                    }}
                  >
                    +91
                  </span>

                  <input
                    type="text"
                    value={guestPhone}
                    onChange={(e) =>
                      setGuestPhone(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={10}
                    placeholder="xxxxxxxxxx"
                    style={{
                      ...inputStyle,
                      marginLeft: "0px",
                      width: "130px",
                    }}
                  />

                </div>

              ) : (

  guestPhone ? (

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        marginLeft: "8px",
      }}
    >

      <span>
        +91 {guestPhone}
      </span>

     <a
  href={`tel:${guestPhone}`}
  title="Call"
  style={{
    color: "#16a34a",
    display: "flex",
    alignItems: "center",
  }}
>
  <FaPhoneAlt size={14} />
</a>

    <button
  onClick={copyPhone}
  style={{
    border: "none",
    background: "transparent",
    cursor: "pointer",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
  }}
  title="Copy Number"
>
  <MdContentCopy size={16} />
</button>

    </div>

  ) : (

    "-"

  )

)}

            </div>

            <p>

  <strong>Gender:</strong>

  {isEditing ? (

    <select
      value={occupantGender}
      onChange={(e) =>
        setOccupantGender(
          e.target.value
        )
      }
      style={inputStyle}
    >

      <option value="">
        Select
      </option>

      <option value="male">
        Male
      </option>

      <option value="female">
        Female
      </option>

    </select>

  ) : (

    ` ${occupantGender || "-"}`

  )}

</p>

            {/* DEPARTMENT */}

            <p>

              <strong>Department:</strong>

              {isEditing ? (

                <select
                  value={department}
                  onChange={(e) =>
                    setDepartment(
                      e.target.value
                    )
                  }
                  style={{
                    ...inputStyle,
                    width: "180px",
                  }}
                >

                  <option value="">
                    Select
                  </option>

                  <option value="IT">
                    IT
                  </option>

                  <option value="HR">
                    HR
                  </option>

                  <option value="Engineering">
                    Engineering
                  </option>

                  <option value="Housekeeping">
                    Housekeeping
                  </option>

                  <option value="F&B Production">
                    F&B Production
                  </option>

                  <option value="F&B service">
                    F&B Service
                  </option>

                  <option value="Horticulture">
                    Horticulture
                  </option>

                  <option value="KST">
                    KST
                  </option>

                  <option value="Security">
                    Security
                  </option>

                  <option value="Accounts & Finance">
                    Accounts & Finance
                  </option>

                  <option value="FrontOffice">
                    Front Office
                  </option>

                  <option value="Transport">
                    Transport
                  </option>

                  <option value="Juventa">
                    Juventa
                  </option>

                  <option value="Stores">
                    Stores
                  </option>

                  <option value="Sales">
                    Sales
                  </option>

                  <option value="Cafeteria">
                    Cafeteria
                  </option>

                  <option value="Events & Conference">
                    Events & Conference
                  </option>
                    
                    <option value="Audio Visual">
                      Audio Visual
                    </option>

                    <option value="IET">
                      IET
                    </option>
                    <option value="Activities">
                      Activities
                    </option>
                    <option value="HR Facilities">
                      HR Facilities
                    </option>
                    

                </select>

              ) : (
                ` ${department || "-"}`
              )}

            </p>

            {/* PROVIDED AMENITIES */}

            <div
              style={{
                marginTop: "10px",
              }}
            >

              {/* VIEW MODE */}

              {!isEditing && (

                <div>

                  <p className="font-semibold">
                    Provided Amenities:
                  </p>

                  <div
                    className="
                      flex
                      gap-4
                      mt-1
                      text-sm
                      font-medium
                      flex-wrap
                    "
                  >

                    <span
                      className={
                        fan
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      Fan {fan ? "✔" : "✖"}
                    </span>

                    <span
                      className={
                        mattress
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      Mattress {mattress ? "✔" : "✖"}
                    </span>

                    <span
                      className={
                        plywood
                          ? "text-green-600"
                          : "text-red-500"
                      }
                    >
                      Plywood {plywood ? "✔" : "✖"}
                    </span>

                  </div>

                </div>

              )}

              {/* EDIT MODE */}

              {isEditing && (

                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "8px",
                    flexWrap: "wrap",
                  }}
                >

                  <label>

                    <input
                      type="checkbox"
                      checked={fan}
                      onChange={(e) =>
                        setFan(
                          e.target.checked
                        )
                      }
                    />

                    {" "}Fan

                  </label>

                  <label>

                    <input
                      type="checkbox"
                      checked={mattress}
                      onChange={(e) =>
                        setMattress(
                          e.target.checked
                        )
                      }
                    />

                    {" "}Mattress

                  </label>

                  <label>

                    <input
                      type="checkbox"
                      checked={plywood}
                      onChange={(e) =>
                        setPlywood(
                          e.target.checked
                        )
                      }
                    />

                    {" "}Plywood

                  </label>

                </div>

              )}

            </div>

            {/* CHECK IN */}

            <p>

              <strong>Check In:</strong>

              {isEditing ? (

                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) =>
                    setCheckIn(
                      e.target.value
                    )
                  }
                  style={inputStyle}
                />

              ) : (
                ` ${
                  checkIn
                    ? new Date(checkIn)
                        .toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                    : "-"
                }`
              )}

            </p>

          </>

        )}

      {/* UNDER MAINTENANCE */}

{status === "under_maintenance" && (

  <>

    <hr
      style={{
        margin: "10px 0",
      }}
    />

    <h3
      style={{
        marginBottom: "10px",
        fontSize: "16px",
      }}
    >
      Maintenance Details
    </h3>

    {/* VIEW MODE */}

    {!isEditing && (

      <>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "10px",
            fontWeight: "500",
          }}
        >

          <span
            style={{
              color: maintenanceFan
                ? "green"
                : "red",
            }}
          >
            Fan {maintenanceFan ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenanceMattress
                ? "green"
                : "red",
            }}
          >
            Mattress {maintenanceMattress ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenancePlywood
                ? "green"
                : "red",
            }}
          >
            Plywood {maintenancePlywood ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenanceBed
                ? "green"
                : "red",
            }}
          >
            Bed {maintenanceBed ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenanceElectrical
                ? "green"
                : "red",
            }}
          >
            Electrical {maintenanceElectrical ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenanceCleaning
                ? "green"
                : "red",
            }}
          >
            Cleaning {maintenanceCleaning ? "✔" : "✖"}
          </span>

          <span
            style={{
              color: maintenanceOthers
                ? "green"
                : "red",
            }}
          >
            Others {maintenanceOthers ? "✔" : "✖"}
          </span>

        </div>

        {/* COMMENTS */}

        <div
          style={{
            marginTop: "12px",
            wordBreak: "break-word",
            overflowWrap: "break-word",
            whiteSpace: "pre-wrap",
          }}
        >

          <strong>
            Comments:
          </strong>

          <p
            style={{
              marginTop: "4px",
              color: "#444",
            }}
          >
            {maintenanceComment || "-"}
          </p>

        </div>

      </>

    )}

    {/* EDIT MODE */}

    {isEditing && (

      <>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "10px",
          }}
        >

          <label>

            <input
              type="checkbox"
              checked={maintenanceFan}
              onChange={(e) =>
                setMaintenanceFan(
                  e.target.checked
                )
              }
            />

            {" "}Fan

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenanceMattress}
              onChange={(e) =>
                setMaintenanceMattress(
                  e.target.checked
                )
              }
            />

            {" "}Mattress

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenancePlywood}
              onChange={(e) =>
                setMaintenancePlywood(
                  e.target.checked
                )
              }
            />

            {" "}Plywood

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenanceBed}
              onChange={(e) =>
                setMaintenanceBed(
                  e.target.checked
                )
              }
            />

            {" "}Bed

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenanceElectrical}
              onChange={(e) =>
                setMaintenanceElectrical(
                  e.target.checked
                )
              }
            />

            {" "}Electrical

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenanceCleaning}
              onChange={(e) =>
                setMaintenanceCleaning(
                  e.target.checked
                )
              }
            />

            {" "}Cleaning

          </label>


          <label>

            <input
              type="checkbox"
              checked={maintenanceOthers}
              onChange={(e) =>
                setMaintenanceOthers(
                  e.target.checked
                )
              }
            />

            {" "}Others

          </label>

        </div>

        {/* COMMENT BOX */}

        <textarea

          value={maintenanceComment}

          onChange={(e) =>
            setMaintenanceComment(
              e.target.value
            )
          }

          placeholder="
            Maintenance comments...
          "

          style={{
            width: "100%",
            marginTop: "12px",
            padding: "8px",
            minHeight: "80px",
            resize: "none",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

      </>

    )}

  </>

)}

        {/* BUTTONS */}

        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >

          {/* EDIT / SAVE */}

          {isEditing ? (

            <button
              onClick={handleSave}
              style={{
                ...buttonStyle,
                background: "#2563eb",
              }}
            >
              Save
            </button>

          ) : (

            <button
              onClick={() =>
                setIsEditing(true)
              }
              style={{
                ...buttonStyle,
                background: "#f59e0b",
              }}
            >
              Edit
            </button>

          )}

          {/* DELETE */}

          {isAdmin && (

            <button
              onClick={() =>
                deleteBed(bed.id)
              }
              style={{
                ...buttonStyle,
                background: "#dc2626",
              }}
            >
              Delete
            </button>

          )}

          <button
  onClick={handlePrint}
  style={{
    ...buttonStyle,
    background: "#059669",
  }}
>
  Print
</button>

          {/* CLOSE */}

          <button
            onClick={closeModal}
            style={{
              ...buttonStyle,
              background: "#111827",
            }}
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modalStyle = {
  background: "white",
  padding: "15px",
  borderRadius: "10px",
  width: "320px",
  fontSize: "14px",
};

const buttonStyle = {
  padding: "6px 10px",
  border: "none",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "13px",
};

const inputStyle = {
  marginLeft: "8px",
  padding: "3px",
  fontSize: "13px",
};

export default BedModal;