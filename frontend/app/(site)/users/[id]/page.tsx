import { Suspense } from "react";
import type { Metadata } from "next";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { ProfileScreen } from "@/features/users/profile-screen";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function UserPage({ params }: PageProps<"/users/[id]">) {
  const { id } = await params;
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ProfileScreen userId={id} />
    </Suspense>
  );
}
