import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowUpDown, Edit, Trash2 } from "lucide-react"
import { ChangeRoleSelect } from "./ChangeRoleSelect"
import type { Role, User } from "@/interface/user"
import { useState } from "react"
import { Switch } from "@/components/ui/switch"

interface UsersTableProps {
  data: User[]
  roles: Role[]
  onEdit: (user: User) => void
  onDelete: (user: User) => void
  onRoleChange: (userId: number, newRoleId: number) => void
  onStatusChange: (userId: number, newStatus: boolean) => void
}

export function UsersTable({
  data,
  roles,
  onEdit,
  onDelete,
  onRoleChange,
  onStatusChange
}: UsersTableProps) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Usuario
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="capitalize">{row.getValue("username")}</div>,
    },
    {
      accessorKey: "full_name",
      header: "Nombre Completo",
      cell: ({ row }) => <div>{row.getValue("full_name")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Teléfono",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "role_id",
      header: "Rol",
      cell: ({ row }) => (
        <ChangeRoleSelect
          userId={row.original.id}
          currentRoleId={row.getValue("role_id")}
          roles={roles}
          onRoleChange={onRoleChange}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <div>
          <Switch
            checked={row.getValue("status")}
            onCheckedChange={(checked) => onStatusChange(row.original.id, checked)}
          />
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Acciones",
      cell: ({ row }) => {
        const user = row.original
        return (
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={() => onEdit(user)} aria-label="Editar usuario">
              <Edit className="h-4 w-4 text-pharmacy-accent" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => onDelete(user)} aria-label="Eliminar usuario">
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por usuario..."
          value={(table.getColumn("username")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("username")?.setFilterValue(event.target.value)}
          className="max-w-sm h-10 border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary"
        />
      </div>
      <div className="rounded-md border border-gray-200 shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
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
                  className="hover:bg-pharmacy-secondary-light/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted">
                  No se encontraron resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="border-gray-300 hover:bg-pharmacy-secondary-light hover:text-pharmacy-primary"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-gray-300 hover:bg-pharmacy-secondary-light hover:text-pharmacy-primary"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
