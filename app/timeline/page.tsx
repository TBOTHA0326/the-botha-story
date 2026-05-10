import TimelineExperience from "@/components/TimelineExperience";

const timeline = [
  {
    time: "15:00",
    title: "Guests arrive",
    detail: "A few quiet minutes to find your seat."
  },
  {
    time: "15:30",
    title: "Ceremony",
    detail: "Tiaan and Hannah exchange vows with their closest people around them."
  },
  {
    time: "16:30",
    title: "Canapes On The Island & Portrait Hour",
    detail: "Family photographs, couple portraits, and drinks on the lawn."
  },
  {
    time: "17:30",
    title: "Guests Move To The Reception",
    detail: "Find your name and take your seat."
  },
  {
    time: "18:00",
    title: "Newly Weds Enter The Reception",
    detail: "Candlelit tables, prayer and the first meal of the evening."
  },
  {
    time: "18:20",
    title: "Speeches By Loved One's",
    detail: "Heartfelt words from the people who know and love Tiaan and Hannah most."
  },
  {
    time: "19:30",
    title: "Main Course",
    detail: "Sit back, enjoy the meal, and soak in the evening."
  },
  {
    time: "20:00",
    title: "Newly Weds Open The Dancefloor",
    detail: "Tiaan and Hannah share their first dance — then the floor is yours."
  },
  {
    time: "22:00",
    title: "Venue Closes",
    detail: "The night comes to an end — thank you for being part of this day."
  }
];

export const metadata = {
  title: "Wedding Timeline | Tiaan & Hannah"
};

export default function TimelinePage() {
  return <TimelineExperience timeline={timeline} />;
}
