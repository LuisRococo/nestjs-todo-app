import CardsSection from "@/components/home/CardsSection/CardsSection";
import Hero from "@/components/home/Hero/Hero";
import InfoSection from "@/components/home/InfoSection/InfoSection";

export default function Home() {
  return (
    <main>
      <h1 className="tw-font-bold tw-text-2xl">
        <Hero />
        <InfoSection />
        <CardsSection />
      </h1>
    </main>
  );
}
