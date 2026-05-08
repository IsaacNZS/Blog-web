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

function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected:", socket.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("disconnected:", reason);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
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
          path: "/post/:id",
          element: <Detailpage />,
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
