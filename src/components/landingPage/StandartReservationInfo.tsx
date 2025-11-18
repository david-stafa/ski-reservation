import { STANDARD_COUNTDOWN_END } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, ClockIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { NOW } from "@/lib/utils";

const StandartReservationInfo = () => {
  const now = NOW();
  const isBeforeStart = now <= STANDARD_COUNTDOWN_END;

  if (isBeforeStart) {
    return (
      <div>
        <Heading />
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-black" />
          <p className="text-base text-zinc-600">
            Rezervace standardní výpůjčky spustíme{" "}
            <span className="font-bold">
              {STANDARD_COUNTDOWN_END.toFormat("dd.MM.yyyy")}
            </span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading />
      <div className="flex items-center gap-2">
        <CheckIcon className="size-4 text-green-600" />
        <p className="text-base text-zinc-600">
          Rezervace standardní výpůjčky je{" "}
          <span className="font-semibold">aktivní</span>
        </p>
      </div>
      <Link href="/reservation/" className="w-full">
        <Button
          variant="default"
          size="lg"
          className="w-full mb-2 mt-5 md:max-w-80"
        >
          Rezervovat STANDARDNÍ VÝPŮJČKU
        </Button>
      </Link>
    </div>
  );
};

export default StandartReservationInfo;

const Heading = () => {
  return (
    <div className="flex items-center gap-2 mb-1">
      <h2 className="text-lg font-bold">Rezervace standardní výpůjčky</h2>
      <Popover>
        <PopoverTrigger>
          <InfoIcon className="size-4 text-black cursor-pointer" />
        </PopoverTrigger>
        <PopoverContent
          side="bottom"
          align="start"
          className="bg-zinc-900 text-white p-3 rounded-lg mt-1 shadow-lg border border-zinc-700/50 backdrop-blur-sm"
        >
          <p className="text-sm font-semibold">Co je to standardní výpůjčka?</p>
          <p className="text-sm">
            - Standardní výpůjčka zahrnuje lyžařské / snowboardové vybavení pro
            jednu osobu na určitou dobu (např. týden).
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};
