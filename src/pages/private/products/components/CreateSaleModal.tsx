import { Formik, Form, FieldArray } from "formik"
import * as Yup from "yup"
import { Plus, X, ShoppingCart, DollarSign, Package } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import SelectField from "@/components/fields/SelectField"
import { useState } from "react"
import { useGetProducts } from "@/hooks/useProducts"
import { useCreateSale } from "@/hooks/useSales"
import CounterField from "@/components/fields/CounterField"
import InputField from "@/components/fields/InputField"
import { useCreateCustomer } from "@/hooks/useCustomer"
import { toast } from "sonner"

export interface SaleFormValues {
  client_id: number
  payment_type: { value: string; name: string }
  items: Array<{
    product_id: number
    quantity: number
    unit_price: number
  }>
}

const salePaymentTypes = [
  { name: "Efectivo", value: "efectivo" },
  { name: "Tarjeta de Crédito", value: "tarjeta_credito" },
  { name: "Transferencia Bancaria", value: "transferencia_bancaria" },
]

const validationSchema = Yup.object().shape({
  payment_type: Yup.string()
    .oneOf(
      salePaymentTypes.map((t) => t.value),
      "Tipo de pago inválido",
    )
    .required("El tipo de pago es requerido"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        product_id: Yup.number().required("Producto requerido").min(1, "Selecciona un producto válido"),
        quantity: Yup.number()
          .required("Cantidad requerida")
          .min(1, "La cantidad debe ser al menos 1")
          .integer("La cantidad debe ser un número entero"),
        unit_price: Yup.number().required("Precio unitario requerido").min(0.01, "El precio debe ser mayor a 0"),
      }),
    )
    .min(1, "Debe añadir al menos un producto a la venta"),
})

type STATUS = "PRODUCTS" | "CUSTOMER_DETAILS"

type Props = {
  current_products: {
    product_id: number
    quantity: number
    unit_price: number
  }[]
}

export function CreateSaleModal({ current_products = [] }: Props) {

  const [isOpen, setIsOpen] = useState(false)
  const [status, setStatus] = useState<STATUS>("PRODUCTS")
  const { data: products } = useGetProducts()
  const { mutate: createSale } = useCreateSale()
  const { mutate: createCustomer } = useCreateCustomer()

  const listProducts = products.map(({ name, id }) => ({ name: `${name}`, value: String(id) }))

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild >
        <Button onClick={() => setIsOpen(true)} className=" text-white">
          <ShoppingCart className="mr-2 h-4 w-4" /> Registrar Venta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[750px] p-6 rounded-lg shadow-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-text-heading text-2xl font-bold flex items-center">
            <ShoppingCart className="mr-2 h-6 w-6 text-pharmacy-primary" /> Registrar Nueva Venta
          </DialogTitle>
          <DialogDescription className="text-text-muted">
            Completa los campos para registrar una nueva transacción de venta.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={{
            payment_type: "efectivo",
            items: current_products,
            full_name: "",
            ci: "",
            address: "",
            phone: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            createCustomer({
              full_name: values.full_name,
              ci: values.ci,
              address: values.address,
              phone: values.phone,
            }, {
              onSuccess: (data) => {
                createSale({ ...values, customer_id: data.id }, {
                  onSuccess: () => {
                    setIsOpen(false)
                    toast.success("Venta registrada exitosamente.")
                  },
                  onSettled: () => { setSubmitting(false) }
                })
              },
            })
          }}
        >
          {({ values, isSubmitting }) => {
            const totalSale = values.items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0)
            return (
              <Form className="grid gap-6 py-4">

                {status === "PRODUCTS" && <div>

                  <h3 className="text-lg font-semibold text-text-heading mt-2 flex items-center">
                    <Package className="mr-2 h-5 w-5 text-pharmacy-primary" /> Productos de la Venta
                  </h3>

                  <FieldArray name="items">
                    {({ push, remove }) => (
                      <div className="space-y-4">
                        {values.items.map((item, index) => (
                          <Card key={index} className="border shadow-sm relative">
                            <CardContent className="flex items-center gap-3">
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

                              <div>
                                <Label htmlFor={`items.${index}.product_id`} className="text-text-body">
                                  Producto
                                </Label>
                                <SelectField
                                  name={`items.${index}.product_id`}
                                  placeholder="Seleccionar Producto"
                                  list={listProducts}
                                  disabled={isSubmitting}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`items.${index}.quantity`} className="text-text-body">
                                  Cantidad
                                </Label>
                                <CounterField
                                  id={`items.${index}.quantity`}
                                  name={`items.${index}.quantity`}
                                  placeholder="Cantidad"
                                  disabled={isSubmitting}
                                />
                              </div>

                              <div>
                                <Label htmlFor={`items.${index}.unit_price`} className="text-text-body">
                                  Precio
                                </Label>
                                <div className="py-2">
                                  <p>{item.unit_price}</p>
                                </div>
                              </div>

                              <div>
                                <Label htmlFor={`items.${index}.unit_price`} className="text-text-body">
                                  Precio
                                </Label>
                                <div className="py-2" >
                                  {((item.quantity || 0) * (item.unit_price || 0)).toFixed(2)}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => push({ product_id: "", quantity: 1, unit_price: 0, })}
                          className="w-full"
                          disabled={isSubmitting}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Añadir Otro Producto
                        </Button>
                      </div>
                    )}
                  </FieldArray>

                  <div className="flex justify-end items-center py-2 rounded-md">
                    <h3 className="text-xl font-bold text-text-heading flex items-center">
                      <DollarSign className="mr-2 h-6 w-6 text-pharmacy-primary" /> Total de la Venta:
                    </h3>
                    <span className="text-2xl font-bold ml-4">
                      ${totalSale.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    disabled={isSubmitting || values.items.length === 0}
                    onClick={() => setStatus("CUSTOMER_DETAILS")}
                  >
                    {isSubmitting ? "Registrando..." : "Siguiente"}
                  </Button>
                </div>}

                {status === "CUSTOMER_DETAILS" && <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="client_id" className="text-text-body">
                        Nombre del Cliente
                      </Label>
                      <InputField
                        name="full_name"
                        placeholder="Nombre Completo del Cliente"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="payment_type" className="text-text-body">
                        Cedula o Identificación
                      </Label>
                      <InputField
                        name="ci"
                        placeholder="Número de Identificación"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="client_id" className="text-text-body">
                        Dirección
                      </Label>
                      <InputField
                        name="address"
                        placeholder="Nombre Completo del Cliente"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="client_id" className="text-text-body">
                        Teléfono
                      </Label>
                      <InputField
                        name="phone"
                        placeholder="Nombre Completo del Cliente"
                        disabled={isSubmitting}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <Button onClick={() => setStatus("PRODUCTS")} variant="outline" type="button">
                        Atras
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Registrando..." : "Siguiente"}
                      </Button>
                    </div>
                  </div>
                </div>}
                
              </Form>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog >
  )
}
