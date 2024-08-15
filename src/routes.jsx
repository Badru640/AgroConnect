import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Dashboard } from "./pages/admin-dashboard";
import AddAnuncio from "./components/addAnuncio";
import { Login } from "./pages/login";
import { ErrorPage } from "./pages/errorpage.jsx";
import { ProfilePage } from "./components/profile/profile.jsx";


export const route = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage/>
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
  {
    path: "/profile",
    element: <ProfilePage />,
  },
]);
