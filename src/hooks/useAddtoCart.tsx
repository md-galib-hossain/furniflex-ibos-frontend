import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

type AddToCartParams = {
  email: string;
  itemId: string;
  quantity: number;
  itemPrice: number;
  itemImage: string;
  itemName:string;
};

// Define the hook
const useAddToCart = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient(); // Get the query client instance

  const addToCart = async (cartData: AddToCartParams) => {
    const response = await axiosSecure.post('/cart', cartData);
    return response.data;
  };

  return useMutation({
    mutationFn: addToCart,
    onSuccess: (data, variables) => {
      console.log("Cart updated successfully:", data);
     
      queryClient.invalidateQueries({
        queryKey: ["cartItems", variables.email],
      });
    },
    onError: (error) => {
      console.error("Error updating cart:", error);
    },
  });
};

export default useAddToCart;
