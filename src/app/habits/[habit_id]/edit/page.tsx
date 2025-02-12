"use client";

import Update from "@/components/Upsert/Update";
import { isArray } from "lodash";
import { useParams } from "next/navigation";

const UpdatePage = () => {
  const params = useParams();
  const habitId = isArray(params.habit_id)
    ? params.habit_id.at(0)
    : params.habit_id;

  return <Update habitId={habitId} />;
};

export default UpdatePage;
