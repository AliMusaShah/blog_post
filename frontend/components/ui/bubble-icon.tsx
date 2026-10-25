import { cn } from "cn"

type BubbleIconProps = {
  src: string
  className?: string
}

function BubbleIcon({ className }: BubbleIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block shrink-0 rounded-full bg-primary/15", className)}
    />
  )
}

export { BubbleIcon }
