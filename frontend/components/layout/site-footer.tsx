function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-1 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p className="font-medium text-foreground">Quill</p>
        <p>A reading room for people who build things.</p>
      </div>
    </footer>
  );
}

export { SiteFooter };
