"use client";

import { findReservationByEmailAndLastName } from "@/app/_actions/reservation/reservationActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

const FindReservation = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const disabledState = {
    disabled: isLoading || success.length > 0,
    message: isLoading ? "Hledám..." : success ? "Rezervace byla nalezena" : "Hledat",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value.trim();
    const lastName = lastNameRef.current?.value.trim();

    if (!email || !lastName) {
      setError("Vyplňte všechna pole");
      return;
    }

    if (!validateEmail(email)) {
      setError("Zadejte platný email");
      return;
    }

    try {
      setIsLoading(true);
      setError("");
      const result = await findReservationByEmailAndLastName(email, lastName);

      if (!result) {
        setError("Rezervace nebyla nalezena");
        return;
      }

      setSuccess("Rezervace byla nalezena");
      router.push(`/reservation/${result.id}`);
    } catch {
      setError("Došlo k chybě při hledání rezervace");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="max-w-xl mx-auto mt-10" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Najít rezervaci</h1>

      {error && <p className="text-red-500 text-sm mb-1">{error}</p>}
      {success.length > 0 && <p className="text-green-500 text-sm mb-1">{success}</p>}

      <Label htmlFor="email">Email</Label>
      <Input placeholder="Zadejte email" ref={emailRef} className="mb-2 mt-1" />

      <Label htmlFor="lastName">Příjmení</Label>
      <Input
        placeholder="Zadejte příjmení"
        ref={lastNameRef}
        className="mb-4 mt-1"
      />

      <Button variant="default" disabled={disabledState.disabled} type="submit" color={success.length > 0 ? "green" : "black"}>
        {disabledState.message}
      </Button>
    </form>
  );
};

export default FindReservation;
