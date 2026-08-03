import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Dishwashing Solutions | Kleanja",
  description: "Powerful dishwash liquids and concentrated solutions for homes and commercial food service by Kleanja.",
};

const products = [
  {
    name: "Dishwash Liquid",
    badge: "Grease Cut",
  },
  {
    name: "Concentrated Dishwash",
    badge: "Concentrated",
  },
  {
    name: "Commercial Kitchen Cleaner",
    badge: "Commercial",
  },
];

export default function DishwashingPage() {
  return (
    <ProductCategoryPage
      title="Dishwashing Solutions"
      tagline="Sparkling clean, every time."
      description="Kleanja's dishwashing solutions handle tough grease and food residue while ensuring hygienic cleaning for domestic kitchens and commercial food service environments."
      fullDescription="Kleanja's dishwashing solutions are developed to handle tough grease and food residue while ensuring hygienic cleaning of utensils. Our products are suitable for both domestic kitchens and commercial food service environments. We offer dishwash liquids that provide strong grease-cutting action while being safe for hands. Concentrated dishwashing solutions are also available for bulk users, offering higher efficiency and reduced cost per use. Our products are designed to deliver sparkling clean utensils with minimal effort, making them an essential part of everyday cleaning routines."
      icon="🍽️"
      color={colors.greenDark}
      gradient={gradients.greenSoft}
      img="/dishwash.png"
      products={products}
      keyPoints={[
        "Dishwash liquids with strong grease-cutting action",
        "Concentrated dish cleaning solutions for bulk users",
        "Commercial kitchen cleaning products",
        "Gentle on hands, tough on grease",
      ]}
    />
  );
}
