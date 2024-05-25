import { Loader2 } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full h-screen mt-6">
      <Loader2 className="w-6 h-6 mr-2 animate-spin" />
      <p>Loading...</p>
    </div>
  );
};

export default Loading;
