// /app/(admin)/layout.js

import AdminLayout from "./_common/layout/adminLayout";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing the application",
};

export default function AdminRootLayout({ children }) {
  return (
    <AdminLayout>{children}</AdminLayout>
  );
}
