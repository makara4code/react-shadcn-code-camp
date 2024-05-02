import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";

import { BASE_PATH } from "@/constants/path";
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
      const res = await api.get("/items/posts");

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
    <div className="flex mt-2">
      {loading ? (
        <div>Loading...</div>
      ) : (
        posts?.map((post) => (
          <Card className="overflow-hidden" key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                Lipsum dolor sit amet, consectetur adipiscing elit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <img
                  alt="Product image"
                  className="object-cover w-full rounded-md aspect-square"
                  height="300"
                  src={`${BASE_PATH}/assets/${post.thumbnail}?fit=cover&width=200&height=200&access_token=${DIRECTUS_API_KEY}`}
                  width="300"
                />
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
