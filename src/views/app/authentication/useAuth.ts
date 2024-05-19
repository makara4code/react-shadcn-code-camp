/* eslint-disable @typescript-eslint/no-unused-vars */

import api from "@/lib/api";
import { useLocalStorage } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

const useAuth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loading, setLogin] = useState(false);
  const [_accessToken, setAccessToken] = useLocalStorage<string>('accessToken', "")
  const [_refreshToken, setRefreshToken] = useLocalStorage<string>('refreshToken', "")
  const [_expiresIn, setExpiresIn] = useLocalStorage<string>('expiresIn', "")


  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLogin(true);
      const res = await api.post("/admin/auth/login", {
        email: payload.usernameOrEmail,
        password: payload.password,
      });

      if (res.data) {
        console.log({ res })
        setAccessToken(res.data.data.access_token);
        setRefreshToken(res.data.data.refresh_token);
        setExpiresIn(res.data.data.expires);
        
        toast({
          title: "Success",
          description: "You have successfully logged in",
        });

        // Redirect to dashboard
        navigate("/admin/dashboard");
      }
      
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
      });
    } finally {
      setLogin(false);
    }
  };

  return { loading, handleLogin };
};

export default useAuth;
