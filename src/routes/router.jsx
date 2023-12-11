import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../components/errorPage/ErrorPage";
import Home from "../components/home/home/Home";
import SignIn from "../components/AuthControll/SignIn";
import SignUp from "../components/AuthControll/SignUp";
import PrivateRoute from "./PrivateRoute";
import Admin from "../components/adminPanel/Admin";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/admin-panel",
        element: (
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        ),
      },

      {
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
]);

export default router;
