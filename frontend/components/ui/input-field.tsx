import { cn } from "cn"

import {
  fieldControlClassName,
  fieldLabelClassName,
} from "@/components/ui/field-styles"

type InputFieldProps = React.ComponentProps<"input"> & {
  label: string
  labelClassName?: string
}

function InputField({
  label,
  labelClassName,
  id,
  className,
  ...props
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className={cn(fieldLabelClassName, labelClassName)}>
        {label}
      </label>
      <input
        id={id}
        className={cn(
          fieldControlClassName,
          "placeholder:text-outline/68",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { InputField }
