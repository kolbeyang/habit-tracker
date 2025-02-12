import { Habit } from "./types";

export const dummyHabits: Habit[] = [
  {
    id: "1",
    name: "Morning Meditation",
    description:
      "Spend 10 minutes meditating to start the day with mindfulness.",
    is_archived: false,
    icon: "list",
    user_id: "user1",
  },
  {
    id: "2",
    name: "Exercise",
    description: "Do 30 minutes of exercise each day to stay fit.",
    is_archived: false,
    icon: "workout",
    user_id: "user1",
  },
  {
    id: "3",
    name: "Reading",
    description: "Read at least 20 pages of a book every day.",
    is_archived: false,
    icon: "book",
    user_id: "user2",
  },
  {
    id: "4",
    name: "Healthy Eating",
    description: "Eat at least one fruit or vegetable in every meal.",
    is_archived: true,
    icon: "apple",
    user_id: "user3",
  },
  {
    id: "5",
    name: "Journaling",
    description: "Write a daily journal entry reflecting on the day.",
    is_archived: false,
    icon: "pencil",
    user_id: "user2",
  },
  {
    id: "0",
    name: "Sleep Tracker",
    description: "Track the quality and duration of your sleep every night.",
    is_archived: false,
    icon: "bed",
    user_id: "user3",
  },
];
