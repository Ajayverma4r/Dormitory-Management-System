function BedCard({ bed, onClick }) {

  const handleClick = () => {
    onClick(bed);
  };

  return (
    <div
      onClick={handleClick}
      className={`
        p-6
        rounded-xl
        text-white
        text-center
        font-bold
        cursor-pointer
        shadow-lg
        transition
        hover:scale-105
        ${bed.status === "occupied"
          ? "bg-red-500"
          : "bg-green-500"}
      `}
    >
      <h2 className="text-xl">
        {bed.bedNumber}
      </h2>

      <p className="mt-2 text-sm">
        {bed.status}
      </p>
    </div>
  );
}

export default BedCard;