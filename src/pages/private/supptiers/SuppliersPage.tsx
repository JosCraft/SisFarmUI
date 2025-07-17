import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"
import type { Provider } from "@/interface/provider"
import { ProvidersTable } from "./components/ProvidersTable"
import { CreateProviderModal } from "./components/CreateProviderModal"
import { EditProviderModal } from "./components/EditProviderModal"
import { DeleteProviderModal } from "./components/DeleteProviderModal"
import { useCreateSupplier, useDeleteSupplier, useGetSuppliersPaginate, useUpdateSupplier } from "@/hooks/useSupptiers"

export default function SuppliersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // Para formularios
  const [isDeleting, setIsDeleting] = useState(false) // Para eliminación
  const { data: { data: providers } } = useGetSuppliersPaginate(1)
  const { mutate: createSupplier } = useCreateSupplier()
  const { mutate: updateSupplier } = useUpdateSupplier()
  const { mutate: deleteSupplier } = useDeleteSupplier()

  const getExistingNits = (excludeId?: number) => {
    return providers.filter((p) => p.id !== excludeId).map((p) => p.nit)
  }

  const handleCreateProvider = async (values: Omit<Provider, "id">) => {
    setIsSubmitting(true)
    createSupplier({
      address: values.address,
      name: values.name,
      nit: values.nit,
      phone: values.phone,
    })
    setIsCreateModalOpen(false)
    setIsSubmitting(false)
    toast("Proveedor Creado", {
      description: `El proveedor ${values.name} ha sido creado exitosamente.`,
    })
  }

  const handleEditProvider = async (values: Provider) => {
    setIsSubmitting(true)
    updateSupplier({
      id: values.id,
      address: values.address,
      name: values.name,
      nit: values.nit,
      phone: values.phone,
    })
    setIsEditModalOpen(false)
    setSelectedProvider(null)
    setIsSubmitting(false)
    toast("Proveedor Actualizado", {
      description: `El proveedor ${values.name} ha sido actualizado exitosamente.`,
    })
  }

  const handleDeleteProvider = async () => {
    if (selectedProvider) {
      setIsDeleting(true)
      deleteSupplier(selectedProvider.id)
      setIsDeleteModalOpen(false)
      setSelectedProvider(null)
      setIsDeleting(false)
      toast("Proveedor Eliminado", {
        description: `El proveedor ${selectedProvider.name} ha sido eliminado exitosamente.`,
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-heading">Gestión de Proveedores</h1>
        <Button onClick={() => setIsCreateModalOpen(true)} >
          <PlusCircle className="mr-2 h-4 w-4" /> Crear Nuevo Proveedor
        </Button>
      </div>

      <ProvidersTable
        data={providers}
        onEdit={(provider) => {
          setSelectedProvider(provider)
          setIsEditModalOpen(true)
        }}
        onDelete={(provider) => {
          setSelectedProvider(provider)
          setIsDeleteModalOpen(true)
        }}
      />

      <CreateProviderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProvider}
        isSubmitting={isSubmitting}
      />

      {/* Modal para Editar Proveedor */}
      {selectedProvider && (
        <EditProviderModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedProvider(null)
          }}
          provider={selectedProvider}
          onSubmit={handleEditProvider}
          isSubmitting={isSubmitting}
          existingNits={getExistingNits(selectedProvider.id)}
        />
      )}

      {/* Modal para Eliminar Proveedor */}
      {selectedProvider && (
        <DeleteProviderModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false)
            setSelectedProvider(null)
          }}
          onConfirm={handleDeleteProvider}
          providerName={selectedProvider.name}
          isDeleting={isDeleting}
        />
      )}
    </div>
  )
}
