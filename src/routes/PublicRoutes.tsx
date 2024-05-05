import About from "@/views/www/About";
import Home from "@/views/www/Home";
import Login from "@/views/app/authentication/Login";
import PublicOutlet from "@/components/outlets/PublicOutlet";

export const publicRoutes = [
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

export default publicRoutes;
