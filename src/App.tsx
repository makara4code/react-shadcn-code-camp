import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Dashboard from "@/views/Dashboard";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Orders from "@/views/Orders";
import PrivateOutlet from "@/components/outlets/PrivateOutlet";
import PublicOutlet from "@/components/outlets/PublicOutlet";
import { TooltipProvider } from "@/components/ui/tooltip";

const publicRoutes = [
  {
    path: "/",
    element: <PublicOutlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
];

const privateRoutes = [
  {
    path: "/",
    element: <PrivateOutlet />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        // catch all route
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
    </TooltipProvider>
  );
}

export default App;
