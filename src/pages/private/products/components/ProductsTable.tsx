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
  type RowSelectionState,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, MoreHorizontal, Eye, Edit, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ICategory, IProduct } from "@/interface/product"
import type { IPresentation } from "@/interface/presentation"
import { useEffect, useState } from "react"

interface ProductsTableProps {
  data: IProduct[]
  categories: ICategory[]
  presentations: IPresentation[]
  onEdit: (product: IProduct) => void
  onDelete: (product: IProduct) => void
  onViewDetails: (product: IProduct) => void
  onSelectedProductsChange: (selectedProducts: IProduct[]) => void
}

export function ProductsTable({
  data,
  categories,
  presentations,
  onEdit,
  onDelete,
  onViewDetails,
  onSelectedProductsChange,
}: ProductsTableProps) {

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const getCategoryName = (categoryId: number) => {
    return categories.find((cat) => cat.id === categoryId)?.name || "Desconocida"
  }

  const getPresentationName = (presentationId: number) => {
    return presentations.find((pres) => pres.id === presentationId)?.name || "Desconocida"
  }

  const columns: ColumnDef<IProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Seleccionar todos los productos"
          className="border-gray-300 data-[state=checked]:bg-slate-950 data-[state=checked]:text-white"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Seleccionar fila"
          className="border-gray-300 data-[state=checked]:bg-slate-950 data-[state=checked]:text-white"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "code",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Código
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("code")}</div>,
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Nombre
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "category_id",
      header: "Categoría",
      cell: ({ row }) => <div>{getCategoryName(row.getValue("category_id"))}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "presentation_id",
      header: "Presentación",
      cell: ({ row }) => <div>{getPresentationName(row.getValue("presentation_id"))}</div>,
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Precio
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const price = Number.parseFloat(row.getValue("price"))
        return <div className="text-right">${price.toFixed(2)}</div>
      },
    },
    {
      accessorKey: "descuento",
      header: "Descuento",
      cell: ({ row }) => {
        const descuento = Number.parseFloat(row.getValue("descuento"))
        return <div className="text-right">{descuento.toFixed(2)}%</div>
      },
    },
    {
      accessorKey: "stock",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="px-0">
            Stock
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const stock: number = row.getValue("stock")
        const stockMin = row.original.stock_min
        return (
          <Badge
            className={cn(
              "font-semibold",
              stock <= stockMin ? "bg-red-500 text-white" : "text-slate-950 bg-slate-300",
            )}
          >
            {stock}
          </Badge>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      header: "Acciones",
      cell: ({ row }) => {
        const product = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menú</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => onViewDetails(product)}>
                <Eye className="mr-2 h-4 w-4" /> Ver Detalles
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(product)}>
                <Edit className="mr-2 h-4 w-4" /> Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onDelete(product)} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  useEffect(() => {
    onSelectedProductsChange(table.getSelectedRowModel().rows.map((row) => row.original))
  }, [rowSelection, onSelectedProductsChange, table])

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row items-center justify-between py-4 gap-4">
        <Input
          placeholder="Buscar por nombre o código..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
          className="max-w-sm h-10 border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary"
        />
        <div className="flex gap-2">
          <Select
            value={(table.getColumn("category_id")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => table.getColumn("category_id")?.setFilterValue(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-[180px] h-10 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
              <SelectValue placeholder="Filtrar por Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Categorías</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={String(cat.id)}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={(table.getColumn("presentation_id")?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => table.getColumn("presentation_id")?.setFilterValue(value === "all" ? "" : value)}
          >
            <SelectTrigger className="w-[180px] h-10 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
              <SelectValue placeholder="Filtrar por Presentación" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las Presentaciones</SelectItem>
              {presentations.map((pres) => (
                <SelectItem key={pres.id} value={String(pres.id)}>
                  {pres.name}
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
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
