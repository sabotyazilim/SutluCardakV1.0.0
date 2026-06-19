import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#d9eadf] bg-[#20382f] text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="Sütlü Çardak logosu" width={48} height={48} className="rounded-full bg-white" />
            <div>
              <p className="text-lg font-bold">Sütlü Çardak</p>
              <p className="text-sm text-[#cfe5d6]">Sıcak çardak atmosferi, günlük tatlılar.</p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#dcebe1]">
            Kahvenin kokusu, sütlü tatlıların hafifliği ve sakin bir mola için tasarlanmış modern kafe deneyimi.
          </p>
        </div>
        <div>
          <p className="font-semibold">Ziyaret</p>
          <p className="mt-3 text-sm leading-6 text-[#dcebe1]">
            Çardak Sokak No: 12<br />
            Moda, Kadıköy / İstanbul
          </p>
        </div>
        <div>
          <p className="font-semibold">Bağlantılar</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-[#dcebe1]">
            <Link href="/menu" className="hover:text-white">Menü</Link>
            <Link href="/about" className="hover:text-white">Hakkımızda</Link>
            <Link href="/contact" className="hover:text-white">İletişim</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
