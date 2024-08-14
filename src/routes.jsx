import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Details } from "./pages/details";
import { Dashboard } from "./pages/admin-dashboard";



export const route = createBrowserRouter ([
    {
        path: "/",
        element: <Home/>,
      },
    {
        path: "/details",
        element: <Details/>,
      },
    {
        path: "/dashboard",
        element: <Dashboard/>,
      },
   
])