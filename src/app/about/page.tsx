import { Coffee, Heart, Leaf } from "lucide-react";

const values = [
  { icon: Leaf, title: "Taze ve hafif", text: "Günlük hazırlık, sade reçeteler ve dengeli porsiyonlar." },
  { icon: Coffee, title: "Kahvede özen", text: "Her fincan için doğru öğütüm, temiz demleme ve tutarlı lezzet." },
  { icon: Heart, title: "Sıcak atmosfer", text: "Kalabalıktan uzak, sohbeti ve sakinliği çoğaltan bir çardak hissi." },
];

export const metadata = {
  title: "Hakkımızda | Sütlü Çardak",
  description: "Sütlü Çardak konsepti, çalışma saatleri ve kafe atmosferi.",
};

export default function AboutPage() {
  return (
    <section className="bg-[#f7fbf6] py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9f2747]">Hakkımızda</p>
          <h1 className="mt-4 text-4xl font-black text-[#20382f] sm:text-6xl">Sütlü tatlı kadar hafif, çardak kadar samimi.</h1>
          <p className="mt-6 text-lg leading-8 text-[#5f756b]">
            Sütlü Çardak; günlük sütlü tatlıları, kaliteli kahveleri ve sakin oturma düzeniyle şehrin içinde kısa ama iyi hissettiren
            molalar sunmak için tasarlandı. Menümüzde tanıdık lezzetleri modern sunumlarla birleştiriyor, her gün taze ve dengeli bir
            deneyim hazırlıyoruz.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="rounded-lg border border-[#d9eadf] bg-white p-5">
                  <Icon className="text-[#4f8b6b]" />
                  <h2 className="mt-4 font-bold">{value.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-[#5f756b]">{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>
        <aside className="rounded-lg bg-[#20382f] p-6 text-white">
          <h2 className="text-2xl font-black">Çalışma saatleri</h2>
          <div className="mt-6 space-y-4 text-[#dcebe1]">
            <div className="flex justify-between border-b border-white/12 pb-3">
              <span>Pazartesi - Cuma</span>
              <strong>08:30 - 22:30</strong>
            </div>
            <div className="flex justify-between border-b border-white/12 pb-3">
              <span>Cumartesi</span>
              <strong>09:00 - 23:30</strong>
            </div>
            <div className="flex justify-between">
              <span>Pazar</span>
              <strong>09:00 - 22:00</strong>
            </div>
          </div>
          <p className="mt-8 rounded-lg bg-white/10 p-4 text-sm leading-6">
            Tatlılarımız gün içinde küçük partiler halinde hazırlanır. Favori ürünler için erken saatlerde uğramanızı öneririz.
          </p>
        </aside>
      </div>
    </section>
  );
}
