import { pb } from "@/lib/pocketbase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

const useAuth = () => {
  const [loading, setLogin] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLogin(true);
      await pb
        .collection("users")
        .authWithPassword(payload.usernameOrEmail, payload.password);

      if (pb.authStore.isValid) {
        toast({
          title: "Scheduled: Catch up",
          description: "Friday, February 10, 2023 at 5:57 PM",
        });
        navigate("/admin/dashboard");
      }
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
