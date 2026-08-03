import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Glass & Surface Cleaners | Kleanja",
  description: "Streak-free glass cleaners, multi-surface sprays, and office cleaning solutions by Kleanja.",
};

const products = [
  {
    name: "Glass Cleaner",
    badge: "Streak Free",
  },
  {
    name: "Multi-Surface Cleaner",
    badge: "Multi-Surface",
  },
  {
    name: "Office & Commercial Spray",
    badge: "Commercial",
  },
];

export default function GlassSurfacePage() {
  return (
    <ProductCategoryPage
      title="Glass & Surface Cleaners"
      tagline="Streak-free brilliance."
      description="Crystal-clear glass cleaners and multi-surface sprays that effectively remove dust, fingerprints, and smudges, leaving surfaces spotless and polished."
      fullDescription="Clean and shiny surfaces contribute significantly to the overall appearance of any space. Kleanja's glass and surface cleaners are formulated to provide streak-free cleaning for glass, mirrors, and other surfaces. These products effectively remove dust, fingerprints, and smudges, leaving surfaces clear and polished. Multi-surface cleaners are also available for cleaning tables, countertops, office furniture, and electronic surfaces. Our solutions are widely used in homes, offices, retail outlets, and commercial establishments where presentation and cleanliness are equally important."
      icon="✨"
      color={colors.bluePrimary}
      gradient={gradients.blueMuted}
      img="/glass-cleaner.png"
      products={products}
      keyPoints={[
        "Glass cleaners for streak-free shine on mirrors and windows",
        "Multi-surface cleaners for tables and countertops",
        "Office and commercial cleaning sprays",
        "Fast-drying, residue-free formulations",
      ]}
    />
  );
}
