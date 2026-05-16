import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context";
import Comment from "../components/Comment";

const Detailpage = ({}) => {
  const navigate = useNavigate();
  const [allpost, setAllpost] = useState([]);
  const { userInfo } = useContext(UserContext);
  const [openImg, setOpenImg] = useState(false);
  const { id } = useParams();

  const fetchPosts = async () => {
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
    fetchPosts();
  }, []);

  if (allpost.length === 0) {
    return (
      <img src="/loading.gif" className="w-16 h-16 mx-auto" alt="Loading" />
    );
  }
  const post = allpost.find((p) => p._id === id);
  const deletePost = async () => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!isConfirm) return;
    const res = await fetch(
      `${import.meta.env.VITE_URL}/user/posts-edit/${id}`,
      {
        credentials: "include",
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (res.ok) {
      navigate("/");
      alert(data.msg);
    } else {
      alert(data.msg);
    }
  };

  return (
    <>
      <div className="flex bg-[#262626] py-1 px-3 rounded-[5px] flex-col mb-4">
        <div className="mb-2">
          <div className="flex justify-between">
            <div>
              <h1 className="text-3xl text-white font-bold">{post.title}</h1>
              <p className="text-gray-500">
                <span>{post.author}</span> |{" "}
                {new Date(post.time).toLocaleString()}
              </p>
            </div>
            <button onClick={() => navigate(-1)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-white size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </button>
          </div>

          <img
            className="w-full my-3 h-auto "
            src={post.img}
            alt=""
            onClick={() => setOpenImg(true)}
          />
          <p className="text-white text-justify">{post.des}</p>
          {openImg && (
            <div
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
              onClick={() => setOpenImg(false)}
            >
              <img src={post.img} alt="" className="max-w-[90%] max-h-[90%]" />
            </div>
          )}
        </div>
        {userInfo?.name === post.author && (
          <div className="flex justify-end gap-10">
            <Link
              to={`/edit/${post._id}`}
              className="bg-black text-white rounded-[5px] px-5 py-1"
            >
              Edit
            </Link>
            <button
              onClick={deletePost}
              className="bg-black text-white rounded-[5px] px-5 py-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <Comment />
    </>
  );
};

export default Detailpage;
