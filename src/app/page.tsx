import Link from "next/link";
import { Coffee, Croissant, Milk, Star } from "lucide-react";
import { ContactSection } from "@/components/site/ContactSection";
import { Hero } from "@/components/site/Hero";
import { defaultMenuState } from "@/lib/menu-data";

const highlights = [
  { icon: Milk, title: "Günlük sütle hazırlık", text: "Sütlü tatlılarımız her gün taze üretim ritmiyle hazırlanır." },
  { icon: Coffee, title: "Özenli kahve barı", text: "Espresso bazlı içeceklerden soğuk demlemeye dengeli reçeteler." },
  { icon: Croissant, title: "Rahat kahvaltı", text: "Sakin sabahlar için sıcak tabaklar ve paylaşmalık lezzetler." },
];

export default function Home() {
  const featuredItems = defaultMenuState.items.filter((item) => item.featured).slice(0, 3);

  return (
    <>
      <Hero />
      <section className="bg-[#f7fbf6] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-lg border border-[#d9eadf] bg-white p-6 shadow-sm">
                  <Icon className="text-[#4f8b6b]" size={28} />
                  <h2 className="mt-4 text-xl font-bold">{item.title}</h2>
                  <p className="mt-2 leading-6 text-[#5f756b]">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="bg-white py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-[#9f2747]">
                <Star size={16} />
                Öne çıkanlar
              </p>
              <h2 className="mt-3 text-3xl font-black text-[#20382f] sm:text-4xl">Çardak favorileri</h2>
            </div>
            <Link href="/menu" className="font-bold text-[#315c4c] hover:text-[#20382f]">
              Tüm menüyü gör
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {featuredItems.map((item) => (
              <article key={item.id} className="rounded-lg border border-[#d9eadf] bg-[#f7fbf6] p-6">
                <p className="text-sm font-semibold text-[#4f8b6b]">{item.tags?.join(" • ")}</p>
                <h3 className="mt-3 text-2xl font-bold">{item.name}</h3>
                <p className="mt-3 min-h-24 leading-6 text-[#5f756b]">{item.description}</p>
                <p className="mt-4 text-xl font-black text-[#9f2747]">{item.price} TL</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
