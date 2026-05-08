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
      {loading && <p>Post Loading...</p>}
      <div className="flex sm:flex-row items-center mb-4">
        <div className="flex relative">
          <img
            className="w-25 h-25 rounded-full mr-2"
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
        <p className="text-2xl mb-3 font-semibold">
          Name : {allpost[0]?.author}
        </p>
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
