import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";

const Store = () => {
  const products = [
    {
      _id: "66d9954d4d846bc1694055df",
      name: "Window Curtain",
      description: "Beautiful curtain",
      price: 20,
      discountPercentage: 2,
      imageUrl: "https://example.com/products/modern-leather-sofa.jpg",
      stock: 10,
      category: "66d98981c81e1063a8775eb1",
      subCategory: null,
      createdAt: "2024-09-05T11:26:05.261Z",
      updatedAt: "2024-09-05T12:13:47.361Z",
      finalPrice: 19.6,
      id: "66d9954d4d846bc1694055df",
    },
    {
      _id: "66d9816cea9b620c97a8a9a9",
      name: "Modern Leather Sofa",
      description:
        "A stylish, comfortable leather sofa with a modern design, perfect for living rooms.",
      price: 899.99,
      discountPercentage: 15,
      imageUrl: "https://example.com/products/modern-leather-sofa.jpg",
      stock: 20,
      category: "66d97f0aea9b620c97a8a98b",
      subCategory: null,
      createdAt: "2024-09-05T06:30:00.000Z",
      finalPrice: 764.9915,
      id: "66d9816cea9b620c97a8a9a9",
    },
    {
      _id: "66d9816cea9b620c97a8a9aa",
      name: "Classic Wooden Dining Table",
      description:
        "A solid wood dining table with seating for six. Elegant and timeless for any home.",
      price: 499.99,
      discountPercentage: 10,
      imageUrl: "https://example.com/products/wooden-dining-table.jpg",
      stock: 12,
      category: "66d97f0aea9b620c97a8a98b",
      subCategory: null,
      createdAt: "2024-09-05T06:30:00.000Z",
      finalPrice: 449.991,
      id: "66d9816cea9b620c97a8a9aa",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto p-4 mt-8">
      <div className="grid grid-cols-12 items-start justify-center gap-8">
        {/* Left Sidebar - Categories */}
        <div className="col-span-12 md:col-span-2 bg-card h-fit px-3 py-5 space-y-3 border-e">
          <Categories />
        </div>

        {/* Right Content - Products */}
        <div className="col-span-12 md:col-span-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
