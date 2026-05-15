import { useContext, useState } from "react";
import { data, Link } from "react-router-dom";
import { UserContext } from "../../Context";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { onlineUsers } = useContext(UserContext);

  const findUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL}/user/finduser/${searchTerm}`,
      );
      if (!res.ok) {
        alert("User not found! Please try again with a different name.");
        setSearchTerm("");
        return;
      }
      const data = await res.json();
      setSearchResults(data.result);
      console.log(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const allUser = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_URL}/user/allusers`);
      const data = await res.json();
      setSearchResults(data.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col items-center">
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
        {loading && (
          <img src="/loading.gif" className="w-18 h-18 ml-45" alt="Loading" />
        )}
        {searchResults?.map((user) => {
          const isOnline = onlineUsers.includes(user.name);

          return (
            <Link
              key={user._id}
              to={`/my-profile/${user.name}`}
              className="flex bg-[#262626] w-100% py-2 px-3 rounded-[10px] items-center gap-3"
            >
              <div className="flex relative">
                <img
                  className="w-25 h-25 rounded-full mr-2"
                  src={user.img}
                  alt=""
                />

                {isOnline ? (
                  <span className="absolute bottom-1 right-2 w-6 h-6 bg-green-500 border-2 border-black rounded-full"></span>
                ) : (
                  <span className="absolute bottom-1 right-2 w-6 h-6 bg-gray-500 border-2 border-black rounded-full"></span>
                )}
              </div>

              <div className="flex flex-col">
                <h3 className="text-[#bcbea9] text-2xl font-bold">
                  {user.name}
                </h3>

                <p className="text-[#bcbea9] mr-6">ID: {user._id}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
