import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/Main";
import Authpage from "./pages/Authpage";
import Homepage from "./pages/Homepage";
import Detailpage from "./pages/Detailpage";
import Editpage from "./pages/Editpage";
import Createpage from "./pages/Createpage";
import { UserContextprovider } from "../Context";
function App() {
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
