import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Dishwashing Solutions | Kleanja",
  description: "Powerful dishwash liquids and concentrated solutions for homes and commercial food service by Kleanja.",
};

const fallbackProducts = [
  {
    name: "Dishwash Liquid",
    description: "Dishwash liquids with strong grease-cutting action",
    detailsImage: "/dishwashing/landing/dishwash-1.jpg"
  },
  {
    name: "Concentrated Dishwash",
    description: "Concentrated dish cleaning solutions for bulk users",
    detailsImage: "/dishwashing/landing/dishwash-2.jpg"
  },
  {
    name: "Commercial Kitchen Cleaner",
    description: "Commercial kitchen cleaning products",
    detailsImage: "/dishwashing/landing/dishwash-3.jpg"
  },
  {
    name: "Gentle Hand Formulations",
    description: "Gentle on hands, tough on grease",
    detailsImage: "/dishwashing/landing/dishwash-4.jpg"
  },
];

export default function DishwashingPage() {
  return (
    <ProductCategoryPage
      categorySlug="dishwashing"
      title="Dishwashing Solutions"
      tagline="Sparkling clean, every time."
      description="Kleanja's dishwashing solutions handle tough grease and food residue while ensuring hygienic cleaning for domestic kitchens and commercial food service environments."
      fullDescription="Kleanja's dishwashing solutions remove tough grease and food residue for sparkling clean utensils in homes and commercial kitchens. The line includes hand-safe dishwash liquids and high-efficiency, cost-effective concentrated formulas for bulk users."
      icon="🍽️"
      color={colors.greenDark}
      gradient={gradients.greenSoft}
      img="/dishwash.png"
      heroImage="/products/dishwash.jpg"
      products={fallbackProducts}
      keyPoints={[]}
    />
  );
}
