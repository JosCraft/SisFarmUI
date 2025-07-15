import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"
import { UsersTable } from "./components/UsersTable"
import { DeleteUserModal } from "./components/DeleteUserModal"
import type { User } from "@/interface/user"
import { mockRoles } from "@/utils/constant"
import { UserFormModal, type UserFormValues } from "./components/UserFormModalProps"
import { useCreateUser, useDeleteUser, useGetUsers, useUpdateRole, useUpdateUser } from "@/hooks/useUser"

export default function UsersPage() {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Para formularios
  const [isDeleting, setIsDeleting] = useState(false) // Para eliminación
  const { data: { data: users = [] } } = useGetUsers(1)
  const { mutate: createUser } = useCreateUser()
  const { mutate: deleteUser } = useDeleteUser()
  const { mutate: updateUser } = useUpdateUser()
  const { mutate: updateRole } = useUpdateRole()

  const handleCreateUser = async (values: UserFormValues) => {
    if (!values.password) return toast.error("La contraseña es requerida")
    createUser({
      full_name: values.full_name,
      username: values.username,
      phone: values.phone,
      address: values.address,
      role_id: 1,
      password_hash: values.password,
    })
    setIsSubmitting(true)
    setIsCreateModalOpen(false)
    setIsSubmitting(false)
    toast("Usuario Creado", {
      description: `El usuario ${values.username} ha sido creado exitosamente.`,
    })
  }

  const handleEditUser = async (values: UserFormValues) => {
    if (!values.id) return toast.error("El ID del usuario es requerido")
    updateUser({
      id: values.id,
      full_name: values.full_name,
      phone: values.phone,
      address: values.address,
    })
    setIsSubmitting(true)
    setIsEditModalOpen(false)
    setSelectedUser(null)
    setIsSubmitting(false)
    toast("Usuario Editado", {
      description: `El usuario ${values.username} ha sido editado exitosamente.`,
    })
  }

  const handleDeleteUser = async () => {
    if (selectedUser) {
      deleteUser(selectedUser.id)
      setIsDeleting(true)
      setIsDeleteModalOpen(false)
      setSelectedUser(null)
      setIsDeleting(false)
      toast("Usuario Eliminado", {
        description: `El usuario ${selectedUser.username} ha sido eliminado exitosamente.`,
      })
    }
  }

  const handleStatus = async (userId: number, status: boolean) => {
    updateUser({ id: userId, status })
    toast(status ? "Usuario Activado" : "Usuario Desactivado", {
      description: `El usuario ha sido ${status ? "activado" : "desactivado"} exitosamente.`,
    })
  }

  const handleChangeUserRole = async (userId: number, newRoleId: number) => {
    updateRole({ id: userId, role_id: newRoleId })
    toast("Rol Actualizado", {
      description: `El rol del usuario ha sido actualizado exitosamente.`,
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-heading">Gestión de Usuarios</h1>
        <Button onClick={() => setIsCreateModalOpen(true)} >
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo Usuario
        </Button>
      </div>

      <UsersTable
        data={users}
        roles={mockRoles}
        onEdit={(user) => {
          setSelectedUser(user)
          setIsEditModalOpen(true)
        }}
        onDelete={(user) => {
          setSelectedUser(user)
          setIsDeleteModalOpen(true)
        }}
        onRoleChange={handleChangeUserRole}
        onStatusChange={handleStatus}
      />

      <UserFormModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false)
          setIsEditModalOpen(false)
          setSelectedUser(null)
        }}
        user={selectedUser}
        roles={mockRoles}
        onSubmit={selectedUser ? handleEditUser : handleCreateUser}
        isSubmitting={isSubmitting}
      />

      {selectedUser && (
        <DeleteUserModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedUser(null)
          }}
          onConfirm={handleDeleteUser}
          username={selectedUser.username}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}
