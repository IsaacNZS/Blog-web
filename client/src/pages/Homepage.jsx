import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Detailpage from "./Detailpage";
import { useContext } from "react";
import { UserContext } from "../../Context";
import { socket } from "../socket";

const Homepage = () => {
  const { allpost, setAllpost, online, setOnline } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });

    socket.on("disconnect", () => {
      setOnline(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const user = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_URL}/user/posts`);
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
  return (
    <>
      {allpost.map((page) => (
        <PostItem post={page} key={page._id} loading={loading} />
      ))}
    </>
  );
};

export default Homepage;
