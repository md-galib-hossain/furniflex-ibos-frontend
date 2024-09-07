import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { X, Plus, Minus } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";
import useDeleteCartItem from "@/hooks/useDeleteFromCart";
import useUpdateCartItemQuantity from "@/hooks/useUpdateCart";
import useGetCartItems from "@/hooks/userGetCartItems";
import { ICartItem } from "@/types/Cart";
import { Link } from "react-router-dom";

const Cart = () => {
  const { user } = useContext(AuthContext);

  const userEmail = user?.email || null;

  const { data, isLoading } = useGetCartItems(userEmail);

  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  const deleteCartItem = useDeleteCartItem(userEmail);
  const updateCartItemQuantity = useUpdateCartItemQuantity(userEmail);

  useEffect(() => {
    if (data?.data?.result) {
      setCartItems(data.data.result);
    }
  }, [data]);

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems((items) =>
      items.map((item) => (item._id === id ? { ...item, quantity } : item))
    );

    updateCartItemQuantity.mutate({ cartItemId: id, quantity });
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item._id !== id));

    deleteCartItem.mutate(id);
  };

  // Calculate the subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.itemPrice * item.quantity,
    0
  );

  if (isLoading) return <p>Loading cart...</p>;

  return (
    <div className="max-w-screen-xl mx-auto p-4 space-y-6 mb-10 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3 p-4 lg:p-6 bg-secondary dark:bg-secondary rounded shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Your Order Overview</h2>
          {!isLoading && cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item._id} className="relative p-4 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-4 items-center">
                  {/* Quantity controls */}
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity - 1)
                      }
                    >
                      <Minus size={16} />
                    </Button>
                    <input
                      type="text"
                      readOnly
                      value={item.quantity}
                      className="w-12 text-center bg-transparent"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity + 1)
                      }
                    >
                      <Plus size={16} />
                    </Button>
                  </div>

                  {/* Product info */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.itemImage}
                      alt={`Product ${item.itemId}`}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <p className="text-lg font-semibold">Item {item.itemName}</p>
                  </div>

                  {/* Price */}
                  <p className="text-lg font-semibold">
                    {formatCurrency(item.itemPrice * item.quantity)}
                  </p>

                  {/* Remove item button */}
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="absolute top-2 right-2"
                  >
                    <X size={20} />
                  </button>
                </div>
                {item !== cartItems[cartItems.length - 1] && <Separator className="mt-6"/>}
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 p-6 bg-secondary rounded shadow-sm space-y-4 max-h-80">
          <h2 className="text-2xl font-semibold">Order Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-lg">
              <p>Subtotal</p>
              <p>{formatCurrency(subtotal)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Shipping</p>
              <p>Free</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Estimated Tax</p>
              <p>$ -</p>
            </div>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-semibold">
            <p>Total</p>
            <p>{formatCurrency(subtotal)}</p>
          </div>
        <Link to="/payment">
        <Button size="lg" className="w-full rounded mt-4">
            Go to Checkout
          </Button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
