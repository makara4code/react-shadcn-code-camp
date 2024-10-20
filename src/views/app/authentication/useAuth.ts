/* eslint-disable @typescript-eslint/no-unused-vars */

import api from "@/lib/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import secureLocalStorage from "react-secure-storage";

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [errors, setErrors] = useState<Array<Record<string, any>>>([]);
  const [loading, setLogin] = useState(false);
  
  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLogin(true);
      setErrors([]);

      const res = await api.post("/api/auth/login", {
        email: payload.usernameOrEmail,
        password: payload.password,
      });

      if (res.data) {
        secureLocalStorage.setItem("accessToken", res.data.data.access_token);
        secureLocalStorage.setItem("refreshToken", res.data.data.refresh_token);
        secureLocalStorage.setItem("expires", res.data.data.expires.toString());
        secureLocalStorage.setItem("expireAt", new Date (Date.now() + res.data.data.expires).toISOString());

        toast({
          title: "Success",
          description: "You have successfully logged in",
        });

        navigate("/dashboard");
      }
      
    } catch (error: any) {
      setErrors(error?.response?.data?.errors ?? ["Something went wrong"]);
    } finally {
      setLogin(false);
    }
  };

  return { errors, loading, handleLogin };
};

export default useAuth;
