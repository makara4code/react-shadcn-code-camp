export default function About() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold">About</h1>
      <p className="mt-4">
        Welcome to the about page! This is a protected route that only logged in
        users can access.
      </p>
    </div>
  );
}
