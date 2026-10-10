import { MarketplaceView } from "@/components/features/MarketplaceView";

// Next.js Route Cache / Incremental Static Regeneration (1 hour)
export const revalidate = 3600;

export default function Home() {
  return <MarketplaceView />;
}
