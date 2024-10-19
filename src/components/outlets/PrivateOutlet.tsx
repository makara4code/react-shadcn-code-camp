import { Navigate, Outlet } from "react-router-dom";

import PrivateLayout from "@/layouts/PrivateLayout";
import React from "react";
import secureLocalStorage from "react-secure-storage";

export const PrivateOutlet: React.FC = () => {
  const accessToken = secureLocalStorage.getItem("accessToken");

  return accessToken ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutlet;
