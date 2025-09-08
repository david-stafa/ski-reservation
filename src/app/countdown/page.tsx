import { COUNTDOWN_END } from "@/lib/constants";
import { DateTime } from "luxon";
import { redirect } from "next/navigation";

const Countdown = () => {
  // redirect to home page if countdown end is reached
  if (DateTime.local({zone: "Europe/Prague"}) >= COUNTDOWN_END) {
    redirect("/");
  }

  return (
    <div className="w-full h-[100dvh] flex flex-col items-center justify-center gap-4 p-2">
      <h1 className="text-xl font-semibold mb-4">
        Rezervace spustíme v pátek, 26. září.
      </h1>
      <p className="text-sm text-zinc-600">Jak to bude probíhat?</p>
      <ul className="list-disc pl-5 text-sm text-zinc-600 flex flex-col gap-1 justify-center items-center">
        <li>
          Vyplníte krátký formulář, ve kterém si vyberete datum a čas rezervace
        </li>
        <li>
          Ve vámi vybraný den a hodinu se k nám dostavíte a vyzkoušíte si
          lyžařský set.
          <span className="font-semibold">Prosíme, přijďte včas!</span>
        </li>
        <li>
          Do 14 dní se vám ozveme a vy si k nám půjdete vše vyzvednout a
          zaplatit
        </li>
      </ul>

      <p className="text-sm text-zinc-600 italic mt-4">
        Těšíme se na vás, Ski Blažek
      </p>
    </div>
  );
};

export default Countdown;
