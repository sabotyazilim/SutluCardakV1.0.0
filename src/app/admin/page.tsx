import { cookies } from "next/headers";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ADMIN_COOKIE_NAME, isValidAdminSession } from "@/lib/admin-auth";

export const metadata = {
  title: "Admin | Sütlü Çardak",
  description: "Sütlü Çardak menü yönetimi.",
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = isValidAdminSession(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  return isAuthed ? <AdminDashboard /> : <AdminLogin />;
}
