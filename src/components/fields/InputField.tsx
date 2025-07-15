import type React from "react"
import { ErrorMessage, Field } from "formik"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  placeholder?: string
}

function InputField({ name, className, ...props }: Props) {
  return (
    <div>
      <Field
        as={Input}
        className={cn(
          "h-11 text-sm border-gray-300 focus:border-pharmacy-primary focus:ring-pharmacy-primary",
          className,
        )}
        name={name}
        {...props}
      />
      <ErrorMessage name={name}>{(msg) => <p className="text-xs text-red-500 mt-1">{msg}</p>}</ErrorMessage>
    </div>
  )
}

export default InputField
