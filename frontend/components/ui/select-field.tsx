import Image from "next/image"
import { cn } from "cn"

import {
  fieldControlClassName,
  fieldLabelClassName,
} from "@/components/ui/field-styles"

type SelectFieldProps = Omit<React.ComponentProps<"select">, "children"> & {
  label: string
  placeholder: string
  options: { value: string; label: string }[]
}

function SelectField({
  label,
  placeholder,
  options,
  id,
  className,
  ...props
}: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor={id} className={fieldLabelClassName}>
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          defaultValue=""
          className={cn(
            fieldControlClassName,
            "appearance-none pr-12 font-secondary invalid:text-heading/60",
            className
          )}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src="/icons/select-chevron.svg"
          alt=""
          width={24}
          height={24}
          className="pointer-events-none absolute top-1/2 right-3 size-6 -translate-y-1/2"
        />
      </div>
    </div>
  )
}

export { SelectField }
