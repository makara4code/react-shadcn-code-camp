import { Suspense, lazy } from "react";

import { Loader2 } from "lucide-react";

const Todo = lazy(() => delayForDemo(import("./TodoComponent.tsx")));

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen mt-6">
      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

async function delayForDemo(promise: Promise<any>) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return await promise;
}

export function AboutPage() {
  const todos = [
    { key: 1, title: "Todo 1", content: "Content 1" },
    { key: 2, title: "Todo 2", content: "Content 2" },
    { key: 3, title: "Todo 3", content: "Content 3" },
  ];
  
  return (
    <div className="container mx-auto mt-4">
      <div className="flex gap-2">
        <Suspense fallback={<Loading />}>
          {todos.map((todo) => (
            <Todo key={todo.key} />
          ))}
        </Suspense>
      </div>
    </div>
  );
}

export default AboutPage;
