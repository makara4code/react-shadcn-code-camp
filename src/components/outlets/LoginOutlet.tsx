import { Navigate } from "react-router-dom";

import React from "react";
import secureLocalStorage from "react-secure-storage";

export const LoginOutlet: React.FC = () => {
  const accessToken = secureLocalStorage.getItem("accessToken");

  return accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
};

export default LoginOutlet;
