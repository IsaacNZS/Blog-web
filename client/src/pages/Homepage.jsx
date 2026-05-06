import { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Detailpage from "./Detailpage";
import { useContext } from "react";
import { UserContext } from "../../Context";

const Homepage = () => {
  const { allpost, setAllpost } = useContext(UserContext);
  const user = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/user/posts`);
      if (!res.ok) {
        return alert("Somgthing Wrong!");
      }
      const data = await res.json();
      setAllpost(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    user();
  }, []);
  return (
    <>
      {allpost.map((page) => (
        <PostItem post={page} key={page._id} />
      ))}
    </>
  );
};

export default Homepage;
