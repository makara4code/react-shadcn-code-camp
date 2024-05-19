import { Suspense, lazy } from "react";

const Todo = lazy(() => delayForDemo(import("./TodoComponent")));

const Loading = () => {
  return <div>Loading...</div>;
};

async function delayForDemo(promise: Promise<any>) {
  await new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
  return await promise;
}

export default function About() {
  return (
    <div className="container mx-auto">
      <Suspense fallback={<Loading />}>
        <Todo />
      </Suspense>
    </div>
  );
}
