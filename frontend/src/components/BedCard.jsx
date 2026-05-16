function BedCard({ bed, onClick }) {

  return (

    <div
      onClick={() => onClick(bed)}
      className={`
        cursor-pointer
        rounded-xl
        border
        p-4
        text-center
        shadow-sm
        transition-all
        duration-300
        hover:scale-105

        ${
          bed.status === "available"
            ? "bg-green-50 border-green-300"
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
        text-2xl
        font-bold
        text-black
      ">
        {bed.bed_number}
      </h2>

      {/* STATUS */}

      <p
        className={`
          mt-2
          text-lg
          font-medium

          ${
            bed.status === "available"
              ? "text-green-700"
              : "text-red-600"
          }
        `}
      >
        {bed.status}
      </p>

      {/* LOCATION */}

      <p
        className={`
          mt-2
          text-sm
          font-medium

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