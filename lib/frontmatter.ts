export type FrontmatterRecord = Record<string, string | boolean | number>;

export function parseScalar(value: string): string | boolean {
  const trimmed = value.trim();
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseFrontmatter(source: string): { data: FrontmatterRecord; body: string } {
  if (!source.startsWith("---")) {
    return { data: {}, body: source };
  }

  const end = source.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: source };
  }

  const frontMatter = source.slice(3, end).replace(/^\r?\n/, "");
  const body = source.slice(end + 4).replace(/^\r?\n/, "");
  const data: FrontmatterRecord = {};
  const lines = frontMatter.split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    if (!line.trim() || line.trim().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!match) continue;

    const key = match[1];
    const value = match[2];
    if (value.trim() === "|") {
      const block: string[] = [];
      i += 1;
      while (i < lines.length && (/^\s+/.test(lines[i]) || lines[i].trim() === "")) {
        block.push(lines[i].replace(/^  /, ""));
        i += 1;
      }
      i -= 1;
      data[key] = block.join("\n").trim();
    } else {
      data[key] = parseScalar(value);
    }
  }

  return { data, body };
}

export function slugFromFilename(fileName: string): string {
  const base = fileName.replace(/\.md$/i, "");
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}
