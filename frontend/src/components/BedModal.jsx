function BedModal({ bed, closeModal, deleteBed }) {

  if (!bed) return null;

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

        {bed.guest ? (
          <>
            <p>
              <strong>Guest:</strong> {bed.guest.name}
            </p>

            <p>
              <strong>Phone:</strong> {bed.guest.phone}
            </p>

            <p>
              <strong>Check In:</strong> {bed.guest.checkIn}
            </p>
          </>
        ) : (
          <p>No Guest Assigned</p>
        )}

        <div style={{
          display: "flex",
          gap: "10px",
          marginTop: "20px"
        }}>

          <button
            onClick={() => deleteBed(bed.id)}
            style={{
              ...buttonStyle,
              background: "#dc2626",
            }}
          >
            Delete
          </button>

          <button
            onClick={closeModal}
            style={buttonStyle}
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
  width: "350px",
};

const buttonStyle = {
  padding: "10px 15px",
  border: "none",
  background: "#111827",
  color: "white",
  cursor: "pointer",
  borderRadius: "5px",
};

export default BedModal;