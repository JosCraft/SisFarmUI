import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ArrowUpDown, Package, DollarSign, Calendar, Tag, Box, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { IPurchase } from "@/interface/purchase"
import type { User } from "@/interface/user"
import { useGetProducts } from "@/hooks/useProducts"
import { useGetSuppliers } from "@/hooks/useSupptiers"
import { Fragment, useState } from "react"
import { CashIcon, MasterCardIcon, QRCodeIcon } from "@/components/icons/paymentIcon"

const paymentTypes = ["cash", "credit", "debit"]
const purchaseStatuses = ["completada", "pendiente", "cancelada"]

interface PurchasesTableProps {
  data: IPurchase[]
  users: User[]
}

export function PurchasesTable({ data, users }: PurchasesTableProps) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const { data: products } = useGetProducts()
  const { data: providers } = useGetSuppliers()

  const getProviderName = (providerId: number) => {
    return providers.find((p) => p.id === providerId)?.name || "Desconocido"
  }

  const getUserName = (userId: number) => {
    return users.find((u) => u.id === userId)?.full_name || "Desconocido"
  }

  const getProductName = (productId: number) => {
    return products.find((p) => p.id === productId)?.name || "Desconocido"
  }

  const getProductCode = (productId: number) => {
    return products.find((p) => p.id === productId)?.code || "N/A"
  }

  const columns: ColumnDef<IPurchase>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            ID Compra
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "provider_id",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Proveedor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{getProviderName(row.getValue("provider_id"))}</div>,
      filterFn: (row, id, value) => {
        const providerName = getProviderName(row.getValue(id)).toLowerCase()
        return providerName.includes(value.toLowerCase())
      },
    },
    {
      accessorKey: "user_id",
      header: "Registrado Por",
      cell: ({ row }) => <div>{getUserName(row.getValue("user_id"))}</div>,
    },
    {
      accessorKey: "total",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const total = parseFloat(row.getValue("total"))
        return <div className="text-right font-semibold">${total}</div>
      },
    },
    {
      accessorKey: "payment_type",
      header: "Tipo Pago",
      cell: ({ row }) => (
        <div className="flex items-center gap-3" >
          {row.getValue("payment_type") === "efectivo" ? <CashIcon /> : row.getValue("payment_type") === "tarjeta" ? <MasterCardIcon /> : <QRCodeIcon />}
          <span className="font-semibold" >{row.getValue("payment_type")}</span>
        </div>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: ({ row }) => (
        <Badge
          className={cn(
            "font-semibold",
            row.getValue("status") === "completada"
              ? "bg-gray-400 text-white"
              : row.getValue("status") === "pendiente"
                ? "bg-yellow-500 text-white"
                : "bg-red-500 text-white",
          )}
        >
          {String(row.getValue("status")).charAt(0).toUpperCase() + String(row.getValue("status")).slice(1)}
        </Badge>
      ),
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fecha Compra
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        return <div>{format(date, "dd/MM/yyyy HH:mm", { locale: es })}</div>
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
    state: { sorting, columnFilters },
  })

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <Input
          placeholder="Buscar por proveedor o ID..."
          value={(table.getColumn("provider_id")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("provider_id")?.setFilterValue(event.target.value)}
          className="max-w-sm h-10 border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary"
        />
        <div className="flex gap-2">
          <Select
            value={(table.getColumn("payment_type")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) => table.getColumn("payment_type")?.setFilterValue(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-[180px] h-10 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
              <SelectValue placeholder="Filtrar por Pago" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Pagos</SelectItem>
              {paymentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn("status")?.getFilterValue() as string) ?? "all"}
            onValueChange={(value) => table.getColumn("status")?.setFilterValue(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-[180px] h-10 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
              <SelectValue placeholder="Filtrar por Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los Estados</SelectItem>
              {purchaseStatuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
                <Fragment key={row.id}>
                  <TableRow
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                  {row.original.items && row.original.items.length > 0 && (
                    <TableRow>
                      <TableCell colSpan={columns.length} className="p-0">
                        <Collapsible>
                          <CollapsibleTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full justify-start"
                            >
                              <ChevronDown className="h-4 w-4 mr-2" /> Ver Ítems de Compra ({row.original.items.length})
                            </Button>
                          </CollapsibleTrigger>
                          <CollapsibleContent className="p-4 border-t border-gray-200">
                            <h4 className="text-md font-semibold text-text-heading mb-3">Detalle de Productos:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {row.original.items.map((item) => (
                                <div key={item.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                                  <p className="font-semibold text-text-heading flex items-center mb-1">
                                    <Package className="h-4 w-4 mr-2 " />
                                    {getProductName(item.product_id)} ({getProductCode(item.product_id)})
                                  </p>
                                  <p className="text-sm text-text-body flex items-center">
                                    <Box className="h-4 w-4 mr-2 " />
                                    Cantidad: <span className="font-medium ml-1">{item.quantity}</span>
                                  </p>
                                  <p className="text-sm text-text-body flex items-center">
                                    <DollarSign className="h-4 w-4 mr-2 " />
                                    Precio Unitario:{" "}
                                    <span className="font-medium ml-1">${item.unit_price.toFixed(2)}</span>
                                  </p>
                                  <p className="text-sm text-text-body flex items-center">
                                    <Info className="h-4 w-4 mr-2 " />
                                    Subtotal: <span className="font-medium ml-1">${item.subtotal.toFixed(2)}</span>
                                  </p>
                                  <p className="text-sm text-text-body flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 " />
                                    Vencimiento:{" "}
                                    <span className="font-medium ml-1">
                                      {format(new Date(item.expiration_date), "dd/MM/yyyy", { locale: es })}
                                    </span>
                                  </p>
                                  <p className="text-sm text-text-body flex items-center">
                                    <Tag className="h-4 w-4 mr-2 " />
                                    Lote: <span className="font-medium ml-1">{item.batch_code}</span>
                                  </p>
                                </div>
                              ))}
                            </div>
                          </CollapsibleContent>
                        </Collapsible>
                      </TableCell>
                    </TableRow>
                  )}
                </Fragment>
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
          className="border-gray-300"
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="border-gray-300"
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
