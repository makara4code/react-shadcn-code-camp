import Dashboard from "@/views/app/Dashboard";
import Orders from "@/views/app/Orders";
import PrivateOutlet from "@/components/outlets/PrivateOutlet";

export const privateRoutes = [
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
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
];

export default privateRoutes;
