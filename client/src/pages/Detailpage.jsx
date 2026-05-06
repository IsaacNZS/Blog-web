import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../Context";

const Detailpage = ({}) => {
  const navigate = useNavigate();
  const [allpost, setAllpost] = useState([]);
  const { userInfo } = useContext(UserContext);
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
    return <p>Loading...</p>;
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
    <div className="flex flex-col mb-4">
      <div className="mb-2">
        <div className="flex justify-between">
          <div>
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <p className="text-gray-500">
              <span>{post.author}</span> |{" "}
              {new Date(post.time).toLocaleString()}
            </p>
          </div>
          <Link to={"/"} replace>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </Link>
        </div>

        <img className="w-full my-3 h-auto " src={post.img} alt="" />
        <p className="text-justify">{post.des}</p>
      </div>
      {post.author === userInfo.name && (
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
  );
};

export default Detailpage;
