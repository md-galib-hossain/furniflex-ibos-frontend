import { useState } from "react";
import useGetCategories from "@/hooks/useGetCategories";
import { Check, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";

type Category = {
  _id: string;
  name: string;
  parentCategory: Category | null;
  createdAt: string;
  updatedAt: string;
};

type CategoryDropdownButtonProps = {
  onCategoryChange: (categoryId: string | null, isSubCategory: boolean) => void;
};

const CategoryDropdownButton = ({
  onCategoryChange,
}: CategoryDropdownButtonProps) => {
  const { data, isLoading } = useGetCategories();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  if (isLoading) {
    return "..loading";
  }

  if (!data || !data.data) {
    return "No categories found";
  }

  const categories = data.data.filter(
    (category: Category) => category.parentCategory === null
  );
  const subCategories = data.data.filter(
    (category: Category) => category.parentCategory !== null
  );

  const getSubcategories = (parentId: string) => {
    return subCategories.filter(
      (subcategory: Category) => subcategory.parentCategory?._id === parentId
    );
  };

  const handleCategoryClick = (categoryId: string | null, isSubCategory: boolean) => {
    onCategoryChange(categoryId, isSubCategory);
    setSelectedCategory(categoryId);
    setExpandedCategory(null); // Close dropdown when a subcategory is clicked
  };

  const handleParentCategoryClick = (categoryId: string) => {
    // Handle click on parent category: select it and toggle subcategories
    if (expandedCategory === categoryId) {
      setExpandedCategory(null); // Collapse if already expanded
    } else {
      setExpandedCategory(categoryId); // Expand the selected category
    }
    onCategoryChange(categoryId, false); // Select parent category
    setSelectedCategory(categoryId); // Mark category as selected
  };

  return (
    <div className="w-full md:hidden"> {/* Show only on small devices */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between w-full px-4 py-2 bg-primary text-white rounded-md">
            <span>{selectedCategory ? data.data.find((cat: Category) => cat._id === selectedCategory)?.name : "Filter Categories"}</span>
            <ChevronDown className="ml-2" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60 rounded-md"> {/* Adjust dropdown size */}
          {categories.map((category: Category) => (
            <DropdownMenuSub key={category._id}>
              <DropdownMenuSubTrigger className="flex items-center w-full px-4 py-2">
                <span onClick={() => handleParentCategoryClick(category._id)}>
                  {category.name}
                </span>
                {selectedCategory === category._id && <Check className="ml-auto" />}
              </DropdownMenuSubTrigger>
              
              {expandedCategory === category._id && (
                <DropdownMenuSubContent className="w-full">
                  {getSubcategories(category._id).map((subcategory: Category) => (
                    <DropdownMenuItem
                      key={subcategory._id}
                      onClick={() => handleCategoryClick(subcategory._id, true)}
                      className="flex items-center w-full px-4 py-2"
                    >
                      {subcategory.name}
                      {selectedCategory === subcategory._id && (
                        <Check className="ml-auto" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuSubContent>
              )}
            </DropdownMenuSub>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CategoryDropdownButton;
