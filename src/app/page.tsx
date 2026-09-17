import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Intro from "@/components/Intro";
import Businesses from "@/components/Businesses";
import Story from "@/components/Story";
import Sustainability from "@/components/Sustainability";
import FinalCta from "@/components/FinalCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <Intro />
      <Businesses />
      <Story />
      <Sustainability />
      <FinalCta />
    </>
  );
}
