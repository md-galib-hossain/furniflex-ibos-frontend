type Product = {
    _id: string;
    name: string;
    description: string;
    price: number;
    discountPercentage: number;
    finalPrice: number;
    imageUrl: string;
  };
  
  const ProductCard = ({ product }: { product: Product }) => {
    const { name, description, price, discountPercentage, finalPrice, imageUrl } = product;
  
    return (
      <div className="bg-white rounded-sm shadow-md p-4 flex flex-col justify-between h-full border">
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
            <span className="text-xl font-bold text-primary">€{finalPrice.toFixed(2)}</span>
            {discountPercentage > 0 && (
              <span className="text-sm text-red-500 font-semibold">
                {discountPercentage}% OFF
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 text-gray-500 line-through">
            {discountPercentage > 0 && <span>€{price.toFixed(2)}</span>}
          </div>
  
          <button className="w-full mt-4 py-2 px-3 bg-primary text-white rounded hover:bg-primary-dark">
            Add to cart
          </button>
        </div>
      </div>
    );
  };
  
  export default ProductCard;
  