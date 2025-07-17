import { useField } from "formik"
import { Button } from "../ui/button"
import { Input } from "../ui/input"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  type?: "text" | "number"
  min?: number
  max?: number
}

function CounterField({ name, min = 0, max = 100, ...props }: Props) {

  const [, meta, helpers] = useField<number>(name)
  const { setValue } = helpers
  const { value } = meta

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={() => setValue(Math.max(min, (value || 0) - 1))}
        disabled={value <= min}
        variant="outline"
        className="text-xl"
      >
        +
      </Button>
      <Input
        name={name}
        type="text"
        className="w-15 text-center"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value
          if (newValue === "" || (props.type === "number" && !isNaN(Number(newValue)))) {
            setValue(Math.min(max, Math.max(min, Number(newValue))))
          } else {
            setValue(min)
          }
        }}
        {...props}
      />
      <Button
        type="button"
        onClick={() => setValue(Math.min(max, (value || 0) + 1))}
        disabled={value >= max}
        variant="outline"
        className="text-xl"
      >
        -
      </Button>
    </div>
  )
}

export default CounterField