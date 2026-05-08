import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        // down scroll
        setShow(false);
      } else {
        // up scroll
        setShow(true);
      }

      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScroll]);

  const getUserData = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/user/profile`, {
      credentials: "include",
    });
    if (res.ok) {
      const userData = await res.json();
      setUserInfo(userData);
    } else {
      alert("Please Login or Register Account!");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    const isConfirm = window.confirm("Are you sure you want to logout?");

    if (!isConfirm) return;
    const res = await fetch(`${import.meta.env.VITE_URL}/user/logout`, {
      credentials: "include",
      method: "POST",
    });
    const data = await res.json();
    alert(data.msg);
    setUserInfo(null);
  };

  return (
    <nav
      className={`fixed w-full z-50 flex bg-[#f2fcfe] items-center justify-between p-2 sm:p-7 transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex gap-1">
        <img src="/logo-removebg-preview.png" className="w-16 h-16" alt="" />
        <div className="flex flex-col gap-1">
          <Link
            to={"/"}
            className="text-3xl font-bold text-[#ab7d09] sm:text-5xl"
          >
            Isaac.zls
          </Link>
          <Link
            to={userInfo ? `/my-profile/${userInfo.name}` : "/auth?mode=login"}
            className="text-sm font-bold sm:text-lg"
          >
            Welcome - {userInfo ? userInfo.name : "Guest"}
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 sm:gap-7">
        {userInfo ? (
          <>
            <Link to="/search">
              <i className="fa-solid text-[#ab7d09] fa-magnifying-glass"></i>
            </Link>
            <Link
              to={"/post-create"}
              className=" text-[11px] font-bold sm:text-lg px-2 py-1 text-nowrap text-[#ab7d09] bg-black rounded-[5px]"
            >
              Create Post
            </Link>
            <Link
              onClick={logout}
              className="border-2 text-[10px] font-bold text-[#ab7d09] sm:text-lg px-3 py-[2.5px] rounded-[5px]"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/auth?mode=login"}
              className=" text-[11px] font-bold sm:text-lg px-3 py-1 text-[#ab7d09] bg-black rounded-[5px]"
            >
              Login
            </Link>
            <Link
              to={"/auth?mode=register"}
              className="border-2 text-[10px] font-bold text-[#ab7d09] sm:text-lg px-3 py-[2.5px] rounded-[5px]"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
