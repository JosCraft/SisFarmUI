import { mockUsers } from "@/utils/constant"
import { PurchaseFormModal } from "./components/PurchaseFormModal"
import { PurchasesTable } from "./components/PurchasesTable"
import { usePurchasesPaginate } from "@/hooks/usePurchase"

export default function PurchasesPage() {

  const { data: { data: purchases } } = usePurchasesPaginate(1)

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-text-heading">Gestión de Compras</h1>
        <PurchaseFormModal />
      </div>

      <PurchasesTable data={purchases} users={mockUsers} />
    </div>
  )
}
