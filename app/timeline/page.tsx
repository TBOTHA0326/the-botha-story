import TimelineExperience from "@/components/TimelineExperience";

const timeline = [
  {
    time: "14:30",
    title: "Guests arrive",
    detail: "Champagne, soft strings, and a few quiet minutes to find your seat."
  },
  {
    time: "15:00",
    title: "Ceremony",
    detail: "Tiaan and Hannah exchange vows with their closest people around them."
  },
  {
    time: "16:00",
    title: "Portrait hour",
    detail: "Family photographs, couple portraits, and drinks on the lawn."
  },
  {
    time: "18:00",
    title: "Dinner",
    detail: "A candlelit table, speeches, and the first long meal of the evening."
  },
  {
    time: "20:00",
    title: "First dance",
    detail: "The floor opens with Tiaan and Hannah, then everyone joins in."
  },
  {
    time: "22:30",
    title: "Late-night sendoff",
    detail: "One last toast before the newlyweds disappear into the night."
  }
];

export const metadata = {
  title: "Wedding Timeline | Tiaan & Hannah"
};

export default function TimelinePage() {
  return <TimelineExperience timeline={timeline} />;
}
