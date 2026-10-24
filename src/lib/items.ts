import seed from "@/content/item-icons.json";

type SeedEntry = {
  icon: string;
  baseType: string;
  slotHint: string;
};

const icons = seed as Record<string, SeedEntry>;
const learned = new Map<string, string>();

export function rememberIcon(name: string, icon: string | null | undefined) {
  if (!name || !icon) return;
  learned.set(name.toLowerCase(), icon);
}

export function iconFor(name: string) {
  return learned.get(name.toLowerCase()) ?? icons[name]?.icon ?? null;
}

export function withIcon<T extends { name: string }>(item: T) {
  return { ...item, icon: item.name ? iconFor(item.name) : null };
}
