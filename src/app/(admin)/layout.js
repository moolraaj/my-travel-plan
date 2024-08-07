// /app/(admin)/layout.js

import NextAuthProvide from "@/provider/authProvider";
import AdminLayout from "./_common/layout/adminLayout";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing the application",
};

export default function AdminRootLayout({ children }) {
  return (
    <NextAuthProvide>

      <AdminLayout>{children}</AdminLayout>
    </NextAuthProvide>
  );
}
