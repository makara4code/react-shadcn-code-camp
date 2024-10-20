import type { Post } from "@/types/post";
import api from "@/api/axios";
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
          posts(filter: { status: { _eq: "published" }}) {
            title,
            slug,
            status,
            user_created {
              last_name,
              first_name,
            },
            thumbnail {
              id
            },
            date_created,
          },
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
