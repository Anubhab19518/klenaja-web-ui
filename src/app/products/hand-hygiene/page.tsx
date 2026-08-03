import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Hand Hygiene Products | Kleanja",
  description: "Liquid handwash, antibacterial formulations, and moisturizing hand hygiene solutions for homes and institutions by Kleanja.",
};

const products = [
  {
    name: "Liquid Handwash",
    badge: "Everyday Use",
  },
  {
    name: "Antibacterial Handwash",
    badge: "Antibacterial",
  },
  {
    name: "Moisturizing Handwash",
    badge: "Skin Care",
  },
  {
    name: "Institutional Hand Hygiene",
    badge: "Institutional",
  },
];

export default function HandHygienePage() {
  return (
    <ProductCategoryPage
      title="Hand Hygiene Products"
      tagline="Clean hands, healthier lives."
      description="Kleanja offers a range of hand hygiene products that combine effective cleansing with skin-friendly formulations — suitable for homes, offices, hospitals, and schools."
      fullDescription="Hand hygiene is one of the most important aspects of maintaining personal health and preventing the spread of germs. Kleanja offers a range of hand hygiene products that combine effective cleansing with skin-friendly formulations. Our liquid handwash products are designed to remove dirt and germs while being gentle on the skin. We also provide antibacterial handwash solutions that offer additional protection against harmful microorganisms. These products are suitable for both household and institutional use, including offices, schools, hospitals, and public spaces. Our focus is to deliver products that encourage regular hand hygiene through ease of use and pleasant fragrance."
      icon="🙌"
      color={colors.greenPrimary}
      gradient={gradients.greenPale}
      img="/handwash.png"
      products={products}
      keyPoints={[
        "Liquid handwash — gentle and effective for daily use",
        "Antibacterial handwash for enhanced germ protection",
        "Moisturizing formulations for skin care",
        "Institutional hand hygiene solutions for bulk users",
      ]}
    />
  );
}
