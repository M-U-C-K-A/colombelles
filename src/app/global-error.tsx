"use client";

/** Dernier filet : ce composant remplace entièrement le document. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f6",
          color: "#1b1b1e",
          fontFamily: "system-ui, -apple-system, Helvetica, Arial, sans-serif",
          padding: "2rem",
        }}
      >
        <main style={{ maxWidth: "34rem" }}>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#d92b1f",
              margin: 0,
            }}
          >
            Erreur critique
          </p>
          <h1
            style={{
              fontSize: "2.5rem",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
              fontWeight: 500,
              margin: "1.5rem 0 0",
            }}
          >
            Le site est momentanément indisponible
          </h1>
          <p style={{ marginTop: "1.5rem", lineHeight: 1.65, color: "#5c5c60" }}>
            Nos équipes ont été alertées. Vous pouvez recharger la page ou joindre la mairie au
            02&nbsp;31&nbsp;35&nbsp;25&nbsp;00.
          </p>
          {error.digest && (
            <p style={{ marginTop: "1rem", fontSize: "0.8125rem", color: "#8a8a8f" }}>
              Référence : {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: "2rem",
              background: "#1b1b1e",
              color: "#faf9f6",
              border: 0,
              padding: "0.9rem 1.6rem",
              fontSize: "0.875rem",
              cursor: "pointer",
            }}
          >
            Recharger la page
          </button>
        </main>
      </body>
    </html>
  );
}
