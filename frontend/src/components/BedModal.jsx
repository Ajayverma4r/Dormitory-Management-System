import toast from "react-hot-toast";
import { useState } from "react";

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

    await updateBed(updatedBed);

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
          {bed.bed_number}
        </h2>

        {/* BED DETAILS */}

        <p>
          <strong>Hall:</strong> {bed.room}
        </p>

        <p>
          <strong>Floor:</strong> {bed.floor}
        </p>

        <p>
          <strong>Location:</strong> {bed.location}
        </p>

        {/* STATUS */}

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

              <option value="occupied">Occupied</option>
              <option value="under_maintenance">
  Under Maintenance
</option>

            </select>

          ) : (
            ` ${status}`
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
                    placeholder="xxxxxxxxxx"
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

                  <option value="Maintenance">
                    Maintenance
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