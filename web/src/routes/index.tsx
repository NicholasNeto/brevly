import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import NotFound from "../pages/notFound";
import RedirectPage from "../pages/RedirectPage";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/404",
      element: <NotFound />,
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
  