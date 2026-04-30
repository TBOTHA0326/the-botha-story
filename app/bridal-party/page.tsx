import BridalPartyExperience from "@/components/BridalPartyExperience";
import { bridalParty } from "@/lib/assets";

export const metadata = {
  title: "Bridal Party | Tiaan & Hannah"
};

export default function BridalPartyPage() {
  return <BridalPartyExperience members={bridalParty} />;
}
