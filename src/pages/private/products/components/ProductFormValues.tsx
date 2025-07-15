"use client"
import { Formik, Form, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { ICategory, IPresentation, IProduct } from "@/interface/product"
import InputField from "@/components/fields/InputField"

interface ProductFormModalProps {
  isOpen: boolean
  onClose: () => void
  product?: IProduct | null // Si se pasa un producto, es para editar
  categories: ICategory[]
  presentations: IPresentation[]
  onSubmit: (values: ProductFormValues) => void
  isSubmitting: boolean
}

export interface ProductFormValues {
  id?: number
  code: string
  name: string
  category_id: number
  presentation_id: number
  unit: string
  price: number
  descuento: number
  stock: number
  stock_min: number
  description?: string
}

const validationSchema = Yup.object().shape({
  code: Yup.string().required("El código es requerido"),
  name: Yup.string().required("El nombre es requerido"),
  category_id: Yup.number().required("La categoría es requerida").min(1, "Selecciona una categoría válida"),
  presentation_id: Yup.number().required("La presentación es requerida").min(1, "Selecciona una presentación válida"),
  unit: Yup.string().required("La unidad es requerida"),
  price: Yup.number()
    .required("El precio es requerido")
    .min(0, "El precio no puede ser negativo")
    .typeError("El precio debe ser un número"),
  descuento: Yup.number()
    .required("El descuento es requerido")
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor a 100")
    .typeError("El descuento debe ser un número"),
  stock: Yup.number()
    .required("El stock es requerido")
    .min(0, "El stock no puede ser negativo")
    .integer("El stock debe ser un número entero")
    .typeError("El stock debe ser un número"),
  stock_min: Yup.number()
    .required("El stock mínimo es requerido")
    .min(0, "El stock mínimo no puede ser negativo")
    .integer("El stock mínimo debe ser un número entero")
    .typeError("El stock mínimo debe ser un número"),
  description: Yup.string().nullable(),
})

export function ProductFormModal({
  isOpen,
  onClose,
  product,
  categories,
  presentations,
  onSubmit,
  isSubmitting,
}: ProductFormModalProps) {

  const initialValues: ProductFormValues = {
    id: product?.id,
    code: product?.code || "",
    name: product?.name || "",
    category_id: product?.category_id || (categories.length > 0 ? categories[0].id : 0),
    presentation_id: product?.presentation_id || (presentations.length > 0 ? presentations[0].id : 0),
    unit: product?.unit || "",
    price: product?.price || 0,
    descuento: product?.descuento || 0,
    stock: product?.stock || 0,
    stock_min: product?.stock_min || 1,
    description: product?.description || "",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-text-heading">
            {product ? "Editar Producto" : "Crear Nuevo Producto"}
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            {product
              ? "Realiza cambios en la información del producto."
              : "Completa los campos para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
          enableReinitialize
          context={{ currentProductCode: product?.code }}
        >
          {({ setFieldValue, values }) => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="code" className="text-text-body">
                  Código
                </Label>
                <InputField id="code" name="code" placeholder="Ej: PROD001" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="name" className="text-text-body">
                  Nombre
                </Label>
                <InputField id="name" name="name" placeholder="Ej: Paracetamol 500mg" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="category_id" className="text-text-body">
                  Categoría
                </Label>
                <Select
                  value={String(values.category_id)}
                  onValueChange={(value) => setFieldValue("category_id", Number.parseInt(value))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
                    <SelectValue placeholder="Seleccionar Categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={String(cat.id)}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="category_id">
                  {(msg) => <p className="text-xs text-red-500 mt-1">{msg}</p>}
                </ErrorMessage>
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="presentation_id" className="text-text-body">
                  Presentación
                </Label>
                <Select
                  value={String(values.presentation_id)}
                  onValueChange={(value) => setFieldValue("presentation_id", Number.parseInt(value))}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
                    <SelectValue placeholder="Seleccionar Presentación" />
                  </SelectTrigger>
                  <SelectContent>
                    {presentations.map((pres) => (
                      <SelectItem key={pres.id} value={String(pres.id)}>
                        {pres.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage name="presentation_id">
                  {(msg) => <p className="text-xs text-red-500 mt-1">{msg}</p>}
                </ErrorMessage>
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="unit" className="text-text-body">
                  Unidad
                </Label>
                <InputField id="unit" name="unit" placeholder="Ej: Caja, Frasco" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="price" className="text-text-body">
                  Precio
                </Label>
                <InputField
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  placeholder="Ej: 5.50"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="descuento" className="text-text-body">
                  Descuento (%)
                </Label>
                <InputField
                  id="descuento"
                  name="descuento"
                  type="number"
                  step="0.01"
                  placeholder="Ej: 0.50"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="stock" className="text-text-body">
                  Stock Actual
                </Label>
                <InputField id="stock" name="stock" type="number" placeholder="Ej: 100" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2 col-span-1">
                <Label htmlFor="stock_min" className="text-text-body">
                  Stock Mínimo
                </Label>
                <InputField
                  id="stock_min"
                  name="stock_min"
                  type="number"
                  placeholder="Ej: 20"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2 col-span-2">
                <Label htmlFor="description" className="text-text-body">
                  Descripción
                </Label>
                <InputField
                  id="description"
                  name="description"
                  placeholder="Descripción del producto..."
                  disabled={isSubmitting}
                  className="min-h-[80px]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : product ? (
                  "Guardar Cambios"
                ) : (
                  "Crear Producto"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
