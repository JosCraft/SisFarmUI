import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, MapPin, Phone, Building } from "lucide-react" // Iconos para los detalles
import { cn } from "@/lib/utils" // Para clases condicionales
import { Link } from "react-router-dom"
import { useGetPharmacies } from "@/hooks/usePharmacy"

export default function SelectPharmacyPage() {

  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null)
  const { data: mockPharmacies } = useGetPharmacies()

  const handleSelectPharmacy = (id: string) => {
    setSelectedPharmacyId(id)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center mb-4">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-2">
            <Package className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-bold text-text-heading">Selecciona tu Farmacia</span>
        </div>
        <p className="text-lg text-text-body max-w-md mx-auto">
          Elige la farmacia a la que deseas acceder para gestionar su inventario.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {mockPharmacies.map((pharmacy) => (
          <Card
            key={pharmacy.id}
            className={cn(
              "cursor-pointer border-2 transition-all duration-200 ease-in-out",
              "hover:shadow-lg",
              selectedPharmacyId === pharmacy.id
                ? "border-pharmacy-primary shadow-lg ring-2 ring-pharmacy-primary"
                : "border-gray-200 shadow-sm",
            )}
            onClick={() => handleSelectPharmacy(pharmacy.id)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-semibold text-text-heading flex items-center">
                <Building className="mr-2 h-5 w-5 " /> {pharmacy.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-text-body space-y-2">
              <p className="flex items-center">
                <span className="font-medium mr-2">NIT:</span> {pharmacy.nit}
              </p>
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 flex-shrink-0 mt-1" /> {pharmacy.address}
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2" /> {pharmacy.phone}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <Link to="/dashboard" >
          <Button
            className="h-12 px-8 text-lg text-white shadow-md transition-transform transform hover:scale-105"
            disabled={!selectedPharmacyId}
          >
            Ir al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
