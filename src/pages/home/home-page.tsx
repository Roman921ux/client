import { Footer } from "@/shared/ui/footer";
import FightSection from "./ui/fight-section";
import FighterSection from "./ui/fighter-section";
import ProductSection from "./ui/product-section";

export default function HomePage() {
  return (
    <div className="w-full">
      <FightSection />
      <FighterSection />
      <ProductSection />
      <Footer />
    </div>
  );
}
