import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetCategories = () => {
  const axiosSecure = useAxiosSecure();
  const { data,isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosSecure.get("/categories");
      return res.data;
    },
  });
  return {data,isLoading};
};

export default useGetCategories;
