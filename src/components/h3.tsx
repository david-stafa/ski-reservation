import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface H2Props {
  children: ReactNode;
  className?: string;
}

export default function H3(props: H2Props) {
  return <h3 className={cn("text-lg font-bold mb-1")}>{props.children}</h3>;
}
