import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../Context";

const MyItem = ({ post, loading }) => {
  const { userInfo } = useContext(UserContext);
  const [like, setlike] = useState();
  const [react, setreact] = useState([]);

  const get = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/react/post/${post._id}`,
      );
      const data = await res.json();
      setreact(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    get();
  }, []);

  const add = async (type) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/react/user/${userInfo.id}/post/${post._id}`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: type,
          }),
        },
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const del = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/react/delete/${react[0]._id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );
      const data = await res.json();
    } catch (err) {
      console.log(err);
    }
  };

  const controller = () => {
    if (react.length === 0) {
      if (like) {
        add("Like");
        setTimeout(() => {
          get();
        }, 50);
      } else {
        add("Heart");
        setTimeout(() => {
          get();
        }, 50);
      }
    } else {
      del();
      setTimeout(() => {
        get();
      }, 50);
    }
  };
  return (
    <>
      <div className="flex shadow-lg shadow-indigo-500/50 bg-[#262626] py-1 px-3 rounded-[10px] mb-4 flex-col">
        <Link
          to={`/user/${userInfo ? userInfo.id : ""}/post/${post._id}`}
          onClick={() => {
            sessionStorage.setItem("scrollPosition", window.scrollY);
          }}
        >
          <div className="mb-2">
            <h1 className="text-2xl text-white font-bold">{post.title}</h1>
            <p className="text-gray-500">
              <span>{post.author}</span> |{" "}
              {new Date(post.time).toLocaleString()}
            </p>
            <img
              className="w-full shadow-lg shadow-white/20 my-3 h-48 sm:h-64 object-cover"
              src={post.img}
              alt=""
            />
            <p className="text-white text-justify">{post.des.slice(0, 200)}</p>
            <p className="text-blue-500">Read More...</p>
          </div>
        </Link>
        <div className="flex justify-between">
          {" "}
          <Link
            to={`/user/${userInfo ? userInfo.id : ""}/post/${post._id}`}
            className="text-[#ab7d09] ml-1 text-[20px]"
          >
            <i className="fa-solid fa-comment-dots">
              <span> x {post.commentCount}</span>
            </i>
          </Link>
          {react.length === 0 ? (
            <i
              onClick={() => {
                (controller(), setlike(false));
              }}
              className="fa-solid text-[23px] text-[#514d4d] fa-heart"
            >
              <span className="text-[20px] text-amber-200">
                {" "}
                x {react.length}
              </span>
            </i>
          ) : (
            <i
              onClick={() => {
                (controller(), setlike(false));
              }}
              className="fa-solid text-[23px] text-red-500 fa-heart"
            >
              <span className="text-[20px] text-amber-200">
                {" "}
                x {react.length}
              </span>
            </i>
          )}
          {/* <i
          onClick={() => {
            (controller(), setlike(true));
          }}
          className="fa-solid text-[23px] text-amber-400 fa-thumbs-up"
        >
          <span className="text-[20px] text-amber-200"> x {react.length}</span>
        </i> */}
        </div>
      </div>
    </>
  );
};

export default MyItem;
