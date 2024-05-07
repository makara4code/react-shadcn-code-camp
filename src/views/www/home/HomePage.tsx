import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { DIRECTUS_API_KEY } from "@/constants/api";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import { useEffect } from "react";
import { useHomePage } from "./useHomePage";

export function HomePage() {
  const { posts, loading, fetchPostGraph } = useHomePage();

  useEffect(() => {
    fetchPostGraph();
  }, []);

  return (
    <div className="flex gap-4 mt-6">
      {loading ? (
        <div className="flex flex-wrap gap-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : (
        posts?.map((post) => (
          <Card
            className="overflow-hidden w-[400px] hover:cursor-pointer rounded-3xl hover:shadow-md transition-transform transform hover:scale-105 "
            key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="h-[200px]">
                <img
                  alt="Product image"
                  className="object-cover w-full h-full rounded-3xl aspect-square"
                  src={`/api/assets/${post.thumbnail.id}?fit=cover&access_token=${DIRECTUS_API_KEY}`}
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

export default HomePage;
