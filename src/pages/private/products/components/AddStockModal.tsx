"use client"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { IProduct } from "@/interface/product"

interface AddStockModalProps {
  isOpen: boolean
  onClose: () => void
  product: IProduct
  onAddStock: (productId: number, quantity: number) => void
  isSubmitting: boolean
}

export function AddStockModal({ isOpen, onClose, product, onAddStock, isSubmitting }: AddStockModalProps) {
  const [quantity, setQuantity] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (quantity <= 0) {
      setError("La cantidad debe ser mayor a 0.")
      return
    }
    setError(null)
    onAddStock(product.id, quantity)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-text-heading">Añadir Stock a {product.name}</DialogTitle>
          <DialogDescription className="text-text-muted">
            Ingresa la cantidad de unidades a añadir al stock actual.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="current-stock" className="text-text-body">
              Stock Actual
            </Label>
            <Input id="current-stock" value={product.stock} disabled className="h-11 text-sm" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="quantity" className="text-text-body">
              Cantidad a Añadir
            </Label>
            <Input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => {
                setQuantity(Number.parseInt(e.target.value) || 0)
                setError(null)
              }}
              placeholder="Ej: 50"
              disabled={isSubmitting}
              className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary"
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          className="w-full bg-pharmacy-primary hover:bg-pharmacy-primary-dark text-white h-11 text-sm font-medium mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Añadiendo...
            </>
          ) : (
            "Añadir Stock"
          )}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
