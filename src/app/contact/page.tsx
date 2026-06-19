import { MapPin, Phone } from "lucide-react";

const address = "Yusufpaşa, 36000 Kars Merkez/Kars";
const phone = "0474 223 53 32";
const mapQuery = encodeURIComponent(address);

export const metadata = {
  title: "İletişim | Sütlü Çardak",
  description: "Sütlü Çardak adres, telefon, harita ve iletişim formu.",
};

export default function ContactPage() {
  return (
    <section className="bg-[#f7fbf6] py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#9f2747]">İletişim</p>
        <h1 className="mt-4 text-4xl font-black text-[#20382f] sm:text-6xl">Çardakta yeriniz hazır.</h1>
        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="flex flex-col gap-4">
            <Info icon={MapPin} title="Adres" text={address} />
            <Info icon={Phone} title="Telefon" text={phone} />
            <form className="mt-auto rounded-lg border border-[#d9eadf] bg-white p-5">
              <h2 className="text-xl font-black">Bize yazın</h2>
              <div className="mt-4 grid gap-3">
                <input className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3" placeholder="Adınız" required />
                <input className="focus-ring rounded-md border border-[#c9dfd0] px-4 py-3" placeholder="Telefon numaranız" type="tel" required />
                <textarea className="focus-ring min-h-36 rounded-md border border-[#c9dfd0] px-4 py-3" placeholder="Mesajınız" required />
                <button type="submit" className="rounded-full bg-[#20382f] px-5 py-3 font-bold text-white transition hover:bg-[#315c4c]">
                  Mesajı Gönder
                </button>
              </div>
            </form>
          </div>
          <div className="min-h-[480px] overflow-hidden rounded-lg border border-[#d9eadf] bg-white shadow-sm lg:min-h-full">
            <iframe
              title="Sütlü Çardak harita"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-full min-h-[480px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Info({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof MapPin;
  title: string;
  text: string;
}) {
  return (
    <article className="flex gap-4 rounded-lg border border-[#d9eadf] bg-white p-5">
      <Icon className="mt-1 text-[#4f8b6b]" />
      <div>
        <h2 className="font-black">{title}</h2>
        <p className="mt-1 text-[#5f756b]">{text}</p>
      </div>
    </article>
  );
}
