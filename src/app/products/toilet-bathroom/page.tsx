import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Toilet & Bathroom Cleaning Solutions | Kleanja",
  description: "Deep-action toilet bowl cleaners, bathroom surface cleaners, descaling solutions, and germ-kill formulations by Kleanja.",
};

const products = [
  {
    name: "Toilet Bowl Cleaner",
    badge: "Deep Action",
    img: "/bathroom-toilet-cleaner/ToiletBowelCleaner.png",
  },
  {
    name: "Bathroom Surface Cleaner",
    badge: "Multi-Surface",
    img: "/bathroom-toilet-cleaner/BathroomSurfaceCleaner.png",
  },
  {
    name: "Descaling Solution",
    badge: "Hard Water",
    img: "/bathroom-toilet-cleaner/DescalingSolution.png",
  },
  {
    name: "Bathroom Disinfectant Spray",
    badge: "Germ Kill",
    img: "/bathroom-toilet-cleaner/BathroomDisinfectantSpray.png",
  },
];

export default function ToiletBathroomPage() {
  return (
    <ProductCategoryPage
      title="Toilet & Bathroom Cleaners"
      tagline="Hygiene where it matters most."
      description="Kleanja's toilet and bathroom cleaning products are specifically designed to remove tough stains, limescale deposits, and harmful bacteria from all bathroom surfaces."
      fullDescription="Maintaining hygiene in bathrooms and toilets is essential for health and sanitation. Kleanja offers a range of toilet and bathroom cleaning products that are specifically designed to remove tough stains, limescale deposits, and harmful bacteria. Our toilet cleaners are formulated to provide deep cleaning action, ensuring the removal of stains while leaving a fresh and hygienic environment. Bathroom cleaners are suitable for tiles, fittings, and surfaces, delivering effective cleaning without causing damage. We also provide descaling solutions for removing hard water stains and deposits, making them ideal for both residential and commercial use. These products are widely used in households, hotels, hospitals, and public facilities where hygiene standards are critical."
      icon="🚿"
      color={colors.blueDark}
      gradient={gradients.blueSoft}
      img="/toilet-cleaner.png"
      products={products}
      keyPoints={[
        "Toilet bowl cleaners with deep-action formula",
        "Bathroom surface cleaners for tiles and fittings",
        "Descaling solutions for hard water deposits",
        "Germ-kill formulations for critical hygiene environments",
      ]}
    />
  );
}
