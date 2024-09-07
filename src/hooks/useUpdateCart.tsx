import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

interface UpdateCartItemParams {
  cartItemId: string;
  quantity: number;
}

const useUpdateCartItemQuantity = (email: string | null) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const updateCartItemQuantity = async ({ cartItemId, quantity }: UpdateCartItemParams) => {
    const response = await axiosSecure.patch(`/cart/${cartItemId}`, { quantity });
    return response.data;
  };

  return useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: (data) => {
      console.log("Cart item quantity updated successfully:", data);
      if (email) {
      
        queryClient.invalidateQueries({
          queryKey: ["cartItems", email],
        });
      }
    },
    onError: (error) => {
      console.error("Error updating cart item quantity:", error);
    },
  });
};

export default useUpdateCartItemQuantity;
