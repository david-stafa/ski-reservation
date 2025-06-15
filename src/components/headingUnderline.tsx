import { cn } from "@/lib/utils";

export default function HeadingUnderline({ className }: { className?: string }) {
  return (
    <div className={cn("w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-700 mx-auto rounded-full mb-8", className)} />
  );
}