import LoaderCircular from "@/components/shared/loader-circular";
import { Outlet } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout";
import { Suspense } from "react";

export const PublicOutlet: React.FC = () => {
  return (
    <PublicLayout>
      <Suspense fallback={<LoaderCircular />}>
        <Outlet />
      </Suspense>
    </PublicLayout>
  );
};

export default PublicOutlet;
