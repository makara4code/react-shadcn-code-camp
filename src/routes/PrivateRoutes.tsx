/* eslint-disable react-refresh/only-export-components */
// import Dashboard from "@/views/app/Dashboard";
// import Orders from "@/views/app/Orders";
// import PrivateOutlet from "@/components/outlets/PrivateOutlet";

import TraineeDetail from "@/views/app/trainee/TraineeDetail";
import loadable from "@loadable/component";

const Dashboard = loadable(() => import("@/views/app/Dashboard"));
const Trainees = loadable(() => import("@/views/app/trainee/Trainees"));
const PrivateOutlet = loadable(() => import("@/components/outlets/PrivateOutlet"));

export const privateRoutes = [
  {
    path: "/",
    element: <PrivateOutlet />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/trainee",
        children: [
          {
            path: "",
            element: <Trainees />,
          } ,         
          {
            path: "/trainee/:id/info",
            element: <TraineeDetail />
          },
          {
            path: "/trainee/:id/edit",
            element: <TraineeDetail />
          }
        ]
      },
      {
        path: "*",
        element: <div>Not found</div>,
      },
    ],
  },
];

export default privateRoutes;
