import { Link } from "react-router-dom";

const PostItem = ({ post, loading }) => {
  return (
    <div className="flex flex-col mb-4">
      {loading && <p>Post Loading...</p>}
      <Link to={`/post/${post._id}`}>
        <div className="mb-2">
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-gray-500">
            <span>{post.author}</span> | {new Date(post.time).toLocaleString()}
          </p>
          <img
            className="w-full my-3 h-48 sm:h-64 object-cover"
            src={post.img}
            alt=""
          />
          <p className="text-justify">{post.des.slice(0, 200)}</p>
          <p className="text-blue-500 underline">Read Full Artical...</p>
        </div>
      </Link>
    </div>
  );
};

export default PostItem;
