import { Logo } from "@/components/layout/logo";
import { NotFoundView } from "@/components/blog/not-found-view";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="mx-auto flex h-16 w-full max-w-5xl items-center px-4">
        <Logo />
      </header>
      <main id="main" className="flex flex-1 flex-col">
        <NotFoundView />
      </main>
    </div>
  );
}
