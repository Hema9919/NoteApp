import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signup/signup";
import MainLayout from "./layouts/main-layout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={routes} />;
};

export default App;
