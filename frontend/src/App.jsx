import AppRoutes from "./routes/AppRoutes";

import { Toaster } from "react-hot-toast";

import { useEffect } from "react";

function App() {

  useEffect(() => {

  let timeout;

  // LOGOUT FUNCTION

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    window.location.href = "/";
  };

  // RESET TIMER

  const resetTimer = () => {

    clearTimeout(timeout);

    timeout = setTimeout(

      logout,

      60 * 60 * 1000
      // 15 MINUTES
    );
  };

  // EVENTS

  window.addEventListener(
    "mousemove",
    resetTimer
  );

  window.addEventListener(
    "keydown",
    resetTimer
  );

  window.addEventListener(
    "click",
    resetTimer
  );

  // START TIMER

  resetTimer();

  // CLEANUP

  return () => {

    clearTimeout(timeout);

    window.removeEventListener(
      "mousemove",
      resetTimer
    );

    window.removeEventListener(
      "keydown",
      resetTimer
    );

    window.removeEventListener(
      "click",
      resetTimer
    );
  };

}, []);

  return (

    <>

      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <AppRoutes />

    </>

  );
}

export default App;