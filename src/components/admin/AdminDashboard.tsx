"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut } from "lucide-react";
import { MenuEditor } from "@/components/admin/MenuEditor";

export function AdminDashboard() {
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <section className="bg-[#f7fbf6] py-10">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col justify-between gap-4 rounded-lg bg-[#20382f] p-6 text-white sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#cfe5d6]">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-black">Menü yönetimi</h1>
          </div>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-bold text-[#20382f] transition hover:bg-[#e8f4ec]"
          >
            <LogOut size={18} />
            Çıkış Yap
          </button>
        </div>
        <MenuEditor />
      </motion.div>
    </section>
  );
}
