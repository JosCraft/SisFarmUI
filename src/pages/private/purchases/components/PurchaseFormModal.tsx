import { Formik, Form, FieldArray, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Loader2, Plus, X, CalendarIcon, PlusCircle } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import type { IPaymentType } from "@/interface/purchase"
import InputField from "@/components/fields/InputField"
import { Calendar } from "@/components/ui/calendar"
import { useCreatePurchase } from "@/hooks/usePurchase"
import { toast } from "sonner"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { useGetProducts } from "@/hooks/useProducts"
import { useGetSuppliers } from "@/hooks/useSupptiers"

export interface PurchaseFormValues {
  provider_id: number
  payment_type: IPaymentType
  items: Array<{
    product_id: number
    quantity: number
    unit_price: number
    expiration_date: Date | undefined
    batch_code: string
  }>
}

const paymentTypes = ["efectivo", "tarjeta", "transferencia", "credito"]

const validationSchema = Yup.object().shape({
  provider_id: Yup.number().required("El proveedor es requerido").min(1, "Selecciona un proveedor válido"),
  payment_type: Yup.string().oneOf(paymentTypes, "Tipo de pago inválido").required("El tipo de pago es requerido"),
})

export function PurchaseFormModal({ }) {

  const { data: products } = useGetProducts()
  const { data: providers } = useGetSuppliers()
  const { mutate: createPurchase } = useCreatePurchase()
  const initialValues: PurchaseFormValues = {
    provider_id: providers.length > 0 ? providers[0].id : 0,
    payment_type: "efectivo",
    items: [
      {
        product_id: products.length > 0 ? products[0].id : 0,
        quantity: 1,
        unit_price: 0,
        expiration_date: undefined,
        batch_code: "",
      },
    ],
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Registrar Nueva Compra
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-7xl p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-text-heading">Registrar Nueva Compra</DialogTitle>
          <DialogDescription className="text-text-muted">
            Completa los campos para registrar una nueva compra de productos.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            const datos = values.items.map(item => ({
              product_id: item.product_id,
              quantity: item.quantity,
              unit_price: item.unit_price,
              expiration_date: item.expiration_date ? format(item.expiration_date, "yyyy-MM-dd") : "",
              batch_code: item.batch_code,
            }))
            createPurchase({
              provider_id: values.provider_id,
              payment_type: values.payment_type,
              items: datos,
            }, {
              onSuccess: () => {
                toast.success("Compra registrada exitosamente")
              },
              onSettled: () => {
                setSubmitting(false)
              }
            })
          }}
        >
          {({ values, setFieldValue, isSubmitting, errors, touched }) => {
            return (
              <Form className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="provider_id" className="text-text-body">
                    Proveedor
                  </Label>
                  <Select
                    value={String(values.provider_id)}
                    onValueChange={(value) => setFieldValue("provider_id", Number.parseInt(value))}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
                      <SelectValue placeholder="Seleccionar Proveedor" />
                    </SelectTrigger>
                    <SelectContent>
                      {providers.map((provider) => (
                        <SelectItem key={provider.id} value={String(provider.id)}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="provider_id">
                    {(msg) => <p className="text-xs text-red-500 mt-1">{msg}</p>}
                  </ErrorMessage>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="payment_type" className="text-text-body">
                    Tipo de Pago
                  </Label>
                  <Select
                    value={values.payment_type}
                    onValueChange={(value) => setFieldValue("payment_type", value)}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
                      <SelectValue placeholder="Seleccionar Tipo de Pago" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ErrorMessage name="payment_type">
                    {(msg) => <p className="text-xs text-red-500 mt-1">{msg}</p>}
                  </ErrorMessage>
                </div>

                <h3 className="text-lg font-semibold text-text-heading mt-4">Productos de la Compra</h3>
                <FieldArray name="items">
                  {({ push, remove }) => (
                    <div className="space-y-4">
                      {values.items?.map((item, index) => (
                        <div
                          key={index}
                          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 border p-4 rounded-md relative bg-gray-50"
                        >
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 h-6 w-6 text-red-500 hover:bg-red-100"
                            aria-label="Eliminar producto"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                          <div className="grid gap-2 col-span-full md:col-span-3 lg:col-span-2">
                            <Label htmlFor={`items.${index}.product_id`} className="text-text-body">
                              Producto
                            </Label>
                            <Select
                              value={String(item.product_id)}
                              onValueChange={(value) => {
                                const selectedProduct = products.find((p) => p.id === Number.parseInt(value))
                                setFieldValue(`items.${index}.product_id`, Number.parseInt(value))
                                if (selectedProduct) {
                                  setFieldValue(`items.${index}.unit_price`, selectedProduct.price)
                                }
                              }}
                              disabled={isSubmitting}
                            >
                              <SelectTrigger className="h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
                                <SelectValue placeholder="Seleccionar Producto" />
                              </SelectTrigger>
                              <SelectContent>
                                {products.map((product) => (
                                  <SelectItem key={product.id} value={String(product.id)}>
                                    {product.name} ({product.code})
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`items.${index}.quantity`} className="text-text-body">
                              Cantidad
                            </Label>
                            <InputField
                              id={`items.${index}.quantity`}
                              name={`items.${index}.quantity`}
                              type="number"
                              placeholder="Cantidad"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`items.${index}.unit_price`} className="text-text-body">
                              Precio Unitario
                            </Label>
                            <InputField
                              id={`items.${index}.unit_price`}
                              name={`items.${index}.unit_price`}
                              type="number"
                              step="0.01"
                              placeholder="Precio"
                              disabled={isSubmitting}
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`items.${index}.expiration_date`} className="text-text-body">
                              Fecha Vencimiento
                            </Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full justify-start text-left font-normal h-11 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary",
                                    !item.expiration_date && "text-muted-foreground",
                                  )}
                                  disabled={isSubmitting}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {item.expiration_date ? (
                                    format(item.expiration_date, "PPP", { locale: es })
                                  ) : (
                                    <span>Seleccionar fecha</span>
                                  )}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={item.expiration_date}
                                  onSelect={(date) => setFieldValue(`items.${index}.expiration_date`, date)}
                                  locale={es}
                                />
                              </PopoverContent>
                            </Popover>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`items.${index}.batch_code`} className="text-text-body">
                              Código de Lote
                            </Label>
                            <InputField
                              id={`items.${index}.batch_code`}
                              name={`items.${index}.batch_code`}
                              placeholder="Lote"
                              disabled={isSubmitting}
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          push({
                            product_id: products.length > 0 ? products[0].id : 0,
                            quantity: 1,
                            unit_price: 0,
                            expiration_date: undefined,
                            batch_code: "",
                          })
                        }
                        className="w-full border-dashed"
                        disabled={isSubmitting}
                      >
                        <Plus className="mr-2 h-4 w-4" /> Añadir Otro Producto
                      </Button>
                      {typeof errors.items === "string" && touched.items && (
                        <p className="text-xs text-red-500 mt-1">{errors.items}</p>
                      )}
                    </div>
                  )}
                </FieldArray>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Registrando Compra...
                    </>
                  ) : (
                    "Registrar Compra"
                  )}
                </Button>
              </Form>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
