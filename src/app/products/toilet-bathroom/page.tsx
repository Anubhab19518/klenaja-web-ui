import ProductCategoryPage from "@/components/ProductCategoryPage";
import { colors, gradients } from "@/design-system";

export const metadata = {
  title: "Toilet & Bathroom Cleaning Solutions | Kleanja",
  description: "Deep-action toilet bowl cleaners, bathroom surface cleaners, descaling solutions, and germ-kill formulations by Kleanja.",
};

const products = [
  {
    name: "Toilet Bowl Cleaner",
    img: "/bathroom-toilet-cleaner/ToiletBowelCleaner.png",
    description: "Toilet bowl cleaners with deep-action formula",
    detailsImage: "/bathroom-toilet-cleaner/landing/bathroom-1.jpg"
  },
  {
    name: "Bathroom Surface Cleaner",
    img: "/bathroom-toilet-cleaner/BathroomSurfaceCleaner.png",
    description: "Bathroom surface cleaners for tiles and fittings",
    detailsImage: "/bathroom-toilet-cleaner/landing/bathroom-2.jpg"
  },
  {
    name: "Descaling Solution",
    img: "/bathroom-toilet-cleaner/DescalingSolution.png",
    description: "Descaling solutions for hard water deposits",
    detailsImage: "/bathroom-toilet-cleaner/landing/bathroom-3.jpg"
  },
  {
    name: "Bathroom Disinfectant Spray",
    img: "/bathroom-toilet-cleaner/BathroomDisinfectantSpray.png",
    description: "Germ-kill formulations for critical hygiene environments",
    detailsImage: "/bathroom-toilet-cleaner/landing/bathroom-4.jpg"
  },
];

export default function ToiletBathroomPage() {
  return (
    <ProductCategoryPage
      title="Toilet & Bathroom Cleaners"
      tagline="Hygiene where it matters most."
      description="Kleanja's toilet and bathroom cleaning products are specifically designed to remove tough stains, limescale deposits, and harmful bacteria from all bathroom surfaces."
      fullDescription="Maintaining restroom hygiene is essential for health and sanitation. Kleanja offers specialized toilet and bathroom cleaners that remove tough stains, limescale, and harmful bacteria while leaving a fresh scent. The bathroom cleaner safely sanitizes tiles and fittings, while the descaling solutions eliminate hard water deposits. Ideal for residential and commercial use, these products ensure high hygiene standards in homes, hotels, hospitals, and public facilities."
      icon="🚿"
      color={colors.blueDark}
      gradient={gradients.blueSoft}
      img="/toilet-cleaner.png"
      heroImage="/products/bathroom.jpg"
      products={products}
      keyPoints={[]}
    />
  );
}
