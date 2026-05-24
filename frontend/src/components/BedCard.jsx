function BedCard({ bed, onClick }) {

  return (

    <div
      onClick={() => onClick(bed)}
      className={`
        cursor-pointer
        rounded-md
        border
        p-1
        text-center
        shadow-sm
        transition-all
        duration-200

       ${
  bed.status === "available"

    ? "bg-green-50 border-green-300"

    : bed.status === "under_maintenance"

    ? "bg-yellow-50 border-yellow-400"

    : "bg-red-50 border-red-300"
}

        ${
          bed.location === "outside"
            ? "bg-orange-50 border-orange-300"
            : ""
        }
      `}
    >

      {/* BED NUMBER */}

      <h2 className="
        text-sm
        font-semibold
        text-black
        leading-tight
      ">
        {bed.bed_number}
      </h2>

      {/* STATUS */}

      <p
        className={`
          mt-0.5
          text-[10px]
          font-normal

         ${
  bed.status === "available"

    ? "text-green-700"

    : bed.status === "under_maintenance"

    ? "text-yellow-600"

    : "text-red-600"
}
        `}
      >
        {bed.status}
      </p>

      {/* LOCATION */}

      <p
        className={`
          mt-0.5
          text-[10px]
          font-normal

          ${
            bed.location === "inside"
              ? "text-blue-600"
              : "text-orange-500"
          }
        `}
      >
        {bed.location}
      </p>

    </div>
  );
}

export default BedCard;