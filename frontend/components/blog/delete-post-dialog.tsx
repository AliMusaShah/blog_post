"use client";

import { useRef } from "react";
import { Dialog } from "@base-ui/react/dialog";

import { ApiAlert } from "@/components/blog/api-alert";

type DeletePostDialogProps = {
  open: boolean;
  title?: string;
  description?: string;
  confirmLabel?: string;
  pending?: boolean;
  messages?: string[];
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const actionClassName =
  "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium focus-visible:outline-none focus-visible:ring-3 disabled:pointer-events-none disabled:opacity-50";

function DeletePostDialog({
  open,
  title = "Delete this post?",
  description = "Its comments will be deleted too.",
  confirmLabel = "Delete",
  pending = false,
  messages = [],
  onOpenChange,
  onConfirm,
}: DeletePostDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(next) => {
        if (pending) return;
        onOpenChange(next);
      }}
    >
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-stone-950/40" />
        <Dialog.Popup
          initialFocus={cancelRef}
          className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-popover p-6 text-popover-foreground shadow-xl outline-none"
        >
          <Dialog.Title className="font-serif text-2xl tracking-tight">
            {title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm leading-6 text-muted-foreground">
            {description}
          </Dialog.Description>
          {messages.length > 0 ? (
            <div className="mt-4">
              <ApiAlert messages={messages} />
            </div>
          ) : null}
          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <Dialog.Close
              ref={cancelRef}
              disabled={pending}
              className={`${actionClassName} border border-border bg-card text-foreground hover:bg-muted focus-visible:ring-primary/40`}
            >
              Cancel
            </Dialog.Close>
            <button
              type="button"
              disabled={pending}
              className={`${actionClassName} bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-700/40`}
              onClick={onConfirm}
            >
              {pending ? "Deleting…" : confirmLabel}
            </button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export { DeletePostDialog };
