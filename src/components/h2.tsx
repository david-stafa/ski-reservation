import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface H2Props {
  children: ReactNode;
  className?: string;
}

export default function H2(props: H2Props) {
  return <h2 className={cn("text-xl font-bold")}>{props.children}</h2>;
}
