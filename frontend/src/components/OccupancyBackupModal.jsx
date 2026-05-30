function OccupancyBackupModal({
  isOpen,
  onClose,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onDownload,
}) {

  if (!isOpen) return null;

  return (

    <div className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
    ">

      <div className="
        bg-white
        rounded-2xl
        p-6
        w-full
        max-w-md
        shadow-xl
      ">

        <h2 className="
          text-xl
          font-bold
          mb-5
          text-center
        ">
          Occupancy Backup
        </h2>

        <div className="mb-4">

          <label className="
            block
            mb-2
            font-medium
          ">
            From Date
          </label>

          <input
            type="date"
            value={fromDate}
            onChange={(e) =>
              setFromDate(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          />

        </div>

        <div className="mb-5">

          <label className="
            block
            mb-2
            font-medium
          ">
            To Date
          </label>

          <input
            type="date"
            value={toDate}
            onChange={(e) =>
              setToDate(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              px-3
              py-2
            "
          />

        </div>

        <div className="
          flex
          justify-end
          gap-3
        ">

          <button
            onClick={onClose}
            className="
              px-4
              py-2
              rounded-xl
              bg-gray-300
            "
          >
            Cancel
          </button>

          <button
            onClick={onDownload}
            className="
              px-4
              py-2
              rounded-xl
              bg-green-600
              text-white
            "
          >
            Download Backup
          </button>

        </div>

      </div>

    </div>

  );
}

export default OccupancyBackupModal;