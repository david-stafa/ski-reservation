import Image from "next/image";

const LPHeader = () => {
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
        <h1 className="font-bold text-2xl">
          Rezervujte si termín na vypůjčení lyžařského setu
        </h1>
        <p className="text-zinc-600">
          Vyplněním krátkého formuláře si u nás zarezervujete časový blok, ve
          kterém s vámi domluvíme vše potřebné k zapůjčení lyžařského /
          snowboardového setu na vámi požadovaný termín
        </p>
      </section>
    </>
  );
};

export default LPHeader;