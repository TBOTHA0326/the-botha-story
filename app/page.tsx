import { engagementImages, otherImages } from "@/lib/assets";
import WeddingExperience from "@/components/WeddingExperience";

export default function Home() {
  return <WeddingExperience engagementImages={engagementImages} otherImages={otherImages} />;
}
