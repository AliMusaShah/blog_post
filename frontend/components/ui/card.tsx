import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"

const cardVariants = cva(
  "flex rounded-card border bg-card p-4 text-card-foreground",
  {
    variants: {
      variant: {
        stat: "border-outline/18 shadow-ds-100",
        panel: "flex-col gap-5 border-outline/18 shadow-panel",
        note: "flex-col justify-between border-outline/16 shadow-ds-100",
        row: "min-h-26.75 flex-col justify-center gap-3 border-outline/16 shadow-ds-100 xl:flex-row xl:items-center xl:justify-between",
        section: "flex-col gap-6 border-modal-border",
        chart:
          "flex-col items-center justify-between gap-6 rounded-[15px] border-[1.078px] border-grey-5 px-4.5 pt-5 pb-5.75",
      },
    },
    defaultVariants: {
      variant: "stat",
    },
  }
)

function Card({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div
      data-slot="card"
      className={cn(cardVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Card, cardVariants }
