import {
  CheckIcon,
  ClockIcon,
  InfoIcon,
  Tally5Icon,
  XIcon,
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Button } from "../ui/button";
import Link from "next/link";
import { NOW, SEASONAL_COUNTDOWN_END, SEASONAL_ENDDATE, SKI_SETS_LIMIT } from "@/lib/constants";
import { getCachedSumOfSeasonalReservations } from "@/app/_actions/seasonalReservation/seasonalReservationActions";

const SeasonalSetsInfo = async () => {
  const isBeforeStart = NOW <= SEASONAL_COUNTDOWN_END;
  const isSoldOut = false;

  // Return before the opening date
  if (isBeforeStart) {
    return (
      <div>
        <Heading />
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4 text-black" />
          <p className="text-base text-zinc-600">
            Rezervace celoročních setů spustíme{" "}
            <span className="font-bold">
              {SEASONAL_COUNTDOWN_END.toFormat("dd.MM.yyyy")}
            </span>
          </p>
        </div>
      </div>
    );
  }

  // Return if the seasonal sets are sold out
  if (isSoldOut) {
    return (
      <div>
        <Heading />
        <div className="flex items-center gap-2">
          <XIcon className="size-4 text-red-600" />
          <p className="text-base text-zinc-600">
            Celoroční sety jsou na tuto sezónu vyprodány.
          </p>
        </div>
      </div>
    );
  }

  if (NOW >= SEASONAL_ENDDATE) {
    return (
      <div>
        <Heading />
        <div className="flex items-center gap-2">
          <XIcon className="size-4 text-red-600" />
          <p className="text-base text-zinc-600">
            Rezervace celoročních setů je na tuto sezónu ukončena.
          </p>
        </div>
      </div>
    );
  }

  const reservations = await getCachedSumOfSeasonalReservations();

  // Return if the seasonal sets are available
  return (
    <div>
      <Heading />
      <div className="flex items-center gap-2">
        <CheckIcon className="size-4 text-green-600" />
        <p className="text-base text-zinc-600">
          Rezervace celoročních setů je{" "}
          <span className="font-semibold">aktivní</span>
        </p>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <Tally5Icon className="size-4 text-black" />
        <p className="text-base text-zinc-600">
          Zbývá{" "}
          <span className="font-semibold">
            {SKI_SETS_LIMIT - reservations._total}
          </span>{" "}
          celoročních setů.
        </p>
      </div>
      <Link href="/seasonal-reservation" className="w-full">
        <Button
          variant="default"
          size="lg"
          className="w-full mb-2 mt-5 md:max-w-80"
        >
          Rezervovat CELOROČNÍ SET
        </Button>
      </Link>
    </div>
  );
};

export default SeasonalSetsInfo;

const Heading = () => {
  return (
    <div className="flex items-center gap-2 mb-1">
      <h2 className="text-lg font-bold">Rezervace celoročního setu</h2>
      <Tooltip>
        <TooltipTrigger>
          <InfoIcon className="size-4 text-black cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent className="">
          <p className="text-sm font-semibold">Co je to celoroční set?</p>
          <p className="text-sm">
            - Celoroční set zahrnuje lyžařské vybavení pro jednu osobu na celou
            zimní sezónu.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
