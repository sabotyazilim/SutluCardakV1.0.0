import Image from "next/image";
import Link from "next/link";
import { Coffee, Menu as MenuIcon } from "lucide-react";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/menu", label: "Menü" },
  { href: "/about", label: "Hakkımızda" },
  { href: "/contact", label: "İletişim" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#d9eadf] bg-[#f7fbf6]/92 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.png" alt="Sütlü Çardak logosu" width={46} height={46} className="rounded-full" priority />
          <div>
            <p className="text-lg font-bold tracking-wide text-[#20382f]">Sütlü Çardak</p>
            <p className="hidden text-xs text-[#5f756b] sm:block">Tatlı, kahve, sakinlik</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-[#375649] transition hover:bg-[#e7f3ea] hover:text-[#183128]"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/admin"
            className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#20382f] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#315c4c]"
          >
            <Coffee size={16} />
            Admin
          </Link>
        </nav>

        <details className="relative md:hidden">
          <summary className="flex cursor-pointer list-none items-center rounded-full border border-[#c9dfd0] p-2 text-[#20382f]">
            <MenuIcon size={22} />
            <span className="sr-only">Menüyü aç</span>
          </summary>
          <div className="absolute right-0 mt-3 w-52 rounded-lg border border-[#d9eadf] bg-white p-2 shadow-xl">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-[#eef7f0]">
                {item.label}
              </Link>
            ))}
            <Link href="/admin" className="mt-1 block rounded-md bg-[#20382f] px-3 py-2 text-sm font-semibold text-white">
              Admin
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
