import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Comment = () => {
  const { id, userId } = useParams();
  const [commentText, setCommentText] = useState("");
  const [comment, setComment] = useState([]);
  const [issend, setissend] = useState(true);
  const [cmdid, setid] = useState("");

  const allcomments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/comment/post/${id}`);
      const data = await res.json();
      setComment(data.result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allcomments();
  }, []);

  const comments = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/comment/user/${userId}/post/${id}`,
        {
          credentials: "include",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: commentText }),
        },
      );
      if (!res.ok) {
        alert("Please Type Comment First!");
      }
      const data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const deletecom = async (id) => {
    const isConfirm = window.confirm(
      "Are you sure you want to delete this Comment?",
    );
    if (!isConfirm) return;
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/comment/delete/${id}`,
        {
          credentials: "include",
          method: "DELETE",
        },
      );
      const data = await res.json();
      alert(data.msg);
    } catch (err) {
      console.log(err);
    }
  };

  const editcomments = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/comment/edit/${cmdid}`,
        {
          credentials: "include",
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: commentText }),
        },
      );
      if (!res.ok) {
        alert("Please Type Comment First!");
      }
      const data = await res.json();
      alert(data.msg);
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const controller = () => {
    if (issend) {
      (comments(),
        setCommentText(""),
        setTimeout(() => {
          allcomments();
        }, 500));
    } else {
      (editcomments(),
        setCommentText(""),
        setTimeout(() => {
          allcomments();
        }, 500));
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <p className="text-[#ab7d09] text-2xl underline">Comments</p>
      <div className="flex w-full justify-center mb-5 items-center gap-3">
        <input
          className="rounded-[10px] w-[90%] px-3 py-1 bg-[#262626] text-white placeholder:text-gray-500 border border-gray-500 focus:outline-none focus:ring-2 focus:ring-[#ab7d09]"
          type="text"
          value={commentText}
          placeholder="Write a comment..."
          onChange={(e) => setCommentText(e.target.value)}
        />
        <i
          className="fa-solid text-[#ab7d09] text-[20px] fa-paper-plane"
          onClick={() => {
            controller();
          }}
        ></i>
      </div>

      {comment?.map((com) => (
        <div className="flex flex-col mb-3 " key={com._id}>
          <p className="text-2xl text-[#ab7d09]">
            {com.userId.name}
            <span className="text-gray-200 text-[14px]">
              {" "}
              : {new Date(com.createdAt).toLocaleString()}
            </span>
            <span className="bg-[#262626] flex ml-5 text-justify rounded-bl-[20px] rounded-tr-[20px] px-3 py-2 text-lg text-gray-300">
              {com.text}
            </span>
          </p>
          <div className="flex justify-end mr-3 mt-2 gap-3">
            {userId === com.userId._id && (
              <>
                <i
                  onClick={() => {
                    (setCommentText(com.text),
                      setissend(false),
                      setid(com._id));
                  }}
                  className="fa-solid text-amber-200 fa-pen-to-square"
                ></i>
                <i
                  onClick={() => {
                    (deletecom(com._id),
                      setTimeout(() => {
                        allcomments();
                      }, 500));
                  }}
                  className="fa-solid text-amber-500 fa-trash-can"
                ></i>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
export default Comment;
