"use client"

import { useState } from "react"
import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { Eye, EyeOff, Loader2, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useLogin } from "@/hooks/useAuth" // Assuming this hook exists
import { useAuthStore } from "@/store/useAuthStore" // Assuming this store exists
import InputField from "@/components/fields/InputField"
import { useNavigate } from "react-router-dom"

const validationSchema = Yup.object({
  username: Yup.string().required("El usuario es requerido"),
  password: Yup.string().required("La contraseña es requerida"),
})

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: login } = useLogin()
  const { setUser, setIsAllowed } = useAuthStore()
  const navigate = useNavigate()

  return (
    <div className="h-screen p-5 rounded-2xl grid md:grid-cols-3 gap-5 shadow-sm overflow-hidden" >
      <div className="bg-fondo-auth hidden md:flex col-span-2 rounded-3xl items-center justify-center p-12">
        <div className="text-center text-white ">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 rounded-2xl mb-6">
            <Package className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-white">Inventory Management</h1>
          <p className="text-lg text-white max-w-md">
            Streamline your sales and inventory processes with our comprehensive management system
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-pharmacy-primary rounded-lg mr-2 flex items-center justify-center">
                <Package className="w-5 h-5 text-white" /> {/* Added a simple icon for the logo */}
              </div>
              <span className="text-xl font-semibold text-text-heading">Farmacia</span>
            </div>
            <h2 className="text-2xl font-bold text-text-heading mb-1">¡Bienvenido! 👋</h2>
            <p className="text-sm text-text-muted">Por favor, inicia sesión aquí</p>
          </div>
          <Formik
            initialValues={{
              username: "admin",
              password: "admin",
              rememberMe: false,
            }}
            onSubmit={(values, { setSubmitting }) => {
              login(values,
                {
                  onSuccess: (data) => {
                    setUser(data.data)
                    setIsAllowed(true)
                    localStorage.setItem("token", data.data.token)
                    navigate("/farmacias") // Use navigate from react-router-dom
                  },
                  onSettled: () => {
                    setSubmitting(false)
                  },
                },
              )
            }}
            validationSchema={validationSchema}
          >
            {({ isSubmitting, values, setFieldValue }) => (
              <Form className="space-y-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm text-text-body">
                    Usuario
                  </Label>
                  <InputField
                    name="username"
                    placeholder="Ingresar tu nombre de usuario"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password" className="text-sm text-text-body">
                    Contraseña
                  </Label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Ingresar tu contraseña"
                      disabled={isSubmitting}
                      className="w-full pr-10 h-11 text-sm border-gray-300 focus:border-pharmacy-primary focus:ring-pharmacy-primary"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-body"
                      aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={values.rememberMe}
                      onCheckedChange={(checked) => setFieldValue("rememberMe", checked)}
                      className="border-gray-300 data-[state=checked]:bg-pharmacy-primary data-[state=checked]:text-white"
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-text-body">
                      Recordarme
                    </Label>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full text-white h-11 text-sm font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    "Iniciar Sesión"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
