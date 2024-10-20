import type { Product } from "@/types/product";
import api from "@/api/axios";
import { useState } from "react";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get("/api/items/products");

      if (res.status === 200) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProductWithGraphql = async () => {
    try {
      setLoading(true);
      const query = `
        query {
          products {
            id,
            name,
            thumbnail,
            date_created,
          },
        }
      `;

      const res = await api.post("/api/graphql", { query: query });

      if (res) {
        setProducts(res.data.data.products);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    fetchProductWithGraphql,
    fetchProduct,
    setLoading,
  };
};
