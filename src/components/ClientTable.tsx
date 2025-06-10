"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, Eye, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog } from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { IconExposure, IconTableExport } from "@tabler/icons-react";

interface Client {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  // ajoute d'autres champs si besoin
}

interface Ticket {
  id: string;
  ticketType: string;
  createdAt: Date;
  clientId: string;
  qrCode: string;
  fullName: string;
  client?: Client;
}

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [data, setData] = React.useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = React.useState<Ticket | null>(
    null
  );

  const columns: ColumnDef<Ticket>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: true,
      enableHiding: false,
    },
    {
      accessorKey: "fullName",
      header: "Clients",
      cell: ({ row }) => (
        <div className="capitalize">{row.original.client?.fullName ?? "—"}</div>
      ),
    },
    {
      accessorKey: "client.phone",
      header: "Telephone",
      cell: ({ row }) => <div>{row.original.client?.phone ?? "—"}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.original.client?.email ?? "@"}</div>
      ),
    },
    {
      accessorKey: "ticketType",
      header: () => <div className="">Type de billet</div>,
      cell: ({ row }) => {
        return (
          <div className=" font-medium">
            {row.getValue("ticketType").toUpperCase()}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date d'achat",
      cell: ({ row }) =>
        row.getValue("createdAt") instanceof Date
          ? row.getValue("createdAt").toLocaleString()
          : "—",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              onClick={() => setSelectedTicket(row.original)}
            >
              <Eye className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Visualiser le billet</DialogTitle>
            </DialogHeader>
            {selectedTicket && (
              <div className="flex flex-col items-center gap-4">
                <img
                  src={selectedTicket.qrCode}
                  alt="QR Code"
                  width={200}
                  height={200}
                />
                <Button
                  onClick={() => {
                    const link = document.createElement("a");
                    link.href = selectedTicket.qrCode;
                    link.download = `ticket-${selectedTicket.id}.png`;
                    link.click();
                  }}
                >
                  Télécharger le billet
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const clientsSnap = await getDocs(
        query(collection(db, "clients"), orderBy("createdAt", "asc"))
      );
      const clientsMap: Record<string, Client> = {};
      clientsSnap.forEach((doc) => {
        const d = doc.data();
        clientsMap[doc.id] = {
          id: doc.id,
          fullName: d.name,
          email: d.email,
          phone: d.telephone,
        };
      });

      const ticketsSnap = await getDocs(
        query(collection(db, "tickets"), orderBy("createdAt", "asc"))
      );
      const tickets: Ticket[] = ticketsSnap.docs.map((doc) => {
        const d = doc.data();
        return {
          id: doc.id,
          ticketType: d.ticketType,
          createdAt: d.createdAt.toDate(),
          clientId: d.clientId,
          fullName: clientsMap[d.clientId].fullName,
          qrCode: d.qrCode,
          client: clientsMap[d.clientId],
        };
      });
      setData(tickets);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrer par nom..."
          value={
            (table.getColumn("fullName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("fullName")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonnes <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <Button variant="secondary" className="mx-3">
            <IconTableExport /> Exporter
          </Button>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun resultat trouvé.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Precedent
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Suivant
          </Button>
        </div>
      </div>
    </div>
  );
}
