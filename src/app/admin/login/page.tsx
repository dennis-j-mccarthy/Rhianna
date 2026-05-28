import { redirect } from "next/navigation";
import LoginForm from "@/components/admin/LoginForm";
import { verifySession } from "@/lib/auth";

export const metadata = {
  title: "Admin · Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  if (await verifySession()) {
    redirect("/admin");
  }

  return (
    <main className="admin-auth-shell">
      <div className="admin-auth-card">
        <span className="eyebrow">Notebook</span>
        <h1>Sign in</h1>
        <p className="admin-muted">Enter the admin password to manage articles.</p>
        <LoginForm />
      </div>
    </main>
  );
}
