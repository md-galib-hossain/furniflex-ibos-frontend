import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { AuthContext } from "@/contexts/AuthContext";
import useGetCartItems from "@/hooks/userGetCartItems";
import { ICartItem } from "@/types/Cart";

const CheckoutForm = () => {
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const userEmail = user?.email || null;

  const { data, isLoading: cartLoading, refetch: refetchCart } = useGetCartItems(userEmail);

  // Calculate total price and set cart items
  useEffect(() => {
    if (data?.data?.result) {
      setCartItems(data.data.result);
      const calculatedTotalPrice = data.data.result.reduce(
        (total: number, item: any) => total + item.itemPrice * item.quantity,
        0
      );
      setTotalPrice(calculatedTotalPrice);
    }
  }, [data]);

  // Fetch payment intent from the backend
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (totalPrice > 0) {
        try {
          const response = await axiosSecure.post("/stripe/create-payment-intent", { price: totalPrice });
          setClientSecret(response?.data?.data?.clientSecret);
        } catch (error) {
          console.error("Error creating payment intent:", error);
        }
      }
    };
    fetchPaymentIntent();
  }, [totalPrice, axiosSecure]);

  // Handle form submission for payment
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error: paymentMethodError } = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: {
        email: user?.email || "anonymous",
        name: user?.displayName || "anonymous",
      },
    });

    if (paymentMethodError) {
      setError(paymentMethodError.message || "Payment method error");
      return;
    }

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          email: user?.email || "anonymous",
          name: user?.displayName || "anonymous",
        },
      },
    });

    if (confirmError) {
      setError(confirmError.message || "Payment confirmation error");
    } else if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);

      const payment = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        cartIds: cartItems.map((item) => item._id),
        itemIds: cartItems.map((item) => item.itemId),
        status: "pending",
      };

      try {
        const res = await axiosSecure.post("/payments", payment);
        if (res?.data) {
          // Show success toast with transaction ID
          toast({ title: "Congratulations! Payment Successful", description: `Transaction ID: ${paymentIntent.id}` });

          // Refetch the cart to update the cart items
          await refetchCart();

          // Navigate to the cart page
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error saving payment:", error);
      }
    }
  };

  if (cartLoading) return <p>Loading cart...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": { color: "#aab7c4" },
              },
              invalid: { color: "#9e2146" },
            },
          }}
          className="p-3 border border-gray-300 rounded-lg"
        />
        <button
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay {totalPrice > 0 ? `₹${totalPrice}` : ""}
        </button>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        {transactionId && (
          <p className="text-green-600 text-sm">Transaction ID: {transactionId}</p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
