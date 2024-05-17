import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import { Button } from "@/components/ui/button";
  import { DIRECTUS_API_KEY } from "@/constants/api";
  import { SkeletonCard } from "@/components/shared/skeleton-card";
  import { useEffect } from "react";
  import { useProducts } from "./useProducts";
  
  export function HomePage() {
    console.log(<Button />)
    const { products, loading, fetchProduct } = useProducts();
  
    useEffect(() => {
        fetchProduct();
    }, []);
  
    return (
      <>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {loading ? (
            <div className="flex flex-wrap gap-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            products?.map((product) => (
              <Card
                className="overflow-hidden w-[350px] hover:cursor-pointer rounded-xl hover:shadow-md transition-transform transform hover:scale-102 hover:border-primary hover:text-primary"
                key={product.id}>
                <CardHeader>
                  <CardTitle className="">{product.name}</CardTitle>
                  <CardDescription>
                    {new Date(product.date_updated).toDateString()}
                  </CardDescription>
                </CardHeader>
  
                <CardContent>
                  <div className="max-h-[300px]">
                    <img
                      alt="Product image"
                      className="object-cover object-top w-full h-full transition-transform rounded-xl aspect-square hover:scale-105"
                      src={`/api/assets/${product.thumbnail}?fit=cover&access_token=${DIRECTUS_API_KEY}`}
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
  