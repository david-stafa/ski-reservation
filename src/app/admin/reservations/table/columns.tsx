"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime, formatPhone } from "@/lib/utils";
import { type Reservation } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "./components/DataTableColumnHeader";
import Link from "next/link";
import { DeleteReservationButton } from "@/app/reservation/[id]/components/DeleteReservationButton";

export const columns: ColumnDef<Reservation>[] = [
  {
    id: "actions",
    header: "Akce",
    cell: ({ row }) => {
      const reservation = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Akce</DropdownMenuLabel>
            {/* EDIT */}
            <Link href={`/reservation/${reservation.id}/edit`}>
              <DropdownMenuItem>Upravit rezervaci</DropdownMenuItem>
            </Link>
            {/* DETAIL */}
            <Link href={`/reservation/${reservation.id}`}>
              <DropdownMenuItem>Detail rezervace</DropdownMenuItem>
            </Link>
            <DropdownMenuSeparator />
            {/* DELETE */}
            <DropdownMenuItem asChild className="text-sm">
              <DeleteReservationButton id={reservation.id} redirectUrl="/admin/reservations/table" unstyled />
            </DropdownMenuItem>
            {/* COPY ID */}
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(reservation.id)}
            >
              Zkopírovat ID rezervace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "firstName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Jméno" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "lastName",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Příjmení" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "phone",
    header: "Telefon",
    cell: ({ row }) => {
      const formatted = formatPhone(row.getValue("phone"));
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "peopleCount",
    header: "Počet osob",
    cell: ({ row }) => {
      return <div className="text-center">{row.original.peopleCount}</div>;
    },
  },
  {
    accessorKey: "startDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Termín rezervace" />;
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(new Date(row.getValue("startDate")));
      return <div className="text-left">{formatted}</div>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Vytvořeno" />;
    },
    cell: ({ row }) => {
      const formatted = formatDateTime(new Date(row.getValue("createdAt")));
      return <div className="text-left">{formatted}</div>;
    },
    sortingFn: "datetime",
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Aktualizováno" />;
    },
    cell: ({ row }) => {
      const updatedAt = row.original.updatedAt;

      if (!updatedAt) return "-";

      const formatted = formatDateTime(new Date(row.getValue("updatedAt")));
      return <div className="text-left">{formatted}</div>;
    },
    sortingFn: "datetime",
  },
];
