import Link from "next/link";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { logout } from "@/app/admin/actions";

export const metadata = {
  title: "Notebook Admin",
  robots: { index: false, follow: false },
};

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await verifySession())) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-shell">
      <header className="admin-bar">
        <Link href="/admin" className="admin-brand">
          Notebook <span>Admin</span>
        </Link>
        <nav className="admin-bar-nav">
          <Link href="/admin/articles/new" className="btn">
            New article
          </Link>
          <Link href="/admin/newsletter" className="admin-bar-link">
            Newsletter
          </Link>
          <Link href="/admin/settings" className="admin-bar-link">
            Settings
          </Link>
          <Link href="/notebook" className="admin-bar-link">
            View site
          </Link>
          <form action={logout}>
            <button type="submit" className="admin-bar-link admin-linkbtn">
              Sign out
            </button>
          </form>
        </nav>
      </header>
      <main className="admin-main">{children}</main>
    </div>
  );
}
