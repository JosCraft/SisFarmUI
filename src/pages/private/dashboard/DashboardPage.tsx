import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  type SortingState,
} from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, ArrowUpDown } from "lucide-react"
import { useState } from "react"

interface BestSellingProduct {
  id: number
  name: string
  laboratory: string
  quantity: string
}

interface OutOfStockProduct {
  id: number
  assetName: string
  store: string
  amount: string
}

const bestSellingProducts: BestSellingProduct[] = [
  {
    id: 1,
    name: "Gas Kiting",
    laboratory: "22 House Store",
    quantity: "1 pcs",
  },
  {
    id: 2,
    name: "Cordset",
    laboratory: "HQ Main Store",
    quantity: "3 pcs",
  },
  {
    id: 3,
    name: "Cordset Pro",
    laboratory: "HQ Main Store",
    quantity: "5 pcs",
  },
  {
    id: 4,
    name: "Cordset Premium",
    laboratory: "HQ Main Store",
    quantity: "6 pcs",
  },
  {
    id: 5,
    name: "Cable Kit",
    laboratory: "Downtown Store",
    quantity: "8 pcs",
  },
]

const outOfStockProducts: OutOfStockProduct[] = [
  {
    id: 1,
    assetName: "Gas Kiting",
    store: "22 House Store",
    amount: "1 pcs",
  },
  {
    id: 2,
    assetName: "Cordset",
    store: "HQ Main Store",
    amount: "5 pcs",
  },
  {
    id: 3,
    assetName: "Cordset Advanced",
    store: "HQ Main Store",
    amount: "5 pcs",
  },
  {
    id: 4,
    assetName: "Power Cable",
    store: "North Store",
    amount: "3 pcs",
  },
  {
    id: 5,
    assetName: "Network Kit",
    store: "South Store",
    amount: "2 pcs",
  },
]

const bestSellingColumns: ColumnDef<BestSellingProduct>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Nombre Comercial
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "laboratory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Laboratorio
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("laboratory")}</div>,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Cant. Vendida
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-sm">{row.getValue("quantity")}</div>,
  },
]

const outOfStockColumns: ColumnDef<OutOfStockProduct>[] = [
  {
    accessorKey: "assetName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Asset Name
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("assetName")}</div>,
  },
  {
    accessorKey: "store",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Store
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-sm text-gray-600">{row.getValue("store")}</div>,
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
        >
          Amount
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="text-sm">{row.getValue("amount")}</div>,
  },
]

function DataTable<TData, TValue>({
  columns,
  data,
}: {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}) {

  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting },
  })

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header,
                      header.getContext())}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Productos mas vendidos</CardTitle>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
              ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={bestSellingColumns} data={bestSellingProducts} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg font-semibold">Productos Agotados</CardTitle>
            <Button variant="link" className="text-blue-600 hover:text-blue-700 p-0 h-auto">
              ver todos
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={outOfStockColumns} data={outOfStockProducts} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-orange-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">868</p>
                <p className="text-sm text-gray-600">Cantidad disponible</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">124</p>
                <p className="text-sm text-gray-600">Productos vendidos hoy</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-500 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">$12,450</p>
                <p className="text-sm text-gray-600">Ventas del día</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DashboardPage
