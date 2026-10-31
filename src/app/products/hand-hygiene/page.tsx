import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Hand Hygiene Products | Kleanja",
  description: "Liquid handwash, antibacterial formulations, and moisturizing hand hygiene solutions for homes and institutions by Kleanja.",
};

const fallbackProducts = [
  {
    name: "Liquid Handwash",
    description: "Liquid handwash — gentle and effective for daily use",
    detailsImage: "/hand-hygiene/landing/handwash-4.jpg"
  },
  {
    name: "Antibacterial Handwash",
    description: "Antibacterial handwash for enhanced germ protection",
    detailsImage: "/hand-hygiene/landing/handwash-1.jpg"
  },
  {
    name: "Moisturizing Handwash",
    description: "Moisturizing formulations for skin care",
    detailsImage: "/hand-hygiene/landing/handwash-2.jpg"
  },
  {
    name: "Institutional Hand Hygiene",
    description: "Institutional hand hygiene solutions for bulk users",
    detailsImage: "/hand-hygiene/landing/handwash-3.jpg"
  },
];

export default function HandHygienePage() {
  return (
    <ProductCategoryPage
      categorySlug="hand-hygiene"
      title="Hand Hygiene Products"
      tagline="Clean hands, healthier lives."
      description="Kleanja offers a range of hand hygiene products that combine effective cleansing with skin-friendly formulations — suitable for homes, offices, hospitals, and schools."
      fullDescription="Kleanja offers gentle liquid handwashes and antibacterial solutions that remove germs, protect skin, and encourage regular use in homes and public spaces with a pleasant fragrance."
      icon="🙌"
      color={colors.greenPrimary}
      gradient={gradients.greenPale}
      img="/handwash.png"
      heroImage="/products/handwash.jpg"
      products={fallbackProducts}
      keyPoints={[]}
    />
  );
}
