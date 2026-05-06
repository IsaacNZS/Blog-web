import { useContext, useState } from "react";
import { redirect, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [name, setUsername] = useState();
  const [password, setUserpassword] = useState();
  const navigate = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  const register = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/user/registor`, {
      method: "POST",
      body: JSON.stringify({ name: name, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/auth?mode=login");
      setUserpassword("");
      alert(data.msg);
    } else {
      alert(data.msg);
    }
  };

  const login = async () => {
    const res = await fetch(`${import.meta.env.VITE_URL}/user/login`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({ name: name, password: password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      navigate("/");
      setUserInfo(data);
      alert(data.msg);
    } else {
      alert(data.msg);
    }
  };

  const formhandler = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      login();
    } else {
      register();
    }
  };

  const isLoginMode = searchParams.get("mode") === "login";
  return (
    <section className="w-[90%] sm:w-1/2 mx-auto">
      <br />
      <h1 className="text-3xl font-bold text-center">
        {isLoginMode ? "Login" : "Register"} Form
      </h1>
      <br />
      <form method="post" onSubmit={formhandler}>
        <div className="flex flex-col">
          <label htmlFor="name">Enter Name</label>
          <input
            type="text"
            className="border-2 rounded-[3px] px-4 py-1"
            name="name"
            id="name"
            placeholder="Type a user name"
            minLength={4}
            value={name || ""}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          <br />
          <label htmlFor="name">Enter Password</label>
          <input
            type="password"
            className="border-2 rounded-[3px] px-4 py-1"
            name="name"
            id="name"
            placeholder="Type Password"
            minLength={8}
            value={password || ""}
            onChange={(e) => {
              setUserpassword(e.target.value);
            }}
          />
        </div>
        <button className="border-2-black px-3 py-1 text-white w-full rounded-[5px] bg-black mt-5">
          {isLoginMode ? "Login" : "Register"} Account
        </button>
      </form>
    </section>
  );
};

export default Auth;
