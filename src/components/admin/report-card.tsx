"use client";

import { useTransition } from "react";
import { Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteReport, updateReport } from "@/app/admin/actions/resources";
import { StatusBadge } from "@/components/admin/admin-ui";
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
import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/format";
import type { ReportItem } from "@/lib/types";

const STATUS_OPTIONS = [
  { value: "nouveau", label: "Nouveau" },
  { value: "en_cours", label: "En cours de traitement" },
  { value: "traite", label: "Traité" },
  { value: "rejete", label: "Rejeté / sans suite" },
];

export function ReportCard({ report }: { report: ReportItem }) {
  const [pending, startTransition] = useTransition();

  return (
    <article className="border border-border">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="numeral eyebrow text-muted-foreground">{report.reference}</span>
            <StatusBadge status={report.status} />
          </div>
          <h2 className="mt-2.5 text-lg font-medium">{report.category}</h2>
          <p className="mt-1 text-sm text-muted-foreground">{report.location}</p>
        </div>
        <div className="text-right">
          <p className="numeral eyebrow text-muted-foreground">
            {formatDateTime(report.createdAt)}
          </p>
          <p className="mt-2 text-sm">{report.name}</p>
          <a href={`mailto:${report.email}`} className="link-underline text-sm text-muted-foreground">
            {report.email}
          </a>
          {report.phone && (
            <p className="numeral mt-1 text-sm text-muted-foreground">{report.phone}</p>
          )}
        </div>
      </header>

      <div className="p-5">
        <p className="eyebrow mb-2 text-muted-foreground">Description</p>
        <p className="max-w-[80ch] text-sm leading-relaxed">{report.description}</p>
      </div>

      <form
        action={(formData) =>
          startTransition(async () => {
            await updateReport(formData);
            toast.success("Signalement mis à jour");
          })
        }
        className="border-t border-border bg-secondary/40 p-5"
      >
        <input type="hidden" name="id" value={report.id} />
        <div className="grid gap-4 sm:grid-cols-[14rem_1fr]">
          <div>
            <label
              htmlFor={`status-${report.id}`}
              className="eyebrow mb-2 block text-muted-foreground"
            >
              Suite donnée
            </label>
            <select
              id={`status-${report.id}`}
              name="status"
              defaultValue={report.status}
              className="w-full border border-input bg-background px-3 py-2.5 text-sm focus:border-foreground focus:outline-none"
            >
              {STATUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor={`note-${report.id}`}
              className="eyebrow mb-2 block text-muted-foreground"
            >
              Note de suivi interne
            </label>
            <input
              id={`note-${report.id}`}
              name="note"
              defaultValue={report.note ?? ""}
              placeholder="Transmis au service technique le…"
              className="w-full border border-input bg-background px-3 py-2.5 text-sm focus:border-foreground focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Button type="submit" size="sm" disabled={pending} className="rounded-none">
            <Save className="size-3.5" aria-hidden="true" />
            {pending ? "Enregistrement…" : "Enregistrer"}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-rouge"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
                Supprimer
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer ce signalement ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Le signalement {report.reference} et les coordonnées associées seront
                  définitivement effacés.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    startTransition(async () => {
                      await deleteReport(report.id);
                      toast.success("Signalement supprimé");
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
      </form>
    </article>
  );
}
