import { fetchBloodStrikeGame, fetchBloodStrikeProducts } from "@/lib/supabase";
import { BloodStrikeClient } from "./blood-strike-client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Force dynamic server-side rendering so it always fetches fresh products from Supabase
export const dynamic = "force-dynamic";

export default async function BloodStrikePage() {
  // Server-side fetching: data is loaded on the server before HTML is streamed
  const [game, products] = await Promise.all([
    fetchBloodStrikeGame(),
    fetchBloodStrikeProducts(),
  ]);

  return (
    <>
      <Navbar />
      <BloodStrikeClient initialGame={game} initialProducts={products} />
      <Footer />
    </>
  );
}
