import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetCartItems = (email: string | null) => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ["cartItems", email],
    queryFn: async () => {
      if (!email) return [];
      const res = await axiosSecure.get(`/cart/${email}`);
      return res.data;
    },
    initialData: [], 
    enabled: !!email, 
  });
};

export default useGetCartItems;
