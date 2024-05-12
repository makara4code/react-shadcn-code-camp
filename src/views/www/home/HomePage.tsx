import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { AArrowUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DIRECTUS_API_KEY } from "@/constants/api";
import MyButton from "@/components/MyButton";
import { SkeletonCard } from "@/components/shared/skeleton-card";
import { useEffect } from "react";
import { useHomePage } from "./useHomePage";

export function HomePage() {
  console.log(<Button />)
  const { posts, loading, fetchPostGraph } = useHomePage();

  useEffect(() => {
    fetchPostGraph();
  }, []);

  return (
    <>
      <Button variant="destructive">
        <AArrowUp />
        Shadcn Button
      </Button>
      
      <MyButton color="outline" icon={<AArrowUp />}>
        <p className="text-white">CLick ME</p>
      </MyButton>

      <div className="flex flex-wrap justify-center gap-4 mt-6">
        {loading ? (
          <div className="flex flex-wrap gap-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          posts?.map((post) => (
            <Card
              className="overflow-hidden w-[350px] hover:cursor-pointer rounded-xl hover:shadow-md transition-transform transform hover:scale-102 hover:border-primary hover:text-primary"
              key={post.slug}>
              <CardHeader>
                <CardTitle className="">{post.title}</CardTitle>
                <CardDescription>
                  {new Date(post.date_created).toDateString()}
                </CardDescription>
                <div>
                  <Badge variant="secondary" className="pt-0">
                    Author:
                    {post.user_created.first_name + post.user_created.last_name}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent>
                <div className="h-[150px]">
                  <img
                    alt="Product image"
                    className="object-cover w-full h-full rounded-xl aspect-square"
                    src={`/api/assets/${post.thumbnail.id}?fit=cover&access_token=${DIRECTUS_API_KEY}`}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default HomePage;
