import AvailabilityDisplay from "@/components/landingPage/AvailabilityDisplay";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import Container from "../components/container";
import { getCachedSumOfReservations } from "./_actions/reservation/reservationActions";
import { SKI_SETS_LIMIT } from "@/lib/constants";
import { Link2 } from "lucide-react";
import LPHeader from "@/components/landingPage/LPHeader";
import SeasonalSetsInfo from "@/components/landingPage/SeasonalSetsInfo";
import StandartReservationInfo from "@/components/landingPage/StandartReservationInfo";

export default async function Home() {
  // Fetch data from the server
  const reservations = await getCachedSumOfReservations();

  if (reservations._total >= SKI_SETS_LIMIT) {
    return (
      <Container className="p-5 flex flex-col h-[100dvh] md:justify-center w-full gap-8 xl:gap-12 relative max-w-2xl">
        <div className="w-[200px] md:w-[240px] h-[36px] md:h-[42px] relative">
          <Image
            src="/logo.png"
            alt="Ski Logo"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="scale-down"
            priority
          />
        </div>
        <section className="flex flex-col my-auto md:my-0 gap-4">
          <h1 className="font-bold text-2xl">
            Celoroční sety jsou na tuto sezónu vyprodány.
          </h1>
          <p className="text-zinc-600">Těšíme se na vás v příští sezóně!</p>
          <Link href="https://skiblazek.cz" className="cursor-pointer">
            <Button
              variant="default"
              size="lg"
              className="px-10 py-3 mb-3 cursor-pointer"
            >
              <Link2 />
              skiblazek.cz
            </Button>
          </Link>
        </section>
      </Container>
    );
  }

  return (
    // TODO: h-[100dvh] is not supported on older browsers - find some fallback or something
    <Container className="p-5 flex flex-col h-[100dvh] justify-between md:justify-center w-full gap-8 xl:gap-12 relative max-w-2xl">
      {/* Landing Page Header */}
      <LPHeader />

      {/* Seasonal Sets Info */}
      <SeasonalSetsInfo />

      {/* Standard Reservation Info */}
      <StandartReservationInfo />

      {/* Display daily availability status of each day in the next two weeks */}
      <AvailabilityDisplay />

    </Container>
  );
}
