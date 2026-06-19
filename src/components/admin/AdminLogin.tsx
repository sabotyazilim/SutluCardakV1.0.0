"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = (await response.json().catch(() => null)) as { message?: string } | null;

    setLoading(false);
    if (!response.ok) {
      setError(data?.message ?? "Giriş yapılamadı.");
      return;
    }

    router.refresh();
  }

  return (
    <section className="bg-[#f7fbf6] py-16">
      <div className="mx-auto max-w-md px-4">
        <form onSubmit={onSubmit} className="rounded-lg border border-[#d9eadf] bg-white p-6 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eef7f0] text-[#315c4c]">
            <Lock />
          </div>
          <h1 className="mt-5 text-3xl font-black text-[#20382f]">Admin girişi</h1>
          <p className="mt-2 leading-6 text-[#5f756b]">Menü fiyatlarını, içerikleri ve kategorileri düzenlemek için giriş yapın.</p>
          <label className="mt-6 block text-sm font-bold text-[#20382f]" htmlFor="password">
            Admin şifresi
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="focus-ring mt-2 w-full rounded-md border border-[#c9dfd0] px-4 py-3"
            placeholder="Şifrenizi girin"
            required
          />
          {error && <p className="mt-3 rounded-md bg-[#fff1f4] px-3 py-2 text-sm font-semibold text-[#9f2747]">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-full bg-[#20382f] px-5 py-3 font-bold text-white transition hover:bg-[#315c4c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Kontrol ediliyor..." : "Giriş Yap"}
          </button>
        </form>
      </div>
    </section>
  );
}
