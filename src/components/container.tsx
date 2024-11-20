import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container(props: ContainerProps) {
  return (
    <div className={cn(`container p-5 2xl:p-0 mx-auto ${props.className}`)}>
      {props.children}
    </div>
  );
}
