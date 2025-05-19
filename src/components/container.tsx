import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Container({children, className, ...props}: ContainerProps) {
  return (
    <div
      className={cn(`container 2xl:p-0 p-5 mx-auto`, className)}
      {...props}
    >
      {children}
    </div>
  );
}
