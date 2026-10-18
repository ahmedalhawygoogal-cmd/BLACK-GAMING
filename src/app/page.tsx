import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Trust } from "@/components/trust";
import { fetchPlatformStats } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const stats = await fetchPlatformStats();

  return (
    <>
      <Navbar />
      <main id="main">
        <Hero stats={stats} />
        <Games />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
