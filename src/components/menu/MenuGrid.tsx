"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MenuFilters } from "@/components/menu/MenuFilters";
import { useMenuStore } from "@/lib/menu-storage";

export function MenuGrid() {
  const { categories, items, hydrated } = useMenuStore();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems = useMemo(
    () => (activeCategory === "all" ? items : items.filter((item) => item.category === activeCategory)),
    [activeCategory, items],
  );

  return (
    <section className="bg-[#f7fbf6] py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MenuFilters categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />
        {!hydrated && <p className="mt-8 text-[#5f756b]">Menü hazırlanıyor...</p>}
        <motion.div layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.article
                layout
                key={item.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.24 }}
                className="rounded-lg border border-[#d9eadf] bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#4f8b6b]">
                      {categories.find((category) => category.id === item.category)?.name ?? "Menü"}
                    </p>
                    <h2 className="mt-3 text-2xl font-black text-[#20382f]">{item.name}</h2>
                  </div>
                  <p className="rounded-full bg-[#eef7f0] px-3 py-1 text-lg font-black text-[#9f2747]">{item.price} TL</p>
                </div>
                <p className="mt-4 leading-6 text-[#5f756b]">{item.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.featured && <span className="rounded-full bg-[#20382f] px-3 py-1 text-xs font-bold text-white">Favori</span>}
                  {item.tags?.map((tag) => (
                    <span key={tag} className="rounded-full border border-[#d9eadf] px-3 py-1 text-xs font-bold text-[#375649]">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
