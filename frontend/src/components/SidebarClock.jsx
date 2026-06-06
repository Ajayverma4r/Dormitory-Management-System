import { useEffect, useState } from "react";

function SidebarClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
  <div className="
    text-center
    py-3
    mx-4
    border-t
    border-white/10
  ">

    <p className="
      text-[10px]
      uppercase
      tracking-widest
      text-gray-500
      mb-2
    ">
      Today
    </p>

    <div className="
      text-lg
      font-semibold
      text-white
    ">
      {now.toLocaleTimeString(
        "en-IN",
        {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }
      ).toUpperCase()}
    </div>

    <div className="
      text-xs
      text-gray-400
      mt-1
    ">
      {now.toLocaleDateString(
        "en-IN",
        {
          weekday: "long",
        }
      )}
    </div>

    <div className="
      text-xs
      text-gray-500
    ">
      {now.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      )}
    </div>

  </div>
);
}

export default SidebarClock;