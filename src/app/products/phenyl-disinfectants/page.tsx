import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Phenyl & Disinfectants | Kleanja",
  description: "White phenyl, black phenyl, concentrated disinfectants, and bulk cleaning solutions for large-scale hygiene by Kleanja.",
};

const products = [
  {
    name: "White Phenyl",
    badge: "Classic",
  },
  {
    name: "Black Phenyl",
    badge: "Industrial",
  },
  {
    name: "Disinfectant Concentrate",
    badge: "Hospital Grade",
  },
  {
    name: "Bulk Cleaning Solution",
    badge: "Bulk Supply",
  },
];

export default function PhenyldisinfectantsPage() {
  return (
    <ProductCategoryPage
      title="Phenyl & Disinfectants"
      tagline="Industrial-grade protection."
      description="High-quality phenyl and disinfectant products for large-scale cleaning and disinfection in hospitals, schools, offices, and public facilities."
      fullDescription="For large-scale cleaning and disinfection, Kleanja offers high-quality phenyl and disinfectant products. These are widely used in institutions such as hospitals, schools, offices, and public facilities. Our phenyl products are available in different variants, including white and black phenyl, each designed for specific cleaning requirements. Disinfectant solutions are formulated to kill germs and maintain hygiene in high-traffic areas. We also provide concentrated disinfectants for bulk users, enabling cost-effective cleaning solutions for large spaces."
      icon="🔬"
      color={colors.blueDark}
      gradient={gradients.blueGray}
      img={null}
      products={products}
      keyPoints={[
        "White phenyl for general floor and surface cleaning",
        "Black phenyl for industrial and heavy-duty use",
        "Disinfectant concentrates with hospital-grade germ kill",
        "Bulk cleaning solutions for large-scale operations",
      ]}
    />
  );
}
