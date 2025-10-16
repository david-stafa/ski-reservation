import { CheckIcon, ClockIcon, InfoIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";
import { Button } from "../ui/button";

const StandartReservationInfo = () => {
  const isBefore = false;

  if (isBefore) {
    return (
      <div>
        <Heading />
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-black" />
          <p className="text-base text-zinc-600">
            Rezervace standardní výpůjčky spustíme v TERMÍNU
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
        <Button variant="default" size="lg" className="w-full mb-2 mt-5 md:max-w-80">
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
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="size-4 text-black cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="">
          <p className="text-sm font-semibold">Co je to standardní výpůjčka?</p>
          <p className="text-sm">
            - Standardní výpůjčka zahrnuje lyžařské / snowboardové vybavení pro
            jednu osobu na určitou dobu (např. týden).
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
