
import { Package, Bell, Settings, User, LogOut, Plus, Tag, Box, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover" // Importar Popover components
import { Card, CardContent } from "@/components/ui/card" // Importar Card para la lista de productos
import { Badge } from "@/components/ui/badge" // Importar Badge para el stock
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/useAuthStore"
import { useProductMinStock } from "@/hooks/useProducts"
import type { IProduct } from "@/interface/product"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AddStockModal } from "@/pages/private/products/components/AddStockModal"
import { mockCategories, mockPresentations } from "@/utils/constant"

export function Header() {

  const { user } = useAuthStore()
  const { data: productsLowStock } = useProductMinStock()
  const [isAddStockModalOpen, setIsAddStockModalOpen] = useState(false)
  const [selectedProductForStock, setSelectedProductForStock] = useState<IProduct | null>(null)
  const [isSubmittingStock, setIsSubmittingStock] = useState(false)
  const navigate = useNavigate()

  const getCategoryName = (categoryId: number) => {
    return mockCategories.find((cat) => cat.id === categoryId)?.name || "Desconocida"
  }

  const getPresentationName = (presentationId: number) => {
    return mockPresentations.find((pres) => pres.id === presentationId)?.name || "Desconocida"
  }

  const handleAddStock = async (productId: number, quantity: number) => {
    setIsSubmittingStock(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsAddStockModalOpen(false)
    setSelectedProductForStock(null)
    setIsSubmittingStock(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <SidebarTrigger className="-ml-1 md:hidden" />
        <SidebarTrigger className="-ml-1 hidden md:flex" />
        <Link to="/dashboard" className="flex items-center space-x-2 flex-grow md:flex-grow-0">
          <div className="w-8 h-8 bg-pharmacy-primary rounded-lg flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold text-text-heading hidden sm:block">Farmacia</span>
        </Link>
        <div className="flex items-center space-x-4 ml-auto">
          {/* Notificaciones de Stock Bajo con Popover */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-text-body" />
                {productsLowStock && productsLowStock.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    {productsLowStock.length}
                  </span>
                )}
                <span className="sr-only">Notificaciones de stock bajo</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-4" align="end">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-text-heading">Productos con Stock Bajo</h3>
                <p className="text-sm text-text-muted">Revisa los productos que necesitan ser reabastecidos.</p>
              </div>
              <div className="max-h-[400px] overflow-y-auto space-y-3 pr-2">
                {productsLowStock && productsLowStock.length > 0 ? (
                  productsLowStock.map((product) => (
                    <Card key={product.id} className="border py-0 border-gray-200 shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-text-heading flex items-center">
                              <Tag className="h-4 w-4 mr-1 text-pharmacy-accent" /> {product.name}
                            </h4>
                            <p className="text-xs text-text-body flex items-center mt-1">
                              <Box className="h-3 w-3 mr-1 text-text-muted" /> Categoría:{" "}
                              {getCategoryName(product.category_id)}
                            </p>
                            <p className="text-xs text-text-body flex items-center">
                              <Info className="h-3 w-3 mr-1 text-text-muted" /> Presentación:{" "}
                              {getPresentationName(product.presentation_id)}
                            </p>
                            <p className="text-sm font-medium mt-2">
                              Stock Actual:{" "}
                              <Badge className={"font-semibold bg-red-500 text-white"} >
                                {product.stock}
                              </Badge>{" "}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProductForStock(product)
                              setIsAddStockModalOpen(true)
                            }}
                          >
                            <Plus className="h-4 w-4 mr-1" /> Stock
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <p className="text-center text-text-muted py-4">No hay productos con stock bajo.</p>
                )}
              </div>
            </PopoverContent>
          </Popover>

          {/* Dropdown de Perfil de Usuario */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="/placeholder.svg?height=36&width=36" alt="Avatar del usuario" />
                  <AvatarFallback>
                    {user?.first_name ? user.first_name.charAt(0) : "J"}
                    {user?.last_name ? user.last_name.charAt(0) : "P"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.first_name + " " + user?.last_name || "Juan Pérez"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.username || "juan.perez@farmacia.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configuración</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/")}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Cerrar Sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {/* Modal para Añadir Stock (se abre desde el Popover) */}
      {selectedProductForStock && (
        <AddStockModal
          isOpen={isAddStockModalOpen}
          onClose={() => {
            setIsAddStockModalOpen(false)
            setSelectedProductForStock(null)
          }}
          product={selectedProductForStock}
          onAddStock={handleAddStock}
          isSubmitting={isSubmittingStock}
        />
      )}
    </header>
  )
}
