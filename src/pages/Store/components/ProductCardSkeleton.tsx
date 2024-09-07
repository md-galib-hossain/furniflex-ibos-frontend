import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-sm shadow-md p-4 flex flex-col justify-between h-full border animate-pulse">
      {/* Product Image Skeleton */}
      <Skeleton className="w-full h-40 rounded-md mb-4" />

      {/* Product Name Skeleton */}
      <Skeleton className="h-5 w-3/4 rounded mb-2" />

      {/* Product Description Skeleton */}
      <Skeleton className="h-4 w-full rounded mb-4" />

      {/* Product Price and Discount Skeleton */}
      <div className="flex flex-col gap-2 mt-auto">
        <Skeleton className="h-5 w-1/2 rounded mb-2" />
        <Skeleton className="h-4 w-1/4 rounded" />
      </div>

      {/* Button Skeleton */}
      <Skeleton className="h-10 w-full rounded mt-4" />
    </div>
  );
};

export default ProductCardSkeleton;
