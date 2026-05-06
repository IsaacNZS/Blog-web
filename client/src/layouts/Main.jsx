import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function Main() {
  return (
    <div>
      <Navbar />
      <section className="px-7">
        <Outlet />
      </section>
    </div>
  );
}

export default Main;
