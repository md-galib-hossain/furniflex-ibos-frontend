import useGetCategories from "@/hooks/useGetCategories";
import { useState } from "react";

type Category = {
  _id: string;
  name: string;
  parentCategory: Category | null;
  createdAt: string;
  updatedAt: string;
};

const Categories = () => {
    const { data, isLoading } = useGetCategories();
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
  
    const toggleExpand = (categoryId: string) => {
      setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
    };
  
    return (
      <div className="min-h-[550px] bg-card p-2 rounded">
        <ul className="space-y-2">
          {categories.map((category: Category) => (
            <li key={category._id}>
              <div className="flex items-center justify-between rounded hover:bg-primary dark:text-white px-5 py-3 text-md text-primary-content">

                {category.name}
  
                {getSubcategories(category._id).length > 0 && (
                  <button onClick={() => toggleExpand(category._id)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 transform transition-transform ${
                        expandedCategory === category._id ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                )}
              </div>
  
              {expandedCategory === category._id && (
                <ul className="mt-2 space-y-1 px-4">
                  {getSubcategories(category._id).map((subCategory: Category) => (
                    <li key={subCategory._id}>
                      <a
                        href="#"
                        className="block rounded px-4 py-2 text-sm font-medium dark:text-white hover:bg-primary"
                      >
                        {subCategory.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default Categories;
  
