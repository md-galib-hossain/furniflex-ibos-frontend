import { useState, useEffect } from "react";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import useGetProducts from "@/hooks/useGetProducts";
import MyPagination from "@/components/MyPagination";
import { Input } from "@/components/ui/input";
import usePagination from "@/hooks/usePagination";
import { useDebounce } from "@/hooks/useDebounce";
import { IProduct } from "@/types/Product";
import ProductCardSkeleton from "./components/ProductCardSkeleton";

const Store = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [totalItems, setTotalItems] = useState(0);
  const [category, setCategory] = useState<string | null>(null);
  const [subCategory, setSubCategory] = useState<string | null>(null); 

  // Use pagination hook
  const { page, limit, pageCount, handleChangePage, handleChangeLimit } =
    usePagination({
      initialPage: 1,
      initialLimit: 6,
      totalItems,
    });

  // Debounce the search term with a 600ms delay
  const debouncedSearchTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });

  // Fetch products using the debounced search term, category, and subCategory
  const { data, isLoading } = useGetProducts({
    page,
    limit,
    searchTerm: debouncedSearchTerm,
    category,
    subCategory,
  });

  useEffect(() => {
    if (data?.meta?.total) {
      setTotalItems(data.meta.total);
    }
  }, [data]);

  const products = data?.data;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (
    categoryId: string | null,
    isSubCategory: boolean
  ) => {
    if (isSubCategory) {
      setSubCategory(categoryId);
      setCategory(null); 
    } else {
      setCategory(categoryId); 
      setSubCategory(null);
    }
  };

  
  return (
    <div className="max-w-screen-2xl mx-auto p-4 ">
      <div className="grid grid-cols-12 items-start justify-center gap-8">
        {/* Left Sidebar - Categories */}
        <div className="hidden lg:block col-span-12 lg:col-span-2 bg-card h-fit px-3 py-5 space-y-3 border-e">
          <Categories onCategoryChange={handleCategoryChange} />{" "}
        </div>

       


        {/* Right Content - Products */}
        <div className="col-span-12 lg:col-span-10 my-10 ">
          
          {/* Centered Search Input */}
          <div className="flex justify-center mb-5">
            <Input
              placeholder="Search products"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full md:w-1/2 border rounded p-2 bg-card dark:bg-secondary"
            />
           

          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.length < 1 ? (
                <div className="flex justify-center items-center h-64 w-full col-span-full">
                  <p className="text-2xl font-bold">There is no item</p>
                </div>
              ) : (
                products?.map((product: IProduct) => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </div>
          )}

          {/* Pagination */}
          {!isLoading && (
            <div className="flex justify-between items-center my-10">
              <select
                onChange={(e) => handleChangeLimit(parseInt(e.target.value))}
                value={limit}
                className="border rounded p-2 bg-card"
              >
                {[6, 12, 18].map((value) => (
                  <option key={value} value={value}>
                    {value} per page
                  </option>
                ))}
              </select>

              <MyPagination
                pageCount={pageCount}
                page={page}
                handleChange={handleChangePage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store;
