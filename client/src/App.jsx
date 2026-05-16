import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Detailpage from "./pages/Detailpage";
import Editpage from "./pages/Editpage";
import Createpage from "./pages/Createpage";
import Myprofile from "./pages/Myprofile";
import { UserContextprovider } from "../Context";
import { useEffect } from "react";
import { socket } from "./socket";
import SearchContainer from "./pages/Search";

function App() {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      socket.emit("user-online", user);
    }
  }, []);

  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: "/auth",
          element: <Authpage />,
        },
        {
          path: "/edit/:id",
          element: <Editpage />,
        },
        {
          path: "/post-create",
          element: <Createpage />,
        },
        {
          path: "/my-profile/:name",
          element: <Myprofile />,
        },
        {
          path: "/search",
          element: <SearchContainer />,
        },
        {
          path: "/user/:userId/post/:id",
          element: <Detailpage />,
        },
      ],
    },
  ]);
  return (
    <UserContextprovider>
      <RouterProvider router={router} />
    </UserContextprovider>
  );
}

export default App;
