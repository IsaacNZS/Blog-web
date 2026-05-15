import { useState, useEffect } from "react";
import MyItem from "../components/MyItem";
import { useParams } from "react-router-dom";
import { socket } from "../socket";
import { useContext } from "react";
import { UserContext } from "../../Context";

const Myprofile = () => {
  const [allpost, setAllpost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const { name } = useParams();
  const { onlineUsers } = useContext(UserContext);
  const isOnline = onlineUsers.includes(allpost[0]?.author);

  const user = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_URL}/user/myitem/${name}`,
        {
          credentials: "include",
        },
      );
      if (!res.ok) {
        return alert("Something Wrong!");
      }
      const data = await res.json();
      setAllpost(data.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    user();
  }, []);

  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");

    if (scrollPosition && allpost.length > 0) {
      requestAnimationFrame(() => {
        window.scrollTo({
          top: Number(scrollPosition),
          behavior: "instant",
        });
      });
    }
  }, [allpost]);

  const profile = allpost.find(
    (p) =>
      p.title === "PROFILE" || p.title === "Profile" || p.title === "profile",
  );

  return (
    <>
      {loading && (
        <img
          src="/loading.gif"
          alt="Loading..."
          className="w-20 h-20 mx-auto"
        />
      )}
      <div className="flex border-b border-[#dacca8] pb-4 sm:flex-row items-center mb-4">
        <div className="flex relative">
          <img
            className="w-25 h-25 border-2 border-[#dacca8] rounded-full mr-2"
            src={profile?.img}
            alt=""
            onClick={() => setOpenImg(true)}
          />
          {isOnline ? (
            <span className=" absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-2 border-black rounded-full"></span>
          ) : (
            <span className="absolute bottom-1 right-2 w-6 h-6 bg-gray-500 border-2 border-black rounded-full"></span>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-2xl ml-5 text-[#dacca8] mb-3 font-semibold">
            Name : {allpost[0]?.author}
          </p>
          <p className="text-[#bcbea9] ml-5">ID: {allpost[0]?._id}</p>
        </div>
        {openImg && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            onClick={() => setOpenImg(false)}
          >
            <img
              src={profile?.img}
              alt=""
              className="max-w-[90%] max-h-[90%]"
            />
          </div>
        )}
      </div>
      {allpost.map((page) => (
        <MyItem post={page} key={page._id} loading={loading} />
      ))}
    </>
  );
};

export default Myprofile;
