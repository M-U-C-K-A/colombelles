"use client";

import { useTransition } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMessage, toggleMessageRead } from "@/app/admin/actions/resources";
import { formatDateTime } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { MessageItem } from "@/lib/types";

export function MessageRow({ message }: { message: MessageItem }) {
  const [pending, startTransition] = useTransition();

  return (
    <article
      className={cn(
        "border border-border p-5 transition-colors",
        !message.read && "border-l-2 border-l-rouge",
      )}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-medium">{message.subject}</h2>
            {!message.read && <span className="eyebrow text-rouge">Non lu</span>}
          </div>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {message.name} ·{" "}
            <a href={`mailto:${message.email}`} className="link-underline">
              {message.email}
            </a>
          </p>
          <p className="eyebrow mt-2 text-muted-foreground">
            Destinataire : {message.service}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <span className="numeral eyebrow mr-2 text-muted-foreground">
            {formatDateTime(message.createdAt)}
          </span>
          <button
            type="button"
            disabled={pending}
            title={message.read ? "Marquer comme non lu" : "Marquer comme lu"}
            onClick={() =>
              startTransition(async () => {
                await toggleMessageRead(message.id);
              })
            }
            className="p-2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            {message.read ? (
              <Mail className="size-4" aria-hidden="true" />
            ) : (
              <MailOpen className="size-4" aria-hidden="true" />
            )}
            <span className="sr-only">
              {message.read ? "Marquer comme non lu" : "Marquer comme lu"}
            </span>
          </button>
          <button
            type="button"
            disabled={pending}
            title="Supprimer"
            onClick={() =>
              startTransition(async () => {
                await deleteMessage(message.id);
                toast.success("Message supprimé");
              })
            }
            className="p-2 text-muted-foreground transition-colors hover:text-rouge disabled:opacity-40"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            <span className="sr-only">Supprimer le message</span>
          </button>
        </div>
      </header>

      <p className="mt-4 max-w-[80ch] border-t border-border pt-4 text-sm leading-relaxed whitespace-pre-line">
        {message.message}
      </p>

      <a
        href={`mailto:${message.email}?subject=${encodeURIComponent(`Re : ${message.subject}`)}`}
        className="mt-5 inline-flex items-center gap-2 border border-foreground px-4 py-2 text-sm font-medium transition-colors hover:bg-foreground hover:text-background"
      >
        Répondre
      </a>
    </article>
  );
}
