import { Formik, Form } from "formik"
import * as Yup from "yup"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import InputField from "@/components/fields/InputField"
import type { Role, User } from "@/interface/user"

interface UserFormModalProps {
  isOpen: boolean
  onClose: () => void
  user?: User | null // Si se pasa un usuario, es para editar
  roles: Role[]
  onSubmit: (values: UserFormValues) => void
  isSubmitting: boolean
}

export interface UserFormValues {
  id?: number
  username: string
  password?: string // Opcional para editar
  full_name: string
  phone: string
  address: string
  role_id?: number
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("El nombre de usuario es requerido"),
  password: Yup.string().when("id", {
    is: (id: number | undefined) => !id, // Requerido solo para crear (si no hay ID)
    then: (schema) => schema.required("La contraseña es requerida"),
    otherwise: (schema) => schema.notRequired(),
  }),
  full_name: Yup.string().required("El nombre completo es requerido"),
  phone: Yup.string().required("El teléfono es requerido"),
  address: Yup.string().required("La dirección es requerida"),
})

export function UserFormModal({ isOpen, onClose, user, onSubmit, isSubmitting }: UserFormModalProps) {

  const initialValues: UserFormValues = {
    id: user?.id,
    username: user?.username || "",
    password: "", // Siempre vacío para seguridad
    full_name: user?.full_name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-text-heading">{user ? "Editar Usuario" : "Crear Nuevo Usuario"}</DialogTitle>
          <DialogDescription className="text-text-muted">
            {user
              ? "Realiza cambios en la información del usuario."
              : "Completa los campos para crear un nuevo usuario."}
          </DialogDescription>
        </DialogHeader>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => onSubmit(values)}
          enableReinitialize // Para que el formulario se reinicialice si cambia el usuario
        >
          {() => (
            <Form className="grid gap-4 py-4">
              {!user && <div className="grid gap-2">
                <Label htmlFor="username" className="text-text-body">
                  Nombre de Usuario
                </Label>
                <InputField id="username" name="username" placeholder="Ej: jdoe" disabled={isSubmitting} />
              </div>}
              {!user && <div className="grid gap-2">
                <Label htmlFor="password" className="text-text-body">
                  Contraseña {user ? "(dejar vacío para no cambiar)" : ""}
                </Label>
                <InputField
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Ingresar contraseña"
                  disabled={isSubmitting}
                />
              </div>}
              <div className="grid gap-2">
                <Label htmlFor="full_name" className="text-text-body">
                  Nombre Completo
                </Label>
                <InputField id="full_name" name="full_name" placeholder="Ej: Juan Pérez" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-text-body">
                  Teléfono
                </Label>
                <InputField id="phone" name="phone" placeholder="Ej: 555-1234" disabled={isSubmitting} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address" className="text-text-body">
                  Dirección
                </Label>
                <InputField id="address" name="address" placeholder="Ej: Calle Falsa 123" disabled={isSubmitting} />
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
                ) : user ? (
                  "Guardar Cambios"
                ) : (
                  "Crear Usuario"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
