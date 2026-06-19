"use client";

import { FormEvent, useMemo, useState } from "react";
import { Plus, RotateCcw, Save, Trash2 } from "lucide-react";
import { useMenuStore } from "@/lib/menu-storage";
import type { MenuCategory, MenuItem } from "@/types/menu";

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function MenuEditor() {
  const { categories, items, setCategories, setItems, resetMenu } = useMenuStore();
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [draft, setDraft] = useState({
    name: "",
    category: categories[0]?.id ?? "",
    description: "",
    price: "",
    tags: "",
    featured: false,
  });

  const categoryOptions = useMemo(() => categories, [categories]);

  function addCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = newCategoryName.trim();
    if (!name) {
      return;
    }

    const id = slugify(name) || `kategori-${Date.now()}`;
    const category: MenuCategory = {
      id,
      name,
      description: newCategoryDescription.trim() || "Sütlü Çardak menüsünde yeni kategori.",
    };

    setCategories([...categories, category]);
    setNewCategoryName("");
    setNewCategoryDescription("");
    setDraft((current) => ({ ...current, category: current.category || id }));
  }

  function removeCategory(categoryId: string) {
    setCategories(categories.filter((category) => category.id !== categoryId));
    setItems(items.filter((item) => item.category !== categoryId));
  }

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = draft.name.trim();
    const category = draft.category || categories[0]?.id;
    const price = Number(draft.price);

    if (!name || !category || Number.isNaN(price)) {
      return;
    }

    const item: MenuItem = {
      id: `${slugify(name) || "urun"}-${Date.now()}`,
      name,
      category,
      description: draft.description.trim(),
      price,
      tags: draft.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      featured: draft.featured,
    };

    setItems([item, ...items]);
    setDraft({
      name: "",
      category,
      description: "",
      price: "",
      tags: "",
      featured: false,
    });
  }

  function updateItem(id: string, patch: Partial<MenuItem>) {
    setItems(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }

  function removeItem(id: string) {
    setItems(items.filter((item) => item.id !== id));
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-6">
        <form onSubmit={addCategory} className="rounded-lg border border-[#d9eadf] bg-white p-5">
          <h2 className="text-xl font-black text-[#20382f]">Kategori ekle</h2>
          <div className="mt-4 grid gap-3">
            <input
              value={newCategoryName}
              onChange={(event) => setNewCategoryName(event.target.value)}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="Kategori adı"
            />
            <textarea
              value={newCategoryDescription}
              onChange={(event) => setNewCategoryDescription(event.target.value)}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="Kategori açıklaması"
            />
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#20382f] px-5 py-3 font-bold text-white">
              <Plus size={18} />
              Kategori Ekle
            </button>
          </div>
        </form>

        <form onSubmit={addItem} className="rounded-lg border border-[#d9eadf] bg-white p-5">
          <h2 className="text-xl font-black text-[#20382f]">Ürün ekle</h2>
          <div className="mt-4 grid gap-3">
            <input
              value={draft.name}
              onChange={(event) => setDraft({ ...draft, name: event.target.value })}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="Ürün adı"
              required
            />
            <select
              value={draft.category}
              onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              required
            >
              {categoryOptions.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <textarea
              value={draft.description}
              onChange={(event) => setDraft({ ...draft, description: event.target.value })}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="İçerik / açıklama"
              required
            />
            <input
              value={draft.price}
              onChange={(event) => setDraft({ ...draft, price: event.target.value })}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="Fiyat"
              type="number"
              min="0"
              required
            />
            <input
              value={draft.tags}
              onChange={(event) => setDraft({ ...draft, tags: event.target.value })}
              className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3"
              placeholder="Etiketler: Sıcak, Yeni"
            />
            <label className="flex items-center gap-2 text-sm font-bold text-[#20382f]">
              <input
                type="checkbox"
                checked={draft.featured}
                onChange={(event) => setDraft({ ...draft, featured: event.target.checked })}
              />
              Favori ürün
            </label>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#20382f] px-5 py-3 font-bold text-white">
              <Plus size={18} />
              Ürün Ekle
            </button>
          </div>
        </form>
      </div>

      <div className="space-y-6">
        <section className="rounded-lg border border-[#d9eadf] bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-black text-[#20382f]">Kategoriler</h2>
            <button
              type="button"
              onClick={resetMenu}
              className="inline-flex items-center gap-2 rounded-full border border-[#c9dfd0] px-4 py-2 text-sm font-bold text-[#20382f]"
            >
              <RotateCcw size={16} />
              Varsayılana Dön
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {categories.map((category) => (
              <div key={category.id} className="rounded-md border border-[#e1eee6] p-4">
                <input
                  value={category.name}
                  onChange={(event) =>
                    setCategories(categories.map((current) => (current.id === category.id ? { ...current, name: event.target.value } : current)))
                  }
                  className="focus-ring w-full rounded-md border border-[#c9dfd0] px-3 py-2 font-bold"
                />
                <textarea
                  value={category.description}
                  onChange={(event) =>
                    setCategories(
                      categories.map((current) => (current.id === category.id ? { ...current, description: event.target.value } : current)),
                    )
                  }
                  className="focus-ring mt-2 w-full rounded-md border border-[#c9dfd0] px-3 py-2 text-sm"
                />
                <button
                  type="button"
                  onClick={() => removeCategory(category.id)}
                  className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-[#9f2747]"
                >
                  <Trash2 size={15} />
                  Kategoriyi Sil
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-[#d9eadf] bg-white p-5">
          <h2 className="text-xl font-black text-[#20382f]">Ürünler</h2>
          <div className="mt-4 grid gap-4">
            {items.map((item) => (
              <article key={item.id} className="rounded-md border border-[#e1eee6] p-4">
                <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                  <input
                    value={item.name}
                    onChange={(event) => updateItem(item.id, { name: event.target.value })}
                    className="focus-ring rounded-md border border-[#c9dfd0] px-3 py-2 font-bold"
                  />
                  <input
                    value={item.price}
                    onChange={(event) => updateItem(item.id, { price: Number(event.target.value) })}
                    className="focus-ring rounded-md border border-[#c9dfd0] px-3 py-2 font-bold"
                    type="number"
                    min="0"
                  />
                </div>
                <select
                  value={item.category}
                  onChange={(event) => updateItem(item.id, { category: event.target.value })}
                  className="focus-ring mt-3 w-full rounded-md border border-[#c9dfd0] px-3 py-2"
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <textarea
                  value={item.description}
                  onChange={(event) => updateItem(item.id, { description: event.target.value })}
                  className="focus-ring mt-3 w-full rounded-md border border-[#c9dfd0] px-3 py-2"
                />
                <input
                  value={item.tags?.join(", ") ?? ""}
                  onChange={(event) =>
                    updateItem(item.id, {
                      tags: event.target.value.split(",").map((tag) => tag.trim()).filter(Boolean),
                    })
                  }
                  className="focus-ring mt-3 w-full rounded-md border border-[#c9dfd0] px-3 py-2"
                  placeholder="Etiketler"
                />
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm font-bold text-[#20382f]">
                    <input
                      type="checkbox"
                      checked={Boolean(item.featured)}
                      onChange={(event) => updateItem(item.id, { featured: event.target.checked })}
                    />
                    Favori ürün
                  </label>
                  <div className="flex gap-3">
                    <span className="inline-flex items-center gap-1 text-sm font-bold text-[#4f8b6b]">
                      <Save size={15} />
                      Otomatik kaydedildi
                    </span>
                    <button type="button" onClick={() => removeItem(item.id)} className="inline-flex items-center gap-2 text-sm font-bold text-[#9f2747]">
                      <Trash2 size={15} />
                      Sil
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
