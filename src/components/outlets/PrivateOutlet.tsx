import { Navigate, Outlet } from "react-router-dom";

import PrivateLayout from "@/layouts/PrivateLayout";
import { pb } from "@/lib/pocketbase";

export const PrivateOutlet: React.FC = () => {
  return pb.authStore.token ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutlet;
