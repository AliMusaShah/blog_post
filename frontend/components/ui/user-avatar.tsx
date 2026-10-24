import { cn } from "cn"

type UserAvatarProps = {
  initials: string
  className?: string
}

/** Large profile avatar with the initials centered in a translucent ring. */
function UserAvatar({ initials, className }: UserAvatarProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-41.5 shrink-0 items-center justify-center rounded-full border-[3.773px] border-secondary-container bg-secondary-container/50 text-[55.333px] leading-none font-medium tracking-[0.12em] text-outline shadow-ds-200",
        className
      )}
    >
      {initials}
    </span>
  )
}

export { UserAvatar }
