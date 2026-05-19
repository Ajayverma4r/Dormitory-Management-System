import toast from "react-hot-toast";
import { useState } from "react";

function BedModal({
  bed,
  closeModal,
  deleteBed,
  updateBed,
}) {

  const [isEditing, setIsEditing] = useState(false);

  const [guestName, setGuestName] = useState(
    bed.guest?.name || ""
  );

  const [empId, setEmpId] = useState(
  bed.guest?.empId || ""
  );

  const [guestPhone, setGuestPhone] = useState(
    bed.guest?.phone || ""
  );

  const [checkIn, setCheckIn] = useState(
    bed.guest?.checkIn || ""
  );

  const [status, setStatus] = useState(
    bed.status || "available"
  );

  if (!bed) return null;

  const handleSave = () => {

  // VALIDATION
  if (
  guestPhone &&
  guestPhone.length !== 10
 ) {

  toast.error(
    "Please enter correct phone number"
  );

  return;
}

  if (
    status === "occupied" &&
    (
      !guestName ||
      !empId ||
      !guestPhone ||
      !checkIn
    )
  ) {

    toast.error(
      "Please fill all guest details for occupied bed"
    );

    return;
  }

  const updatedBed = {
    ...bed,
    status: status,

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

  updateBed(updatedBed);

  setIsEditing(false);
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
          {bed.bedNumber}
        </h2>

        {/* BED DETAILS */}

        <p>
          <strong>Room:</strong> {bed.room}
        </p>

        <p>
          <strong>Floor:</strong> {bed.floor}
        </p>

        <p>
          <strong>Location:</strong> {bed.location}
        </p>

        <p>
          <strong>Status:</strong>

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

            </select>

          ) : (
            ` ${bed.status}`
          )}

        </p>

        

       {/* GUEST DETAILS */}

       

{status === "occupied" && (

  <>

    <hr style={{ margin: "10px 0" }} />

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
            setGuestName(e.target.value)
          }
          style={inputStyle}
        />

      ) : (
        ` ${guestName || "No Guest"}`
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
          e.target.value.toUpperCase()
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
        placeholder="xxxxxxxxxxx"
        style={{
          ...inputStyle,
          marginLeft: "0px",
          width: "130px",
        }}
      />

    </div>

  ) : (

    guestPhone
      ? ` +91 ${guestPhone}`
      : "-"

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
            setCheckIn(e.target.value)
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

          <button
            onClick={() => deleteBed(bed.id)}
            style={{
              ...buttonStyle,
              background: "#dc2626",
            }}
          >
            Delete
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