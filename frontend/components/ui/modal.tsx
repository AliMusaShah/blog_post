"use client"

import { useRef } from "react"
import Image from "next/image"
import { Dialog } from "@base-ui/react/dialog"
import { cn } from "cn"

import { BubbleIcon } from "@/components/ui/bubble-icon"

type ModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  /** Screen-reader-only description of the dialog. */
  description?: string
  /** Replaces the default close button in the header (right side). */
  headerAction?: React.ReactNode
  titleClassName?: string
  headerClassName?: string
  children: React.ReactNode
}

function Modal({
  open,
  onOpenChange,
  title,
  description,
  headerAction,
  titleClassName,
  headerClassName,
  children,
}: ModalProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          ref={popupRef}
          initialFocus={popupRef}
          className="fixed top-1/2 left-1/2 z-50 max-h-[calc(100svh-2rem)] w-[calc(100%-2rem)] max-w-260 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl border border-modal-border bg-white px-2.5 py-2 shadow-card outline-none transition-[opacity,scale] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0">
          <div className="flex flex-col gap-4.5 rounded-xl bg-modal-surface pb-4.5 pl-1.5">
            <span aria-hidden="true" className="relative block h-1 w-full">
              <Image
                src="/icons/modal-top-line.svg"
                alt=""
                fill
                sizes="(min-width: 1040px) 1040px, 100vw"
              />
            </span>
            <div className="flex flex-col gap-8">
              <div
                className={cn(
                  "flex flex-wrap items-center justify-between gap-3",
                  headerClassName
                )}
              >
                <div className="flex min-w-0 items-center gap-2">
                  <BubbleIcon src="/icons/modal-bubble.svg" className="size-6" />
                  <Dialog.Title
                    className={cn(
                      "text-lg leading-none font-medium text-brand uppercase sm:text-xl",
                      titleClassName
                    )}
                  >
                    {title}
                  </Dialog.Title>
                </div>
                {headerAction ?? (
                  <Dialog.Close
                    aria-label="Close"
                    className="flex size-6 shrink-0 items-center justify-center rounded-md outline-none focus-visible:ring-3 focus-visible:ring-brand/40"
                  >
                    <Image
                      src="/icons/close.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="size-6"
                    />
                  </Dialog.Close>
                )}
              </div>
              {description ? (
                <Dialog.Description className="sr-only">
                  {description}
                </Dialog.Description>
              ) : null}
              {children}
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export { Modal }
