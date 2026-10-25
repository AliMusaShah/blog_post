import { Avatar } from "@/components/blog/avatar";
import { PostCard } from "@/components/blog/post-card";
import { RoleBadge } from "@/components/blog/role-badge";
import { getUser, postsByAuthor } from "@/data/mock-data";
import { formatDate } from "@/lib/format";

function ProfileScreen({ userId }: { userId: string }) {
  const user = getUser(userId);
  if (!user) return null;

  const written = postsByAuthor(user.id);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <header className="flex flex-col items-start gap-5 border-b border-border pb-8 sm:flex-row sm:items-center">
        <Avatar
          name={user.name}
          className="size-24 text-2xl"
        />
        <div className="min-w-0">
          <h1 className="font-serif text-4xl tracking-tight text-foreground">
            {user.name}
          </h1>
          <p className="mt-1 text-muted-foreground">{user.email}</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <RoleBadge role={user.role} />
            <p className="text-sm text-muted-foreground">
              Joined <time dateTime={user.createdAt}>{formatDate(user.createdAt)}</time>
            </p>
          </div>
        </div>
      </header>
      <section className="mt-8" aria-labelledby="profile-posts">
        <h2 id="profile-posts" className="font-serif text-2xl tracking-tight">
          Posts
        </h2>
        {written.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="mt-4 space-y-4">
            {written.map((post) => (
              <li key={post.id}>
                <PostCard post={post} />
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export { ProfileScreen };
