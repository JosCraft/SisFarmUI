import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useField } from "formik";

type Props = {
  list: { name: string; value: string }[]
  name: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
}

function SelectField({ list, name, placeholder, disabled, defaultValue }: Props) {

  const [, meta, helpers] = useField(name);
  const { setValue } = helpers;
  const { value } = meta;

  return (
    <Select
      onValueChange={setValue}
      value={String(value)}
      disabled={disabled}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || "Seleccionar"} />
      </SelectTrigger>
      <SelectContent>
        {list.map((item) => (
          <SelectItem
            key={item.value}
            value={item.value}
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SelectField