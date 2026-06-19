"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(17, 42, 33, 0.82), rgba(17, 42, 33, 0.38)), url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1800&q=85')",
      }}
    >
      <div className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="max-w-3xl text-white"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/14 px-4 py-2 text-sm backdrop-blur">
            <Sparkles size={16} />
            Günlük sütlü tatlılar ve nitelikli kahveler
          </div>
          <h1 className="text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">Sütlü Çardak</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#eef8f0] sm:text-xl">
            Şehrin içinde sakin bir çardak molası. Fırın sütlaçtan imza latteye, her tabakta hafiflik ve her fincanda özen var.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-[#20382f] transition hover:bg-[#e8f4ec]"
            >
              Menüyü İncele
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/45 px-6 py-3 font-bold text-white transition hover:bg-white/12"
            >
              Yol Tarifi Al
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
