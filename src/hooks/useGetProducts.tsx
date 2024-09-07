import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

type useGetProductsProps = {
  page: number;
  limit: number;
  searchTerm: string;
  category?: string | null;  
  subCategory?: string | null; 
};

const useGetProducts = ({
  page,
  limit,
  searchTerm,
  category,
  subCategory,
}: useGetProductsProps) => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["products", page, limit, searchTerm, category, subCategory],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      if (searchTerm) {
        params.append("searchTerm", searchTerm);
      }
      if (category) {
        params.append("category", category); // Use category if provided
      }
      if (subCategory) {
        params.append("subCategory", subCategory); // Use subCategory if provided
      }

      const res = await axiosSecure.get(`/products?${params.toString()}`);
      return res.data;
    },
  });

  return { data, isLoading };
};

export default useGetProducts;
