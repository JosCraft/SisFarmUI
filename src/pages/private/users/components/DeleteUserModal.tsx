"use client"

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

interface DeleteUserModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  username: string
  isDeleting: boolean
}

export function DeleteUserModal({ isOpen, onClose, onConfirm, username, isDeleting }: DeleteUserModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="rounded-lg shadow-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-text-heading">¿Estás absolutamente seguro?</AlertDialogTitle>
          <AlertDialogDescription className="text-text-muted">
            Esta acción no se puede deshacer. Esto eliminará permanentemente al usuario{" "}
            <span className="font-semibold text-red-600">{username}</span> de nuestros servidores.
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
