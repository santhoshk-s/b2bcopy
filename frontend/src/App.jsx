import { Outlet, useLocation } from "react-router-dom";
import Navigation from "./pages/Auth/Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const location = useLocation();

  // Check if the current path is login or register
  const hideNavigation =
    location.pathname === "/login" || location.pathname === "/register" || location.pathname==='/chat';

  return (
    <>
      <ToastContainer style={{ zIndex: 99999 }} />
      {!hideNavigation && <Navigation />} {/* Conditionally render Navigation */}
      <main className="">
        <Outlet />
      </main>
    </>
  );
};

export default App;
