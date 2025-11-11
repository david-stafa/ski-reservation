import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { Link2Icon } from "lucide-react";

const OffSeasonLP = () => {
  return (
    <>
      <div className="w-[200px] md:w-[240px] h-[36px] md:h-[42px]">
        <Image
          src="/logo.png"
          alt="Ski Logo"
          width={240}
          height={42}
          className="object-contain w-full h-full"
          priority
        />
      </div>
      <section className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Sezóna 2025/2026 je ukončena</h1>
        <p className="text-lg text-zinc-600">
          Byla to jízda! Děkujeme všem našim zákazníkům a těšíme se na vás v
          příští sezóně!
        </p>
        <Link href="https://skiblazek.cz" className="cursor-pointer">
          <Button
            variant="default"
            size="lg"
            className="px-10 py-3 mb-3 cursor-pointer"
          >
            <Link2Icon />
            skiblazek.cz
          </Button>
        </Link>
      </section>
    </>
  );
};

export default OffSeasonLP;
