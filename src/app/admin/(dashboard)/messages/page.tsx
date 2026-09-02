import { AdminBody, AdminHeader, EmptyState } from "@/components/admin/admin-ui";
import { MessageRow } from "@/components/admin/message-row";
import { read } from "@/lib/db";

export default async function Page() {
  const messages = (await read("messages")).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const unread = messages.filter((m) => !m.read).length;

  return (
    <>
      <AdminHeader
        crumbs={[{ label: "Messages" }]}
        title="Messages"
        description={
          unread > 0
            ? `${unread} message${unread > 1 ? "s" : ""} non lu${unread > 1 ? "s" : ""} sur ${messages.length}.`
            : "Les demandes reçues via le formulaire de contact du site public."
        }
      />
      <AdminBody>
        {messages.length === 0 ? (
          <EmptyState
            title="Aucun message"
            description="Les messages envoyés depuis le formulaire de contact apparaîtront ici."
          />
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </div>
        )}
      </AdminBody>
    </>
  );
}
