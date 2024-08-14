import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { DetailsPage } from "./pages/details";
import { Dashboard } from "./pages/admin-dashboard";



export const route = createBrowserRouter ([
    {
        path: "/",
        element: <Home/>,
      },
    {
        path: "/details",
        element: <DetailsPage/>,
      },
    {
        path: "/dashboard",
        element: <Dashboard/>,
      },
   
])