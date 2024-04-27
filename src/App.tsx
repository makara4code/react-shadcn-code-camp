import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "@/views/www/About";
import Dashboard from "@/views/app/Dashboard";
import Home from "@/views/www/Home";
import Login from "@/views/app/Login";
import Orders from "@/views/app/Orders";
import PrivateOutlet from "@/components/outlets/PrivateOutlet";
import PublicOutlet from "@/components/outlets/PublicOutlet";
// import { Routes } from "@/resources/Slug"
import { ThemeProvider } from "@/components/ThemeProvider";
import { TooltipProvider } from "@/components/ui/tooltip";

const publicRoutes = [
  {
    path: "/",
    element: <PublicOutlet />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        // catch not found route
        path: "*",
        element: <div>Not found</div>,
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
    path: "/admin",
    element: <PrivateOutlet />,
    children: [
      {
        path: "/admin/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/admin/orders",
        element: <Orders />,
      },
      {
        // catch nt found route
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;