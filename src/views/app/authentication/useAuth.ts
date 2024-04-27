import { pb } from "@/lib/pocketbase";
import { useState } from "react";

export type LoginPayload = {
  usernameOrEmail: string;
  password: string;
};

const useAuth = () => {
  const [loading, setLogin] = useState(false);

  const handleLogin = async (payload: LoginPayload) => {
    try {
      setLogin(true);

      const authResponse = await pb
        .collection("users")
        .authWithPassword(payload.usernameOrEmail, payload.password);

      console.log(authResponse);
    } catch (error) {
      console.log(error);
    } finally {
      setLogin(true);
    }
  };

  return { loading, handleLogin };
};

export default useAuth;
