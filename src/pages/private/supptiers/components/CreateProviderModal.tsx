import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import InputField from "@/components/fields/InputField"
import type { Provider } from "@/interface/provider"

interface CreateProviderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (values: Omit<Provider, "id">) => void
  isSubmitting: boolean
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es requerido"),
  nit: Yup.string()
    .required("El NIT es requerido"),
  phone: Yup.string().required("El teléfono es requerido"),
  address: Yup.string().required("La dirección es requerida"),
})

export function CreateProviderModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
}: CreateProviderModalProps) {

  const initialValues = {
    name: "",
    nit: "",
    phone: "",
    address: "",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-text-heading">Crear Nuevo Proveedor</DialogTitle>
          <DialogDescription className="text-text-muted">
            Completa los campos para registrar un nuevo proveedor.
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
        >
          {() => (
            <Form className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-text-body">
                  Nombre
                </Label>
                <InputField
                  id="name"
                  name="name"
                  placeholder="Ej: Distribuidora Farmacéutica"
                  disabled={isSubmitting}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nit" className="text-text-body">
                  NIT
                </Label>
                <InputField id="nit" name="nit" placeholder="Ej: 900123456-7" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-text-body">
                  Teléfono
                </Label>
                <InputField id="phone" name="phone" placeholder="Ej: 555-1111" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-text-body">
                  Dirección
                </Label>
                <InputField id="address" name="address" placeholder="Ej: Av. Principal 100" disabled={isSubmitting} />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  "Crear Proveedor"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
