import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SkeletonCard } from "@/components/shared/skeleton-card";

import { useEffect, useState } from "react";

import { DIRECTUS_API_KEY } from "@/constants/api";
import api from "@/lib/api";

type Post = {
  id: number;
  status: string;
  sort: any;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  title: string;
  content: string;
  thumbnail: string;
};

export default function Component() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/items/posts");

      if (res.status === 200) {
        setPosts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <>
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
                    src={`/api/assets/${post.thumbnail}?fit=cover&access_token=${DIRECTUS_API_KEY}`}
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
