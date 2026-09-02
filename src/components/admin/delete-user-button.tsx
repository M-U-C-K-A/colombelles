"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteUser } from "@/app/admin/actions/resources";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function DeleteUserButton({ userId, username }: { userId: string; username: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          disabled={pending}
          title="Supprimer le compte"
          className="p-2 text-muted-foreground transition-colors hover:text-rouge disabled:opacity-40"
        >
          <Trash2 className="size-4" aria-hidden="true" />
          <span className="sr-only">Supprimer le compte {username}</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer le compte « {username} » ?</AlertDialogTitle>
          <AlertDialogDescription>
            L&apos;agent perdra immédiatement l&apos;accès à l&apos;espace d&apos;administration.
            Le dernier compte administrateur ne peut pas être supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteUser(userId);
                toast.success("Compte supprimé");
              })
            }
            className="bg-rouge text-white hover:bg-rouge/90"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
