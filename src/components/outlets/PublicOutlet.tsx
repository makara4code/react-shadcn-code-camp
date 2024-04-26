import { Outlet } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";

export const PublicOutlet: React.FC = () => {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
};

export default PublicOutlet;
