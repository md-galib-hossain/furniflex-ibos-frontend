import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useDeleteCartItem = (email: string | null) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteCartItem = async (cartItemId: string) => {
    const response = await axiosSecure.delete(`/cart/${cartItemId}`);
    return response.data;
  };

  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess: (data) => {
      console.log("Cart item deleted successfully:", data);
      // Revalidate cart items after deletion
      if (email) {
        queryClient.invalidateQueries({
          queryKey: ["cartItems", email],
        });
      }
    },
    onError: (error) => {
      console.error("Error deleting cart item:", error);
    },
  });
};

export default useDeleteCartItem;
