import { cn } from "cn"

import {
  fieldControlClassName,
  fieldLabelClassName,
} from "@/components/ui/field-styles"

type TextareaFieldProps = React.ComponentProps<"textarea"> & {
  label: string
}

function TextareaField({
  label,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className={fieldLabelClassName}>
        {label}
      </label>
      <textarea
        id={id}
        className={cn(
          fieldControlClassName,
          "h-22.5 resize-none font-secondary placeholder:text-heading/60",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { TextareaField }
