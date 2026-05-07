import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <Navbar />
      <section className="px-7 pt-23 min-h-screen">
        <Outlet />
      </section>
    </div>
  );
}

export default Main;
