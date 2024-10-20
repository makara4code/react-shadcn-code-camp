import { Navigate, Outlet } from "react-router-dom";

import PrivateLayout from "@/layouts/PrivateLayout";
import React from "react";
import secureLocalStorage from "react-secure-storage";

export const PrivateOutlet: React.FC = () => {
  const accessToken = secureLocalStorage.getItem("accessToken");
  const refreshToken = secureLocalStorage.getItem("refreshToken");

  return accessToken || refreshToken ? (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateOutlet;
