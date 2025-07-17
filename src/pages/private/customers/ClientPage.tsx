import { ClientsTable } from "./components/ClientsTable"
import { useGetClientPaginate } from "@/hooks/useCustomer"

export default function ClientsPage() {

  const { data: { data: clients } } = useGetClientPaginate()

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-heading">Gestión de Clientes</h1>
      </div>
      <ClientsTable data={clients} />
    </div>
  )
}
