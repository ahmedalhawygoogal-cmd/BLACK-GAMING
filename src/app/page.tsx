import { Footer } from "@/components/footer";
import { Games } from "@/components/games";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Trust } from "@/components/trust";
import {
  fetchActiveGames,
  fetchPlatformStats,
  fetchProductsByGameId,
} from "@/lib/supabase";

export const revalidate = 60;

export default async function HomePage() {
  const [stats, games] = await Promise.all([
    fetchPlatformStats(),
    fetchActiveGames(),
  ]);

  const featuredGame = games[0] ?? null;
  const featuredProducts = featuredGame
    ? await fetchProductsByGameId(featuredGame.id)
    : [];

  return (
    <>
      <Navbar primaryGame={featuredGame} />
      <main id="main">
        <Hero stats={stats} primaryGame={featuredGame} />
        <Games games={games} featuredProducts={featuredProducts} />
        <Trust />
      </main>
      <Footer />
    </>
  );
}
