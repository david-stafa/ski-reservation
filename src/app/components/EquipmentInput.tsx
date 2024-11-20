"use client";

import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { Reservation, SkiSet } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useEffect, useState } from "react";

interface EquipmentInput {
  reservation: Reservation | object;
  setReservation: React.Dispatch<React.SetStateAction<object | Reservation>>;
}

type Equipment = "ski" | "skiBoot" | "skiPole" | "skiHelmet" | "skiGoogle";

export default function EquipmentInput() {
  const [skiSet, setSkiset] = useState<SkiSet>({
    id: 0,
    ski: false,
    skiBoot: false,
    skiPole: false,
    skiHelmet: false,
    skiGoogle: false,
    ageCategoryId: "",
    reservationId: "",
  });

  function handleEquipmentClick(equipment: Equipment) {
    setSkiset({ ...skiSet, [equipment]: !skiSet[equipment] });
  }

  useEffect(() => {
    console.log(skiSet);
  }, [skiSet]);

  return (
    <section>
      <H3>Jaké vybavení si chcete půjčit?</H3>
      <h4>Vyberte jedno ci vice lyz. vybaveni.</h4>
      <div className="flex gap-4 justify-between">
        <EquipmentButton
          equipment="ski"
          equipmentLabel="Lyže"
          logoUrl="/Ski-icon.png"
          handleClick={handleEquipmentClick}
        />
        <EquipmentButton
          equipment="skiBoot"
          equipmentLabel="Boty"
          logoUrl="/Ski-Boots-icon.png"
          handleClick={handleEquipmentClick}
        />
        <EquipmentButton
          equipment="skiPole"
          equipmentLabel="Hole"
          logoUrl="/Ski-Poles-icon.png"
          handleClick={handleEquipmentClick}
        />
        <EquipmentButton
          equipment="skiHelmet"
          equipmentLabel="Helma"
          logoUrl="/Ski-Helmet-icon.png"
          handleClick={handleEquipmentClick}
        />
        <EquipmentButton
          equipment="skiGoogle"
          equipmentLabel="Brýle"
          logoUrl="/Ski-Goggles-icon.png"
          handleClick={handleEquipmentClick}
        />
      </div>
    </section>
  );
}

interface EquipmentButtonProps {
  equipment: Equipment;
  equipmentLabel: string;
  logoUrl: string;
  handleClick: (equipment: Equipment) => void;
}

function EquipmentButton({
  equipment,
  equipmentLabel,
  logoUrl,
  handleClick,
}: EquipmentButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <Label htmlFor="ski" className="text-sm">{equipmentLabel}</Label>
      <Button
        className="p-4"
        id="ski"
        type="button"
        onClick={() => handleClick(equipment)}
        variant="secondary"
      >
        <Image src={logoUrl} alt="ski icon" width={32} height={32} />
      </Button>
    </div>
  );
}
