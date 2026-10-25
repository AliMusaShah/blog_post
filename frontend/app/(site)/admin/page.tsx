import type { Metadata } from "next";

import { AdminScreen } from "@/features/admin/admin-screen";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return <AdminScreen />;
}
