import { Navigate, Outlet } from "react-router-dom";

import PrivateLayout from "@/layouts/PrivateLayout";
import { useLocalStorage } from "usehooks-ts";

export const PrivateOutlet: React.FC = () => {
  const [accessToken] = useLocalStorage("accessToken", "");

  return accessToken ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutlet;
