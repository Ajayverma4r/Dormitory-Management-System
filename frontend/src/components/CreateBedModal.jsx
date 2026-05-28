function CreateBedModal({
  isOpen,
  closeModal,
  children,
}) {

  if (!isOpen) return null;

  return (

    <div className="
      fixed
inset-0
bg-black/50
flex
items-center
z-50
p-4
pl-[280px]
justify-center
    ">

      <div className="
        bg-white/80
        backdrop-blur-xl
        rounded-2xl
        shadow-2xl
        border
        border-white/40
        w-full
       max-w-3xl
        p-6
        relative
      ">

        {/* HEADER */}

        <div className="
          flex
          items-center
          justify-between
          mb-6
        ">

          <h2 className="
            text-2xl
            font-bold
          ">
            Add New Bed
          </h2>

          <button
            onClick={closeModal}
            className="
              text-gray-500
              hover:text-black
              text-2xl
            "
          >
            ×
          </button>

        </div>

        {/* BODY */}

       {children}

      </div>

    </div>
  );
}

export default CreateBedModal;