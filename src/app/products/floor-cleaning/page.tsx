import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Floor Cleaning Solutions | Kleanja",
  description: "Multi-surface floor cleaners, disinfectant floor cleaners, herbal variants, and concentrated solutions by Kleanja.",
};

const fallbackProducts = [
  {
    name: "Multi-Surface Floor Cleaner",
    img: "/floor-cleaning/MultiSurfaceFloorCleaner.png",
    description: "Multi-surface floor cleaners for tiles, marble, and granite",
    detailsImage: "/floor-cleaning/landing/floor-1.jpg"
  },
  {
    name: "Disinfectant Floor Cleaner",
    img: "/floor-cleaning/DisinfectantFloorCleaner.png",
    description: "Disinfectant floor cleaners with germ-kill action",
    detailsImage: "/floor-cleaning/landing/floor-2.jpg"
  },
  {
    name: "Herbal Floor Cleaner",
    img: "/floor-cleaning/HerbalFloorCleaner.png",
    description: "Herbal and eco-friendly variants",
    detailsImage: "/floor-cleaning/landing/floor-3.jpg"
  },
  {
    name: "Concentrated Floor Cleaner",
    img: "/floor-cleaning/ConcentratedFloorCleaner.png",
    description: "Concentrated floor cleaning solutions for bulk use",
    detailsImage: "/floor-cleaning/landing/floor-4.jpg"
  },
];

export default function FloorCleaningPage() {
  return (
    <ProductCategoryPage
      categorySlug="floor-cleaning"
      title="Floor Cleaning Solutions"
      tagline="Deep clean, lasting shine."
      description="Our floor cleaning solutions deliver deep cleaning while protecting surfaces and leaving behind a refreshing fragrance — suitable for tiles, marble, granite, and more."
      fullDescription="Kleanja's versatile floor cleaners deliver deep cleaning, germ protection, and fresh fragrances for tiles, marble, and granite. The range includes multi-purpose, disinfectant, concentrated, and eco-friendly herbal options designed to maintain surface shine and ensure hygiene in homes and workplaces."
      color={colors.bluePrimary}
      gradient={gradients.bluePale}
      img="/floor-cleaning.png"
      heroImage="/products/floorclean.jpg"
      products={fallbackProducts}
      keyPoints={[]}
    />
  );
}
