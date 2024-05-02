import api from "@/lib/api";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

const useAuth = () => {
  const [loading, setLogin] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLogin(true);
      const res = await api.post("/api/collections/users/auth-with-password", {
        identity: payload.usernameOrEmail,
        password: payload.password,
      });
      
      console.log({ res });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
      });
    } finally {
      setLogin(false);
    }
  };

  return { loading, handleLogin };
};

export default useAuth;
