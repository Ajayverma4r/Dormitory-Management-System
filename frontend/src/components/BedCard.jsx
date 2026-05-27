function BedCard({ bed, onClick }) {

  const statusColors = {

    available:
      "border-green-200 bg-green-50/80",

    occupied:
      "border-red-200 bg-red-50/80",

    under_maintenance:
      "border-yellow-200 bg-yellow-50/80",
  };

  const statusTextColors = {

    available:
      "text-green-700",

    occupied:
      "text-red-700",

    under_maintenance:
      "text-yellow-700",
  };

  return (

    <div

      onClick={() => onClick(bed)}

      className={`

        cursor-pointer

        rounded-2xl

        border

        p-3

        shadow-sm

        backdrop-blur-lg

        transition-all

        duration-300

        hover:shadow-lg

        hover:-translate-y-1

        min-h-[120px]

        flex

        flex-col

        justify-between

        ${statusColors[bed.status]}
      `}
    >

      {/* TOP */}

      <div className="
        flex
        justify-between
        items-start
      ">

        {/* BED NUMBER */}

        <h2 className="
          text-lg
          font-bold
          text-gray-800
        ">
          {bed.bed_number}
        </h2>

        {/* STATUS DOT */}

        <div className={`
          w-3
          h-3
          rounded-full

          ${
            bed.status === "available"

              ? "bg-green-500"

              : bed.status ===
                "under_maintenance"

              ? "bg-yellow-400"

              : "bg-red-500"
          }
        `} />

      </div>

      {/* ROOM/FLOOR */}

      <div className="
        mt-2
        space-y-1
      ">

        <p className="
          text-sm
          text-gray-700
          font-medium
        ">

          {bed.room}

          {" • "}

          {bed.floor}

        </p>

        <p className={`
          text-xs
          font-semibold
          uppercase

          ${statusTextColors[bed.status]}
        `}>

          {bed.status.replace(
            "_",
            " "
          )}

        </p>

      </div>

      {/* LOCATION */}

      <div className="
        mt-3
        flex
        justify-between
        items-center
      ">

        <span className={`
          text-xs
          px-2
          py-1
          rounded-full
          font-medium

          ${
            bed.location === "inside"

              ? "bg-blue-100 text-blue-700"

              : "bg-orange-100 text-orange-700"
          }
        `}>

          {bed.location}

        </span>

        {/* GUEST */}

        {bed.guest?.name && (

          <span className="
            text-xs
            text-gray-500
            truncate
            max-w-[90px]
          ">

            {bed.guest.name}

          </span>

        )}

      </div>

    </div>
  );
}

export default BedCard;