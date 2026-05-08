import { useState } from "react";
import { data, Link } from "react-router-dom";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const findUser = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/user/finduser/${searchTerm}`,
      );
      if (!res.ok) {
        alert("User not found! Please try again with a different name.");
        return;
      }
      const data = await res.json();
      setSearchResults(data.result);
    } catch (error) {
      console.log(error);
    }
  };
  const allUser = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/user/allusers`);
      const data = await res.json();
      setSearchResults(data.result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex mt-5 justify-center gap-3">
        <input
          type="text"
          placeholder="Search Users"
          className="border-2 rounded-[10px] text-[16px] font-bold text-[#ab7d09] px-3 border-[#ab7d09]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={findUser}>
          <i className="fa-solid text-[#ab7d09] text-2xl fa-magnifying-glass"></i>
        </button>
        <div className="flex flex-col">
          {" "}
          <button
            onClick={allUser}
            className="text-[#ab7d09] text-xl rounded-[5px]"
          >
            👥
          </button>
          <span className="text-[#ab7d09] text-[14px]">All Users</span>
        </div>
      </div>
      <div className="flex absolute left-3 top-40 mt-8 flex-col gap-8">
        {searchResults?.map((user) => (
          <Link
            key={user._id}
            to={`/my-profile/${user.name}`}
            className="flex items-center gap-3"
          >
            <img src={user.img} className="w-25 border-2 h-25 rounded-full" />
            <h3 className="text-[#504016] text-2xl font-bold">{user.name}</h3>
            <p className="text-[#ab7d09]">{user.email}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Search;
