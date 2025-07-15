import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetRol } from "@/hooks/useRol"

interface ChangeRoleSelectProps {
  userId: number
  currentRoleId: number
  onRoleChange: (userId: number, newRoleId: number) => void
  disabled?: boolean
}

export function ChangeRoleSelect({ userId, currentRoleId, onRoleChange, disabled }: ChangeRoleSelectProps) {

  const handleValueChange = (value: string) => {
    onRoleChange(userId, parseInt(value))
  }

  const { data: roles } = useGetRol()

  return (
    <Select value={String(currentRoleId)} onValueChange={handleValueChange} disabled={disabled}>
      <SelectTrigger className="w-[140px] h-9 text-sm border-gray-300 focus:ring-pharmacy-primary focus:border-pharmacy-primary">
        <SelectValue placeholder="Seleccionar Rol" />
      </SelectTrigger>
      <SelectContent>
        {roles.map((role) => (
          <SelectItem key={role.id} value={String(role.id)}>
            {role.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
