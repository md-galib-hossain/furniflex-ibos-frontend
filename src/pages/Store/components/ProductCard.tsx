import { Button } from "@/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import useAddToCart from "@/hooks/useAddtoCart";
import { IProduct } from "@/types/Product";
import { useContext, useState } from "react";

const ProductCard = ({ product }: { product: IProduct }) => {
  const { user, loading: userLoading } = useContext(AuthContext);

  const { _id, name, description, price, discountPercentage, finalPrice, imageUrl } = product;
  const { mutate: addToCart } = useAddToCart();

  const [quantity] = useState(1);

  const handleAddToCart = () => {
    if (!userLoading && user?.email) {
      const cartData = {
        email: user.email, 
        itemId: _id,      
        itemPrice: finalPrice, 
        quantity: quantity, 
        itemImage: imageUrl, 
        itemName: name
      };

      addToCart(cartData);
    }
  };

  return (
    <div className="bg-card dark:bg-secondary rounded-sm shadow-md p-4 flex flex-col justify-between h-full border">
      {/* Product Image */}
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />

      <h3 className="text-lg font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xl font-bold text-primary">
            €{finalPrice.toFixed(2)}
          </span>
          {discountPercentage > 0 && (
            <span className="text-sm text-red-500 font-semibold">
              {discountPercentage}% OFF
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-gray-500 line-through">
          {discountPercentage > 0 && <span>€{price.toFixed(2)}</span>}
        </div>

        <Button
          onClick={handleAddToCart}
          className="w-full mt-4 py-2 px-3 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
