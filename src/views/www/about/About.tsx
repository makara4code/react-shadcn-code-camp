import { Button } from "@/components/shared";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/useAuthContext";
import { useState } from "react";
import { Counter } from "@/features/counter/Counter";

export default function About() {
  const { token, saveToken, removeToken } = useAuthContext();
  const [input, setInput] = useState("");

  const handleOnAddToken = () => {
    saveToken(input);
    setInput("");
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="mt-4">
        Welcome to the about page! This is a protected route that only logged in
        users can access.
      </p>

      <Card className="p-4 mt-2">
        <p>Token: {token}</p>

        <Input
          onChange={(e) => setInput(e.target.value)}
          placeholder="Token"
          value={input}
        />

        <div className="flex gap-2 mt-2">
          <Button onClick={handleOnAddToken}>Add Token</Button>
          <Button onClick={removeToken}>Remove Token</Button>
        </div>
      </Card>

      <Counter />
    </div>
  );
}
