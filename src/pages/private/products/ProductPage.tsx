import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import type { IProduct, PCreateProduct } from "@/interface/product"
import { ProductsTable } from "./components/ProductsTable"
import { ViewProductDetailsModal } from "./components/ViewProductDetailsModal"
import { DeleteProductModal } from "./components/DeleteProductModal"
import { ProductFormModal, type ProductFormValues } from "./components/ProductFormValues"
import { toast } from "sonner"
import { useCreateProduct, useDeleteProduct, useGetProductsPaginate, useUpdateProduct } from "@/hooks/useProducts"
import { useGetPresentations } from "@/hooks/usePresentation"
import { useGetCategories } from "@/hooks/useCategory"
import { CreateSaleModal } from "./components/CreateSaleModal"

export default function ProductsPage() {

  const [isFormModalOpen, setIsFormModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Para formularios
  const [isDeleting, setIsDeleting] = useState(false) // Para eliminación
  const [selectedProductsForCart, setSelectedProductsForCart] = useState<IProduct[]>([])
  const { data: { data: products } } = useGetProductsPaginate()
  const { data: presentations } = useGetPresentations()
  const { data: categories } = useGetCategories()
  const { mutate: createProduct } = useCreateProduct()
  const { mutate: deleteProduct } = useDeleteProduct()
  const { mutate: updateProduct } = useUpdateProduct()

  const handleCreateProduct = async (values: PCreateProduct) => {
    setIsSubmitting(true)
    createProduct(values, {
      onSuccess: () => {
        toast.success("Producto creado exitosamente.")
        setIsFormModalOpen(false)
      },
      onSettled: () => {
        setIsSubmitting(false)
      }
    })
  }

  const handleEditProduct = async (values: ProductFormValues) => {
    setIsSubmitting(true)
    if (!values.id) return
    updateProduct({
      id: values.id,
      name: values.name,
      category_id: values.category_id,
      presentation_id: values.presentation_id,
      price: values.price,
      description: values.description,
      descuento: values.descuento,
      stock_min: values.stock_min,
      unit: values.unit,
    }, {
      onSuccess: () => {
        toast.success(`Producto ${values.name} actualizado exitosamente.`)
        setIsFormModalOpen(false)
        setSelectedProduct(null)
      },
      onSettled: () => {
        setIsSubmitting(false)
      }
    })
  }

  const handleDeleteProduct = async () => {
    if (selectedProduct) {
      setIsDeleting(true)
      deleteProduct(selectedProduct.id, {
        onSuccess: () => {
          toast.success(`Producto ${selectedProduct.name} eliminado exitosamente.`)
        },
        onSettled: () => {
          setIsDeleting(false)
          setIsDeleteModalOpen(false)
          setSelectedProduct(null)
        },
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-heading">Gestión de Productos</h1>
        <Button
          onClick={() => {
            setSelectedProduct(null)
            setIsFormModalOpen(true)
          }}
        >
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo Producto
        </Button>
        <CreateSaleModal
          current_products={selectedProductsForCart.map(product => ({
            product_id: product.id,
            quantity: 1,
            unit_price: product.price,
          }))}
        />
      </div>

      <ProductsTable
        data={products}
        categories={categories}
        presentations={presentations}
        onEdit={(product) => {
          setSelectedProduct(product)
          setIsFormModalOpen(true)
        }}
        onDelete={(product) => {
          setSelectedProduct(product)
          setIsDeleteModalOpen(true)
        }}
        onViewDetails={(product) => {
          setSelectedProduct(product)
          setIsDetailsModalOpen(true)
        }}
        onSelectedProductsChange={setSelectedProductsForCart}
      />

      {selectedProductsForCart.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button className="bg-pharmacy-accent hover:bg-pharmacy-accent-dark text-white shadow-lg">
            Añadir {selectedProductsForCart.length} producto(s) al carrito
          </Button>
        </div>
      )}

      <ProductFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false)
          setSelectedProduct(null)
        }}
        product={selectedProduct}
        categories={categories}
        presentations={presentations}
        onSubmit={selectedProduct ? handleEditProduct : handleCreateProduct}
        isSubmitting={isSubmitting}
      />

      {selectedProduct && (
        <DeleteProductModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedProduct(null)
          }}
          onConfirm={handleDeleteProduct}
          productName={selectedProduct.name}
          isDeleting={isDeleting}
        />
      )}

      {selectedProduct && (
        <ViewProductDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false)
            setSelectedProduct(null)
          }}
          product={selectedProduct}
          categories={categories}
          presentations={presentations}
        />
      )}

    </div>
  )
}
