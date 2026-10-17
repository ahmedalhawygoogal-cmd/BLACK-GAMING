import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Trust } from "@/components/trust";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Games />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
