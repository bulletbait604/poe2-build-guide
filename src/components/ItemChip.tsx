import Image from "next/image";

export function ItemChip({
  name,
  slot,
  icon,
  price,
}: {
  name: string;
  slot?: string;
  icon?: string | null;
  price?: string | null;
}) {
  return (
    <figure className="flex w-28 shrink-0 flex-col gap-1">
      <div className="relative h-20 w-20 border border-gold/50 bg-black/50">
        {icon ? (
          <Image src={icon} alt="" fill className="object-contain p-1" sizes="80px" />
        ) : (
          <span className="flex h-full items-center justify-center px-1 text-center font-display text-[10px] tracking-wide text-gold-2 uppercase">
            {slot || "Item"}
          </span>
        )}
      </div>
      <figcaption className="text-xs leading-4">
        <span className="block text-gold">{name}</span>
        {slot ? <span className="block text-muted">{slot}</span> : null}
        {price ? <span className="block text-parchment/80">{price}</span> : null}
      </figcaption>
    </figure>
  );
}
