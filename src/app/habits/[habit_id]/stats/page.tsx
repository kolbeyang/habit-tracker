"use client";

import Stats from "@/components/Stats";
import { isArray } from "lodash";
import { useParams } from "next/navigation";

const StatsPage = () => {
  const params = useParams();
  const habitId = isArray(params.habit_id)
    ? params.habit_id.at(0)
    : params.habit_id;

  return <Stats habitId={habitId} />;
};

export default StatsPage;
