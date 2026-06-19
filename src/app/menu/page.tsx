import { MenuGrid } from "@/components/menu/MenuGrid";

export const metadata = {
  title: "Menü | Sütlü Çardak",
  description: "Sütlü Çardak içecek, sütlü tatlı, kahvaltı ve atıştırmalık menüsü.",
};

export default function MenuPage() {
  return (
    <>
      <section className="bg-[#20382f] py-16 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#cfe5d6]">Güncel Menü</p>
          <h1 className="mt-4 text-4xl font-black sm:text-6xl">Her mola için dengeli lezzetler</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[#dcebe1]">
            Sütlü tatlılar, imza kahveler, kahvaltılıklar ve paylaşmalıklar; hepsi çardak sıcaklığında.
          </p>
        </div>
      </section>
      <MenuGrid />
    </>
  );
}
