import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Floor Cleaning Solutions | Kleanja",
  description: "Multi-surface floor cleaners, disinfectant floor cleaners, herbal variants, and concentrated solutions by Kleanja.",
};

const products = [
  {
    name: "Multi-Surface Floor Cleaner",
    badge: "Best Seller",
    img: "/floor-cleaning/MultiSurfaceFloorCleaner.png",
  },
  {
    name: "Disinfectant Floor Cleaner",
    badge: "Germ Kill",
    img: "/floor-cleaning/DisinfectantFloorCleaner.png",
  },
  {
    name: "Herbal Floor Cleaner",
    badge: "Eco Friendly",
    img: "/floor-cleaning/HerbalFloorCleaner.png",
  },
  {
    name: "Concentrated Floor Cleaner",
    img: "/floor-cleaning/ConcentratedFloorCleaner.png",
  },
];

export default function FloorCleaningPage() {
  return (
    <ProductCategoryPage
      title="Floor Cleaning Solutions"
      tagline="Deep clean, lasting shine."
      description="Our floor cleaning solutions deliver deep cleaning while protecting surfaces and leaving behind a refreshing fragrance — suitable for tiles, marble, granite, and more."
      fullDescription="Kleanja's floor cleaning solutions are designed to deliver deep cleaning while protecting surfaces and leaving behind a refreshing fragrance. These products are suitable for various types of flooring including tiles, marble, granite, and other surfaces commonly used in residential and commercial spaces. We offer multi-purpose floor cleaners that effectively remove dirt, stains, and bacteria while maintaining the shine and hygiene of the surface. Our disinfectant floor cleaners are formulated to eliminate germs and provide a safe environment for homes and workplaces. Additionally, we provide concentrated floor cleaning solutions that can be diluted as per requirement, offering cost efficiency and higher usage value. Herbal and eco-friendly variants are also part of our portfolio, catering to customers who prefer natural cleaning options."
      icon="🧹"
      color={colors.bluePrimary}
      gradient={gradients.bluePale}
      img="/floor-cleaning.png"
      products={products}
      keyPoints={[
        "Multi-surface floor cleaners for tiles, marble, and granite",
        "Disinfectant floor cleaners with germ-kill action",
        "Herbal and eco-friendly variants",
        "Concentrated floor cleaning solutions for bulk use",
      ]}
    />
  );
}
