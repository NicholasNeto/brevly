import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/NotFound";
import RedirectPage from "../pages/RedirectPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:slug",
    element: <RedirectPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
