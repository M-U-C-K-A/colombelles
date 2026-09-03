import type { ReactNode } from "react";

/**
 * Rendu d'un sous-ensemble de Markdown vers du JSX.
 *
 * Volontairement minimal — titres, paragraphes, listes, citations, tableaux,
 * gras, liens, code — et sans `dangerouslySetInnerHTML` : le contenu saisi
 * depuis l'espace d'administration n'est jamais interprété comme du HTML.
 */

type Block =
  | { kind: "h2" | "h3" | "h4" | "p" | "quote"; text: string }
  | { kind: "ul" | "ol"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] }
  | { kind: "hr" };

function parse(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  let buffer: string[] = [];

  const flushParagraph = () => {
    if (buffer.length) {
      blocks.push({ kind: "p", text: buffer.join(" ").trim() });
      buffer = [];
    }
  };

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      flushParagraph();
      continue;
    }

    const heading = /^(#{2,4})\s+(.*)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      const level = heading[1].length;
      blocks.push({ kind: level === 2 ? "h2" : level === 3 ? "h3" : "h4", text: heading[2] });
      continue;
    }

    if (/^(-{3,}|_{3,}|\*{3,})$/.test(trimmed)) {
      flushParagraph();
      blocks.push({ kind: "hr" });
      continue;
    }

    if (trimmed.startsWith("> ")) {
      flushParagraph();
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quote.push(lines[i].trim().slice(2));
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "quote", text: quote.join(" ") });
      continue;
    }

    // Tableau : | a | b |  /  | --- | --- |
    if (trimmed.startsWith("|") && lines[i + 1]?.trim().startsWith("|") && /^\|[\s:|-]+\|$/.test(lines[i + 1].trim())) {
      flushParagraph();
      const cells = (row: string) =>
        row.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());
      const head = cells(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(cells(lines[i]));
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "table", head, rows });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "ul", items });
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      flushParagraph();
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      i -= 1;
      blocks.push({ kind: "ol", items });
      continue;
    }

    buffer.push(trimmed);
  }

  flushParagraph();
  return blocks;
}

/** Gras, italique, code et liens — appliqués récursivement sur un fragment. */
function inline(text: string, keyPrefix = "i"): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|__[^_]+__|`[^`]+`|\[[^\]]+\]\([^)\s]+\)|\*[^*\s][^*]*\*)/g;
  const out: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let n = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) out.push(text.slice(last, match.index));
    const token = match[0];
    const key = `${keyPrefix}-${n++}`;

    if (token.startsWith("**") || token.startsWith("__")) {
      out.push(<strong key={key}>{inline(token.slice(2, -2), key)}</strong>);
    } else if (token.startsWith("`")) {
      out.push(
        <code key={key} className="bg-muted px-1.5 py-0.5 font-mono text-[0.9em]">
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      if (link) {
        const external = /^https?:\/\//.test(link[2]);
        out.push(
          <a
            key={key}
            href={link[2]}
            className="link-underline"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {inline(link[1], key)}
          </a>,
        );
      } else {
        out.push(token);
      }
    } else {
      out.push(<em key={key}>{inline(token.slice(1, -1), key)}</em>);
    }
    last = match.index + token.length;
  }

  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ content, className }: { content: string; className?: string }) {
  const blocks = parse(content);

  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const key = `b-${index}`;
        switch (block.kind) {
          case "h2":
            return <h2 key={key}>{inline(block.text, key)}</h2>;
          case "h3":
            return <h3 key={key}>{inline(block.text, key)}</h3>;
          case "h4":
            return (
              <h4 key={key} className="font-medium">
                {inline(block.text, key)}
              </h4>
            );
          case "p":
            return <p key={key}>{inline(block.text, key)}</p>;
          case "quote":
            return (
              <blockquote
                key={key}
                className="border-l-2 border-rouge pl-5 text-[1.05rem] leading-relaxed italic"
              >
                {inline(block.text, key)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={key}>
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{inline(item, `${key}-${j}`)}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={key} className="list-decimal">
                {block.items.map((item, j) => (
                  <li key={`${key}-${j}`}>{inline(item, `${key}-${j}`)}</li>
                ))}
              </ol>
            );
          case "hr":
            return <hr key={key} className="border-border" />;
          case "table":
            return (
              <div key={key} className="-mx-1 overflow-x-auto">
                <table className="w-full min-w-[32rem] border-collapse text-sm">
                  <thead>
                    <tr>
                      {block.head.map((cell, j) => (
                        <th
                          key={`${key}-h-${j}`}
                          className="border-b-2 border-foreground px-2 py-2.5 text-left font-medium"
                        >
                          {inline(cell, `${key}-h-${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={`${key}-r-${r}`} className="border-b border-border">
                        {row.map((cell, c) => (
                          <td key={`${key}-r-${r}-${c}`} className="px-2 py-2.5 align-top">
                            {inline(cell, `${key}-r-${r}-${c}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}

/** Extrait textuel brut, pour les métadonnées et la recherche. */
export function plainText(markdown: string, maxLength = 200): string {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|]/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? `${text.slice(0, maxLength - 1).trimEnd()}…` : text;
}
