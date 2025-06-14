import { LoaderCircle } from "lucide-react";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-screen flex justify-center items-center mx-auto">
      <span className="flex justify-center items-center">
        <LoaderCircle
          className="animate-spin flex justify-center items-center"
          size={50}
        />
      </span>
    </div>
  );
}
