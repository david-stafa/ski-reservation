import { Button } from "@/components/ui/button";
import Container from "../components/container";
import AvailabilityDisplay from "@/components/landingPage/AvailabilityDisplay";
import { getSumOfReservations } from "./_actions/reservation/reservationActions";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  // Fetch data from the server
  const reservations = await getSumOfReservations();
  console.log("reservations", reservations);

  return (
    // TODO: h-[100dvh] is not supported on older browsers - find some fallback or something
    <Container className="flex flex-col h-[100dvh] justify-center w-full gap-8 relative max-w-2xl">
      <div className="w-[240px] h-[42px] relative">
        <Image
          src="/logo.png"
          alt="Ski Logo"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="scale-down"
          priority
        />
      </div>
      <h1 className="font-bold text-2xl">Rezervujte si celoroční výpůjčku lyžařského setu</h1>
      <p className="text-zinc-600">
        Rezervujte si termín a dorazte si k nám vyzkoušet a zamluvit lyžařský
        set na celou zimní sezónu 2025/2026
      </p>
      <AvailabilityDisplay reservations={reservations} />
      <div className="w-full absolute bottom-0 left-0 p-4">
        <Link href="/reservation">
          <Button variant="default" size="lg" className="w-full mb-3">
            Vytvořit rezervaci
          </Button>
        </Link>
        <Link href="/reservation/find">
          <Button variant="secondary" size="lg" className="w-full">
            Upravit rezervaci
          </Button>
        </Link>
      </div>
    </Container>
  );
}
