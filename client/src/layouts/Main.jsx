import Navbar from "../components/Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";

function Main() {
  return (
    <div>
      <Navbar />

      <section className="px-3 pt-23 min-h-screen">
        <ScrollRestoration />
        <Outlet />
      </section>
    </div>
  );
}

export default Main;
