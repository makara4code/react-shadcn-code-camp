import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuth from "./useAuth";
import { useDebounceValue } from "usehooks-ts";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { ThemeToggle } from "@/components/ThemeToggle";

function Login() {
  const accessToken = secureLocalStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  const [usernameOrEmail, setUsernameOrEmail] = useDebounceValue("", 100);
  const [password, setPassword] = useDebounceValue("", 100);
  const { handleLogin, loading } = useAuth();

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="max-w-sm mx-auto">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="usernameOrPassword"
                type="text"
                placeholder="Username"
                required
                defaultValue={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                required
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading || !usernameOrEmail || !password}
              onClick={() => handleLogin({ usernameOrEmail, password })}
            >
              {loading ? "Loading..." : "Login"}
            </Button>

            {/* <Button variant="outline" className="w-full" disabled>
              Login with Google
            </Button> */}
          </div>
          {/* <div className="mt-4 text-sm text-center">
            Don&apos;t have an account?
            <a href="#" className="underline">
              Sign up
            </a>
          </div> */}

          <div className="flex items-center justify-center gap-2 mt-6">
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Login;
