import { HabitIconName } from "@/types/habitIcon";

export interface Habit {
  id: string;
  name: string;
  description: string;
  is_archived: boolean;
  icon: HabitIconName;
  user_id: string;
  created_at: string;
}

export interface HabitCompletion {
  id: string;
  habit_id: string;
  date: string;
}
