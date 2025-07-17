import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { ICategory, IPresentation, IProduct } from "@/interface/product"
import { Info, DollarSign, Package, FileText, Clock, Tag, Box, Percent } from "lucide-react"

interface ViewProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: IProduct
  categories: ICategory[]
  presentations: IPresentation[]
}

export function ViewProductDetailsModal({
  isOpen,
  onClose,
  product,
  categories,
  presentations,
}: ViewProductDetailsModalProps) {
  const categoryName = categories.find((cat) => cat.id === product.category_id)?.name || "Desconocida"
  const presentationName = presentations.find((pres) => pres.id === product.presentation_id)?.name || "Desconocida"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px] p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-text-heading text-2xl font-bold">Detalles del Producto</DialogTitle>
          <DialogDescription className="text-text-muted">
            Información completa y detallada del producto.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Sección 1: Información General */}
          <Card className="border border-pharmacy-secondary-light shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg  flex items-center">
                <Info className="mr-2 h-5 w-5" /> Información General
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid gap-3">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Tag className="mr-2 h-4 w-4 " /> Código:
                </Label>
                <span className="text-text-heading font-semibold">{product.code}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Box className="mr-2 h-4 w-4 " /> Nombre:
                </Label>
                <span className="text-text-heading font-semibold">{product.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Package className="mr-2 h-4 w-4 " /> Categoría:
                </Label>
                <span className="text-text-heading">{categoryName}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Box className="mr-2 h-4 w-4 " /> Presentación:
                </Label>
                <span className="text-text-heading">{presentationName}</span>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-text-body flex items-center">
                  <Info className="mr-2 h-4 w-4 " /> Unidad:
                </Label>
                <span className="text-text-heading">{product.unit}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-pharmacy-secondary-light shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg  flex items-center">
                <DollarSign className="mr-2 h-5 w-5" /> Precios y Stock
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid gap-3">
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <DollarSign className="mr-2 h-4 w-4 " /> Precio:
                </Label>
                <span className="text-text-heading font-semibold">${product.price}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Percent className="mr-2 h-4 w-4 " /> Descuento:
                </Label>
                <span className="text-text-heading">{product.descuento}%</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                <Label className="text-text-body flex items-center">
                  <Box className="mr-2 h-4 w-4 " /> Stock Actual:
                </Label>
                <Badge
                  className={cn(
                    "font-semibold",
                    product.stock <= product.stock_min ? "bg-red-500 text-white" : "bg-slate-400 text-white",
                  )}
                >
                  {product.stock}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <Label className="text-text-body flex items-center">
                  <Box className="mr-2 h-4 w-4 " /> Stock Mínimo:
                </Label>
                <span className="text-text-heading">{product.stock_min}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-pharmacy-secondary-light shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg  flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Descripción
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <p className="text-text-body break-words">{product.description || "N/A"}</p>
            </CardContent>
          </Card>

          {/* Sección 4: Información de Auditoría */}
          <Card className="border border-pharmacy-secondary-light shadow-sm">
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg  flex items-center">
                <Clock className="mr-2 h-5 w-5" /> Información de Auditoría
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0 grid gap-3">
              <div className="flex justify-between items-center">
                <Label className="text-text-body flex items-center">
                  <Clock className="mr-2 h-4 w-4 " /> Creado el:
                </Label>
                <span className="text-text-heading">
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
