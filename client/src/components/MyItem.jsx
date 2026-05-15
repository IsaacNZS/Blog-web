import { Link } from "react-router-dom";

const MyItem = ({ post, loading }) => {
  return (
    <div>
      <div className="flex bg-[#262626] py-1 px-3 rounded-[10px] flex-col mb-4">
        <Link
          to={`/post/${post._id}`}
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
              className="w-full my-3 h-48 sm:h-64 object-cover"
              src={post.img}
              alt=""
            />
            <p className="text-white text-justify">{post.des.slice(0, 200)}</p>
            <p className="text-blue-500">Read More...</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default MyItem;
