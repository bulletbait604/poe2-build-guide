export function StatList({ lines }: { lines: string[] }) {
  if (!lines.length) return null;
  return (
    <ul data-stat-list="" className="mt-1 list-disc space-y-0.5 pl-4 text-sm text-parchment">
      {lines.map((line) => (
        <li key={line}>{line}</li>
      ))}
    </ul>
  );
}
