"use client";

import Link from "next/link";
import { useTransition } from "react";
import { Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteResource, toggleStatus, type ResourceKind } from "@/app/admin/actions/resources";
import { Hint } from "@/components/admin/admin-hints";
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

export function RowActions({
  kind,
  recordId,
  editHref,
  label,
  status,
  viewHref,
}: {
  kind: ResourceKind;
  recordId: string;
  editHref: string;
  label: string;
  status?: string;
  viewHref?: string;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-1">
      {viewHref && status === "publie" && (
        <Hint label="Ouvrir sur le site public, dans un nouvel onglet">
          <Link
            href={viewHref}
            target="_blank"
            className="p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Eye className="size-4" aria-hidden="true" />
            <span className="sr-only">Voir « {label} » sur le site</span>
          </Link>
        </Hint>
      )}

      {status && (
        <Hint
          label={
            status === "publie"
              ? "Dépublier : le contenu disparaît du site, sans être supprimé"
              : "Publier : le contenu devient visible sur le site"
          }
        >
        <button
          type="button"
          disabled={pending}
          onClick={() =>
            startTransition(async () => {
              await toggleStatus(kind, recordId);
              toast.success(status === "publie" ? "Contenu dépublié" : "Contenu publié");
            })
          }
          className="p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          {status === "publie" ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {status === "publie" ? "Dépublier" : "Publier"} « {label} »
          </span>
        </button>
        </Hint>
      )}

      <Hint label="Modifier la fiche">
        <Link
          href={editHref}
          className="p-2 text-muted-foreground transition-colors hover:text-foreground"
        >
          <Pencil className="size-4" aria-hidden="true" />
          <span className="sr-only">Modifier « {label} »</span>
        </Link>
      </Hint>

      <AlertDialog>
        <Hint label="Supprimer définitivement — sans retour possible">
        <AlertDialogTrigger asChild>
          <button
            type="button"
            className="p-2 text-muted-foreground transition-colors hover:text-rouge"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            <span className="sr-only">Supprimer « {label} »</span>
          </button>
        </AlertDialogTrigger>
        </Hint>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer définitivement ?</AlertDialogTitle>
            <AlertDialogDescription>
              « {label} » sera retiré du site et de la base. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() =>
                startTransition(async () => {
                  await deleteResource(kind, recordId);
                })
              }
              className="bg-rouge text-white hover:bg-rouge/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
