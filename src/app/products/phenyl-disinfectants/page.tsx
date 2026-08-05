import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Phenyl & Disinfectants | Kleanja",
  description: "White phenyl, black phenyl, concentrated disinfectants, and bulk cleaning solutions for large-scale hygiene by Kleanja.",
};

const products = [
  {
    name: "White Phenyl",
    description: "White phenyl for general floor and surface cleaning",
    detailsImage: "/phenyl/landing/phenyl-1.jpg"
  },
  {
    name: "Black Phenyl",
    description: "Black phenyl for industrial and heavy-duty use",
    detailsImage: "/phenyl/landing/phenyl-2.jpg"
  },
  {
    name: "Disinfectant Concentrate",
    description: "Disinfectant concentrates with hospital-grade germ kill",
    detailsImage: "/phenyl/landing/phenyl-3.jpg"
  },
  {
    name: "Bulk Cleaning Solution",
    description: "Bulk cleaning solutions for large-scale operations",
    detailsImage: "/phenyl/landing/phenyl-4.jpg"
  },
];

export default function PhenyldisinfectantsPage() {
  return (
    <ProductCategoryPage
      title="Phenyl & Disinfectants"
      tagline="Industrial-grade protection."
      description="High-quality phenyl and disinfectant products for large-scale cleaning and disinfection in hospitals, schools, offices, and public facilities."
      fullDescription="Kleanja offers high-quality white and black phenyl variants alongside germ-killing disinfectant solutions. These products are specially designed for large-scale institutional cleaning in high-traffic environments like hospitals, schools, offices, and public facilities. For bulk users managing large spaces, Kleanja also provides concentrated formulas that offer highly cost-effective sanitization."
      icon="🔬"
      color={colors.blueDark}
      gradient={gradients.blueGray}
      img={null}
      heroImage="/products/phenyl.jpg"
      products={products}
      keyPoints={[]}
    />
  );
}
