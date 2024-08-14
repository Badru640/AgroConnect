import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { DetailsPage } from "./pages/details";
import { Dashboard } from "./pages/admin-dashboard";
import AddAnuncio from "./components/addAnuncio";
import { Login } from "./pages/login";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/details",
    element: <DetailsPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/Add-Anuncio",
    element: <AddAnuncio />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
