"use client";

import { logout } from "@/app/_actions/auth/auth";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export const LogOutButton = () => {
  return (
    <Button
      size="sm"
      className="absolute right-0 top-0"
      onClick={() => logout()}
    >
      <LogOutIcon />
      Odhlásit se
    </Button>
  );
};
