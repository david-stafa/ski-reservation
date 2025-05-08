import { Button } from "@/components/ui/button";
import Container from "../components/container";
import { getSumOfReservations } from "./_actions/reservationActions";
import Image from "next/image";
import Link from "next/link";

const SKI_SETS_TOTAL = 200;

export default async function Home() {
  // Fetch data from the server
  const reservations = await getSumOfReservations();

  return (
    <Container className="flex flex-col w-full h-screen items-start justify-center gap-8 relative">
      <Image src="/logo.png" alt="Ski Logo" width={170} height={170} />
      <h1 className="font-bold text-2xl">
        Rezervace celoročních setů
      </h1>
      <p className="text-zinc-600">Rezervujte si termín a dorazte si k nám vyzkoušet a zamluvit lyžařský set na celou zimní sezónu 2025/2026</p>
      <div className="text-zinc-700 text-base">Zbývá volných míst: {SKI_SETS_TOTAL - reservations}</div>
      <div className="w-full absolute bottom-0 left-0 p-4">
        <Link href='/reservation'><Button variant="default" className="w-full mb-3">Vytvořit rezervaci</Button></Link>
        <Button variant="secondary" className="w-full">Upravit rezervaci</Button>
      </div>
    </Container>
  );
}
