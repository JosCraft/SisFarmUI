import * as React from "react"
import { useFormik } from "formik"
import * as Yup from "yup"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"

interface CustomerDetailsFormProps {
  onBack: () => void
  onProcessSale: (customerData: { fullName: string; idNumber: string; phoneNumber: string }) => void
  total: number
}

const validationSchema = Yup.object({
  fullName: Yup.string()
    .min(3, "Nombre completo debe tener al menos 3 caracteres")
    .required("Nombre completo es requerido"),
  idNumber: Yup.string().min(5, "NIT o Cédula debe tener al menos 5 caracteres").required("NIT o Cédula es requerido"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]{7,15}$/, "Número de teléfono inválido")
    .required("Número de teléfono es requerido"),
})

export function DialogDetailsForm({ onBack, onProcessSale, total }: CustomerDetailsFormProps) {
  
  const [isLoading, setIsLoading] = React.useState(false)

  const formik = useFormik({
    initialValues: {
      fullName: "",
      idNumber: "",
      phoneNumber: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true)
      onProcessSale(values)
      setIsLoading(false)
    },
  })

  return (
    <>
      <DialogHeader>
        <DialogTitle>Datos del Cliente</DialogTitle>
        <DialogDescription>Por favor, ingresa los datos del cliente para completar la venta.</DialogDescription>
      </DialogHeader>

      <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
        <div className="space-y-1">
          <Label htmlFor="fullName">Nombre Completo</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="Ej: Juan Pérez"
            {...formik.getFieldProps("fullName")}
            className={formik.touched.fullName && formik.errors.fullName ? "border-red-500" : ""}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <p className="text-xs text-red-500">{formik.errors.fullName}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="idNumber">NIT o Cédula</Label>
          <Input
            id="idNumber"
            type="text"
            placeholder="Ej: 123456789"
            {...formik.getFieldProps("idNumber")}
            className={formik.touched.idNumber && formik.errors.idNumber ? "border-red-500" : ""}
          />
          {formik.touched.idNumber && formik.errors.idNumber && (
            <p className="text-xs text-red-500">{formik.errors.idNumber}</p>
          )}
        </div>

        <div className="space-y-1">
          <Label htmlFor="phoneNumber">Número de Teléfono</Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="Ej: 555-1234567"
            {...formik.getFieldProps("phoneNumber")}
            className={formik.touched.phoneNumber && formik.errors.phoneNumber ? "border-red-500" : ""}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <p className="text-xs text-red-500">{formik.errors.phoneNumber}</p>
          )}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total a Pagar:</span>
          <span className="text-green-600">
            {new Intl.NumberFormat("es-ES", {
              style: "currency",
              currency: "USD",
            }).format(total)}
          </span>
        </div>
      </form>

      <DialogFooter>
        <Button variant="outline" onClick={onBack} disabled={isLoading}>
          Volver al Carrito
        </Button>
        <Button
          type="submit"
          form={formik.values.fullName ? formik.values.fullName : undefined}
          className="bg-green-600 hover:bg-green-700"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            "Confirmar Venta"
          )}
        </Button>
      </DialogFooter>
    </>
  )
}
