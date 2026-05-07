import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../Context";

const Editform = ({ uiTitle, uiBtn }) => {
  const [title, setTitle] = useState();
  const [img, setImg] = useState();
  const [des, setDes] = useState();
  const [loading, setLoading] = useState(false);
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (uiTitle == "Edit Your Post Here!") {
      getpost();
    }
  }, []);

  const createpost = async () => {
    try {
      setLoading(true);

      const formData = new FormData();

      if (!img) {
        alert("Please select image");
        setLoading(false);
        return;
      }

      formData.append(
        "data",
        JSON.stringify({
          title,
          des,
        }),
      );

      formData.append("file", img);

      const res = await fetch(
        `${import.meta.env.VITE_URL}/user/post/${userInfo?.id}`,
        {
          credentials: "include",
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();

      if (res.ok) {
        alert(data.msg);
        navigate("/");
      } else {
        alert(data.msg);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getpost = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_URL}/user/posts-edit/${id}`,
    );
    const data = await res.json();
    if (res.ok) {
      setTitle(data.result.title);
      setDes(data.result.des);
    } else {
      alert(data.msg);
    }
  };

  const updatePost = async () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title,
        des,
      }),
    );
    if (img) {
      formData.append("file", img);
    } else {
      alert("Please upload a new image to update your post!");
      return;
    }

    const res = await fetch(
      `${import.meta.env.VITE_URL}/user/posts-edit/${id}`,
      {
        credentials: "include",
        method: "PUT",
        body: formData,
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

  const uploadPost = async (e) => {
    e.preventDefault();
    if (uiTitle == "Edit Your Post Here!") {
      updatePost();
    } else {
      createpost();
    }
  };
  return (
    <section className="w-[96%] sm:w-1/2 mx-auto">
      <h1 className="text-2xl mt-5 font-bold">{uiTitle}</h1>
      <br />
      <form onSubmit={uploadPost} method="POST">
        <div className="flex flex-col gap-1">
          <label className=" font-bold" htmlFor="title">
            Enter Post Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border-2 px-3 py-1"
            value={title || ""}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label className=" font-bold">Upload Cover Photo</label>
          <input
            type="file"
            className="px-4 py-2 font-bold border bg-black text-white rounded-[5px]"
            onChange={(e) => {
              setImg(e.target.files[0]);
            }}
          />
          <textarea
            type="text"
            placeholder="Type About Photo/Video"
            className="border-2 h-64 px-4 mt-4"
            value={des || ""}
            onChange={(e) => {
              setDes(e.target.value);
            }}
          />
          <button
            className="border-2 w-full bg-black text-white px-3 text-center py-1"
            disabled={loading}
          >
            {loading ? "Uploading..." : uiBtn}
          </button>
        </div>
      </form>
      <br />
    </section>
  );
};

export default Editform;
