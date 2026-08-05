import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Glass & Surface Cleaners | Kleanja",
  description: "Streak-free glass cleaners, multi-surface sprays, and office cleaning solutions by Kleanja.",
};

const products = [
  {
    name: "Glass Cleaner",
    description: "Glass cleaners for streak-free shine on mirrors and windows",
    detailsImage: "/glass-cleaner/landing/glass-1.jpg"
  },
  {
    name: "Multi-Surface Cleaner",
    description: "Multi-surface cleaners for tables and countertops",
    detailsImage: "/glass-cleaner/landing/glass-2.jpg"
  },
  {
    name: "Office & Commercial Spray",
    description: "Office and commercial cleaning sprays",
    detailsImage: "/glass-cleaner/landing/glass-3.jpg"
  },
  {
    name: "Fast-Drying Solution",
    description: "Fast-drying, residue-free formulations",
    detailsImage: "/glass-cleaner/landing/glass-4.jpg"
  },
];

export default function GlassSurfacePage() {
  return (
    <ProductCategoryPage
      title="Glass & Surface Cleaners"
      tagline="Streak-free brilliance."
      description="Crystal-clear glass cleaners and multi-surface sprays that effectively remove dust, fingerprints, and smudges, leaving surfaces spotless and polished."
      fullDescription="Kleanja’s streak-free glass and multi-surface cleaners remove dust, fingerprints, and smudges from mirrors, countertops, and electronics, leaving homes and offices clear and polished."
      icon="✨"
      color={colors.bluePrimary}
      gradient={gradients.blueMuted}
      img="/glass-cleaner.png"
      heroImage="/products/glass.jpg"
      products={products}
      keyPoints={[]}
    />
  );
}
