"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, Filter, Search, ShoppingCart, X, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { DialogDetailsForm } from "./components/DialogDetailsForm"

// Product type definition
export type SaleProduct = {
  id: string
  codProd: string
  laboratorio: string
  nombreComercial: string
  principioActivo: string
  accionTerapeutica: string
  concentracion: string
  tipo: string
  precioCompra: number
  precioVenta: number
  formaFarmaceutica: string
  stock: number
}

// Cart item type
export type CartItem = SaleProduct & {
  quantity: number
}

// Sample data
const sampleProducts: SaleProduct[] = [
  {
    id: "1",
    codProd: "000",
    laboratorio: "COFAR",
    nombreComercial: "Agua Tridestilada",
    principioActivo: "Agua",
    accionTerapeutica: "Solvente",
    concentracion: "100%",
    tipo: "NO CONTROLADO",
    precioCompra: 2.5,
    precioVenta: 4.0,
    formaFarmaceutica: "Solución",
    stock: 150,
  },
  {
    id: "2",
    codProd: "001",
    laboratorio: "COFAR",
    nombreComercial: "Paracetamol 500mg",
    principioActivo: "Paracetamol",
    accionTerapeutica: "Analgésico",
    concentracion: "500mg",
    tipo: "NO CONTROLADO",
    precioCompra: 3.2,
    precioVenta: 5.5,
    formaFarmaceutica: "Tableta",
    stock: 89,
  },
  {
    id: "3",
    codProd: "002",
    laboratorio: "HQ Main Store",
    nombreComercial: "Ibuprofeno 400mg",
    principioActivo: "Ibuprofeno",
    accionTerapeutica: "Antiinflamatorio",
    concentracion: "400mg",
    tipo: "Activado",
    precioCompra: 8.75,
    precioVenta: 12.0,
    formaFarmaceutica: "Cápsula",
    stock: 45,
  },
  {
    id: "4",
    codProd: "003",
    laboratorio: "HQ Main Store",
    nombreComercial: "Amoxicilina 500mg",
    principioActivo: "Amoxicilina",
    accionTerapeutica: "Antibiótico",
    concentracion: "500mg",
    tipo: "Need Invitation",
    precioCompra: 5.3,
    precioVenta: 8.5,
    formaFarmaceutica: "Cápsula",
    stock: 78,
  },
  {
    id: "5",
    codProd: "004",
    laboratorio: "HQ Main Store",
    nombreComercial: "Omeprazol 20mg",
    principioActivo: "Omeprazol",
    accionTerapeutica: "Antiácido",
    concentracion: "20mg",
    tipo: "Activado",
    precioCompra: 1.8,
    precioVenta: 3.25,
    formaFarmaceutica: "Tableta",
    stock: 200,
  },
  {
    id: "6",
    codProd: "005",
    laboratorio: "HQ Main Store",
    nombreComercial: "Loratadina 10mg",
    principioActivo: "Loratadina",
    accionTerapeutica: "Antihistamínico",
    concentracion: "10mg",
    tipo: "Activado",
    precioCompra: 4.5,
    precioVenta: 7.0,
    formaFarmaceutica: "Tableta",
    stock: 65,
  },
  {
    id: "7",
    codProd: "006",
    laboratorio: "HQ Main Store",
    nombreComercial: "Metformina 850mg",
    principioActivo: "Metformina",
    accionTerapeutica: "Antidiabético",
    concentracion: "850mg",
    tipo: "Need Invitation",
    precioCompra: 6.2,
    precioVenta: 9.75,
    formaFarmaceutica: "Tableta",
    stock: 32,
  },
  {
    id: "8",
    codProd: "007",
    laboratorio: "HQ Main Store",
    nombreComercial: "Simvastatina 20mg",
    principioActivo: "Simvastatina",
    accionTerapeutica: "Hipolipemiante",
    concentracion: "20mg",
    tipo: "Activado",
    precioCompra: 7.8,
    precioVenta: 11.5,
    formaFarmaceutica: "Tableta",
    stock: 58,
  },
]

