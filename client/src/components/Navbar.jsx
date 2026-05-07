import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context";

function Navbar() {
  const { userInfo, setUserInfo } = useContext(UserContext);
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
    <nav className="flex items-center justify-between pb-5 pt-2 px-2 sm:p-7">
      <div className="flex gap-1">
        <img
          src="/public/logo-removebg-preview.png"
          className="w-16 h-16"
          alt=""
        />
        <div className="flex flex-col gap-1">
          <Link to={"/"} className="text-3xl font-bold sm:text-5xl">
            Isaac.zls
          </Link>
          <p className="text-sm font-bold sm:text-lg">
            Welcome - {userInfo ? userInfo.name : "Guest"}
          </p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-2 sm:gap-7">
        {userInfo ? (
          <>
            <Link
              to={"/post-create"}
              className="border-2 text-[11px] sm:text-lg px-2 py-1 text-white text-nowrap bg-black rounded-[5px]"
            >
              Create Post
            </Link>
            <Link
              onClick={logout}
              className="border-2 text-[10px] sm:text-lg px-3 py-[2.5px] rounded-[5px]"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to={"/auth?mode=login"}
              className="border-2 text-[10px] sm:text-lg px-3 py-1 text-white bg-black rounded-[5px]"
            >
              Login
            </Link>
            <Link
              to={"/auth?mode=register"}
              className="border-2 text-[10px] sm:text-lg px-3 py-[2.5px] rounded-[5px]"
            >
              Registor
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
