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

  const [guestPhone, setGuestPhone] = useState(
    bed.guest?.phone || ""
  );

  const [checkIn, setCheckIn] = useState(
    bed.guest?.checkIn || ""
  );

  if (!bed) return null;

  const handleSave = () => {

    const updatedBed = {
      ...bed,

      guest: {
        name: guestName,
        phone: guestPhone,
        checkIn: checkIn,
      },
    };

    updateBed(updatedBed);

    setIsEditing(false);
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>

        <h2>{bed.bedNumber}</h2>

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
          <strong>Status:</strong> {bed.status}
        </p>

        {/* GUEST DETAILS */}

        <hr style={{ margin: "15px 0" }} />

        <h3>Guest Details</h3>

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

        {/* PHONE */}

        <p>
          <strong>Phone:</strong>

          {isEditing ? (
            <input
              type="text"
              value={guestPhone}
              onChange={(e) =>
                setGuestPhone(e.target.value)
              }
              style={inputStyle}
            />
          ) : (
            ` ${guestPhone || "-"}`
          )}
        </p>

        {/* CHECKIN */}

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
            ` ${checkIn || "-"}`
          )}
        </p>

        {/* BUTTONS */}

        <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
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
  padding: "25px",
  borderRadius: "12px",
  width: "400px",
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
};

const inputStyle = {
  marginLeft: "10px",
  padding: "5px",
};

export default BedModal;