import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface DeleteProductModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  productName: string
  isDeleting: boolean
}

export function DeleteProductModal({
  isOpen,
  onClose,
  onConfirm,
  productName,
  isDeleting
}: DeleteProductModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-heading">¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-text-muted">
            Esta acción no se puede deshacer. Esto eliminará permanentemente el producto{" "}
            <span className="font-semibold text-red-600">{productName}</span> de nuestros registros.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
