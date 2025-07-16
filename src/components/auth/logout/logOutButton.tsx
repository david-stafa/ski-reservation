"use client";

import { logout } from "@/app/_actions/auth/auth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LogOutIcon } from "lucide-react";

export const LogOutButton = ({ className }: { className?: string }) => {
  return (
    <Button
      size="sm"
      className={cn("", className)}
      onClick={() => logout()}
    >
      <LogOutIcon />
      Odhlásit se
    </Button>
  );
};