export function SalesPage() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [cartItems, setCartItems] = React.useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = React.useState(false)
  const [showCustomerForm, setShowCustomerForm] = React.useState(false) // New state for form

  const addToCart = (product: SaleProduct) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  // Update quantity in cart
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const total = cartItems.reduce((sum, item) => sum + item.precioVenta * item.quantity, 0)

  const handleProcessSaleClick = () => {
    setShowCustomerForm(true)
  }

  // Handle final sale confirmation
  const handleConfirmSale = (customerData: { fullName: string; idNumber: string; phoneNumber: string }) => {
    console.log("Venta procesada con datos del cliente:", customerData)
    console.log("Productos vendidos:", cartItems)
    // Here you would typically send data to your backend
    setCartItems([]) // Clear cart after sale
    setShowCustomerForm(false) // Hide form
    setIsCartOpen(false) // Close modal
    alert("¡Venta procesada con éxito!")
  }

  // Column definitions
  const columns: ColumnDef<SaleProduct>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
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
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "codProd",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
          >
            COD PROD
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-mono text-sm">{row.getValue("codProd")}</div>,
    },
    {
      accessorKey: "laboratorio",
      header: "LABORATORIO",
      cell: ({ row }) => <div className="text-sm">{row.getValue("laboratorio")}</div>,
    },
    {
      accessorKey: "nombreComercial",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
          >
            NOMBRE COMERCIAL
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium text-sm">{row.getValue("nombreComercial")}</div>,
    },
    {
      accessorKey: "principioActivo",
      header: "PRINCIPIO ACTIVO",
      cell: ({ row }) => <div className="text-sm">{row.getValue("principioActivo")}</div>,
    },
    {
      accessorKey: "accionTerapeutica",
      header: "ACCIÓN TERAPÉUTICA",
      cell: ({ row }) => <div className="text-sm">{row.getValue("accionTerapeutica")}</div>,
    },
    {
      accessorKey: "concentracion",
      header: "CONCENTRACIÓN",
      cell: ({ row }) => <div className="text-sm">{row.getValue("concentracion")}</div>,
    },
    {
      accessorKey: "tipo",
      header: "TIPO",
      cell: ({ row }) => {
        const tipo = row.getValue("tipo") as string
        return (
          <Badge
            variant={tipo === "Activado" ? "default" : tipo === "Need Invitation" ? "secondary" : "outline"}
            className="text-xs"
          >
            {tipo}
          </Badge>
        )
      },
    },
    {
      accessorKey: "precioVenta",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="h-auto p-0 font-medium text-xs text-gray-500 hover:text-gray-700"
          >
            PRECIO VENTA
            <ArrowUpDown className="ml-2 h-3 w-3" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("precioVenta"))
        const formatted = new Intl.NumberFormat("es-ES", {
          style: "currency",
          currency: "USD",
        }).format(amount)
        return <div className="text-sm font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "formaFarmaceutica",
      header: "FORMA FARMACÉUTICA",
      cell: ({ row }) => <div className="text-sm">{row.getValue("formaFarmaceutica")}</div>,
    },
    {
      id: "actions",
      header: "ACCIONES",
      cell: ({ row }) => {
        const product = row.original
        return (
          <Button size="sm" onClick={() => addToCart(product)} className="bg-blue-600 hover:bg-blue-700 text-white">
            Agregar
          </Button>
        )
      },
    },
  ]

  const table = useReactTable({
    data: sampleProducts,
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
  })

  return (
    <div className="flex-1 space-y-4 p-6 bg-gray-50">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Ventas</h2>
          <p className="text-gray-600">Reporte de ventas</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-2 flex-1 max-w-sm">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search Item"
                  value={(table.getColumn("nombreComercial")?.getFilterValue() as string) ?? ""}
                  onChange={(event) => table.getColumn("nombreComercial")?.setFilterValue(event.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-2">
              <Button onClick={() => setIsCartOpen(true)} className="bg-green-600 hover:bg-green-700 relative">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Carrito
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 p-0 flex items-center justify-center">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) => column.toggleVisibility(!!value)}
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      )
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table */}
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} className="bg-gray-50 whitespace-nowrap">
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
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
                        <TableCell key={cell.id} className="whitespace-nowrap">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No se encontraron resultados.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0 pt-4">
            <div className="flex items-center space-x-2">
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                </span>{" "}
                to{" "}
                <span className="font-medium">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                    table.getFilteredRowModel().rows.length,
                  )}
                </span>{" "}
                out of <span className="font-medium">{table.getFilteredRowModel().rows.length}</span> records
              </p>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Select
                  value={`${table.getState().pagination.pageSize}`}
                  onValueChange={(value) => {
                    table.setPageSize(Number(value))
                  }}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                  </SelectTrigger>
                  <SelectContent side="top">
                    {[10, 20, 30, 40, 50].map((pageSize) => (
                      <SelectItem key={pageSize} value={`${pageSize}`}>
                        {pageSize}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  ‹
                </Button>

                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(4, table.getPageCount()) }, (_, i) => i + 1).map((pageNumber) => (
                    <Button
                      key={pageNumber}
                      variant={pageNumber === table.getState().pagination.pageIndex + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => table.setPageIndex(pageNumber - 1)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNumber}
                    </Button>
                  ))}
                </div>

                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                  ›
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={isCartOpen}
        onOpenChange={(open) => {
          setIsCartOpen(open)
          if (!open) setShowCustomerForm(false) // Reset form view when modal closes
        }}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          {!showCustomerForm ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Carrito de Compras
                </DialogTitle>
                <DialogDescription>Revisa los productos seleccionados antes de procesar la venta</DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">No hay productos en el carrito</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium">{item.nombreComercial}</h4>
                                <p className="text-sm text-gray-600">
                                  {item.laboratorio} • {item.concentracion}
                                </p>
                                <p className="text-sm font-medium text-green-600">
                                  {new Intl.NumberFormat("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                  }).format(item.precioVenta)}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="w-3 h-3" />
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= item.stock} // Prevent adding more than stock
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.id)}>
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total:</span>
                      <span className="text-green-600">
                        {new Intl.NumberFormat("es-ES", {
                          style: "currency",
                          currency: "USD",
                        }).format(total)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCartOpen(false)}>
                  Continuar Comprando
                </Button>
                {cartItems.length > 0 && (
                  <Button className="bg-green-600 hover:bg-green-700" onClick={handleProcessSaleClick}>
                    Procesar Venta
                  </Button>
                )}
              </DialogFooter>
            </>
          ) : (
            <DialogDetailsForm
              onBack={() => setShowCustomerForm(false)}
              onProcessSale={handleConfirmSale}
              total={total}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default SalesPage