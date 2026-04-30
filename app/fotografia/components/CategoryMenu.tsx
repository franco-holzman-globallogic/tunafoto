import { CATEGORIAS } from "@/lib/constants";

interface CategoryMenuProps {
  id: string;
  active: { slug: string };
  onSelect: (cat: (typeof CATEGORIAS)[number]) => void;
  className?: string;
}

export default function CategoryMenu({ id, active, onSelect, className }: CategoryMenuProps) {
  return (
    <div className={className}>
      {CATEGORIAS.map((cat) => (
        <button
          key={`${id}-${cat.slug}`}
          onClick={() => onSelect(cat)}
          className={`relative whitespace-nowrap transition-all duration-300 ${
            active.slug === cat.slug ? "text-black" : "text-gray-400 hover:text-black"
          }`}
        >
          {cat.name}
          {active.slug === cat.slug && (
            <span className="absolute left-0 -bottom-2 w-full h-[1px] bg-black" />
          )}
        </button>
      ))}
    </div>
  );
}
