import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleSkeleton } from "@/components/blog/article-skeleton";
import { users } from "@/data/mock-data";
import { ProfileScreen } from "@/features/users/profile-screen";

export const metadata: Metadata = {
  title: "Profile",
};

export function generateStaticParams() {
  return users.map((user) => ({ id: user.id }));
}

export default function UserPage({ params }: PageProps<"/users/[id]">) {
  return (
    <Suspense fallback={<ArticleSkeleton />}>
      <ProfileLoader params={params} />
    </Suspense>
  );
}

async function ProfileLoader({
  params,
}: {
  params: PageProps<"/users/[id]">["params"];
}) {
  const { id } = await params;
  if (!users.some((user) => user.id === id)) notFound();
  return <ProfileScreen userId={id} />;
}
