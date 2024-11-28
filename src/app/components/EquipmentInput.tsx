"use client";

import H3 from "@/components/h3";
import { Button } from "@/components/ui/button";
import { ReservationType, SetReservationType } from "@/lib/types/types";
import { SkiSet } from "@prisma/client";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useState } from "react";

interface EquipmentInputProps {
  reservation: ReservationType;
  setReservation: SetReservationType;
}

type Equipment = "ski" | "skiBoot" | "skiPole" | "skiHelmet" | "skiGoggle";

export default function EquipmentInput({
  reservation,
  setReservation,
}: EquipmentInputProps) {
  // skiSet object with Omit -> reservationId will be created during creation of whole reservation
  const [skiSet, setSkiset] = useState<Omit<SkiSet, "reservationId" | "id">>({
    ski: false,
    skiBoot: false,
    skiPole: false,
    skiHelmet: false,
    skiGoggle: false,
  });

  // handle user input -> click on the equipment button
  function handleEquipmentClick(equipment: Equipment) {
    // set equipment in skiSet object to true or false when btton is clicked
    setSkiset({ ...skiSet, [equipment]: !skiSet[equipment] });

    // add skiSet object to reservation.skiSets[]
    setReservation({
      ...reservation,
      skiSets: [skiSet, ...reservation.skiSets.slice(1)],
    });
  }

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
          equipment="skiGoggle"
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
      <Label htmlFor="ski" className="text-sm">
        {equipmentLabel}
      </Label>
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
