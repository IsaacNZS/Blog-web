import { Link } from "react-router-dom";

const PostItem = ({ post, loading }) => {
  return (
    <div className=" flex bg-[#262626] py-1 px-2 rounded-[5px] flex-col mb-4">
      {loading && (
        <img src="/loading.gif" className="w-16 h-16 mx-auto" alt="Loading" />
      )}
      <Link to={`/post/${post._id}`}>
        <div className="mb-2">
          <h1 className="text-2xl text-white font-bold">{post.title}</h1>
          <p className="text-gray-500">
            <span>{post.author}</span> | {new Date(post.time).toLocaleString()}
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
  );
};

export default PostItem;
