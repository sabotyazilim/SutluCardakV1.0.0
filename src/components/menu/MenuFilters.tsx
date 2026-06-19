"use client";

import clsx from "clsx";
import type { MenuCategory } from "@/types/menu";

type MenuFiltersProps = {
  categories: MenuCategory[];
  activeCategory: string;
  onChange: (category: string) => void;
};

export function MenuFilters({ categories, activeCategory, onChange }: MenuFiltersProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={clsx(
          "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition",
          activeCategory === "all" ? "bg-[#20382f] text-white" : "bg-white text-[#375649] hover:bg-[#e7f3ea]",
        )}
      >
        Tümü
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={clsx(
            "whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition",
            activeCategory === category.id ? "bg-[#20382f] text-white" : "bg-white text-[#375649] hover:bg-[#e7f3ea]",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
