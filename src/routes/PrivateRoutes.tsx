/* eslint-disable react-refresh/only-export-components */
// import Dashboard from "@/views/app/Dashboard";
// import Orders from "@/views/app/Orders";
// import PrivateOutlet from "@/components/outlets/PrivateOutlet";

import loadable from "@loadable/component";

const Dashboard = loadable(() => import("@/views/app/Dashboard"));
const Orders = loadable(() => import("@/views/app/Orders"));
const PrivateOutlet = loadable(() => import("@/components/outlets/PrivateOutlet"));

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
