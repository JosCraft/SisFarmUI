import { Field } from "formik"
import { Input } from "../ui/input"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  name: string
}

function PasswordField({ name, className, ...rest }: Props) {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Field
        as={Input}
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="Ingresar tu contraseña"
        className={cn("w-full pr-10 h-11 text-sm border-gray-300 focus:border-pharmacy-primary focus:ring-pharmacy-primary", className)}
        autoComplete="current-password"
        {...rest}
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
  )
}

export default PasswordField