"use client";

import useDocumentHeight from "@/hooks/useDocumentHeight";
import { cn } from "@/utils/classNameMerge";
import { HTMLAttributes } from "react";

const ScreenContainer = ({
  children,
  className,
}: HTMLAttributes<HTMLDivElement>) => {
  const docHeight = useDocumentHeight();

  return (
    <div
      className={cn("h-screen w-screen", className)}
      style={docHeight ? { height: docHeight } : {}}
    >
      {children}
    </div>
  );
};

export default ScreenContainer;
