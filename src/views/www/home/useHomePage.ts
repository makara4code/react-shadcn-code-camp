import type { Post } from "@/types/post";
import api from "@/lib/api";
import { useState } from "react";

export const useHomePage = () => {
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

  const fetchPostGraph = async () => {
    try {
      setLoading(true);
      
      const query = `
        query {
          posts {
            id
            title
            thumbnail {
              id
            }
          }
        }
      `;

      const res = await api.post("/api/graphql", { query: query });

      if (res) {
        setPosts(res.data.data.posts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    fetchPostGraph,
    fetchPost,
    setLoading,
  };
};
