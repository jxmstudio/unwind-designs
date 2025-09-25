import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-3 py-1.5 text-caption font-medium w-fit whitespace-nowrap shrink-0 gap-1.5 transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-accent-500 text-white shadow-soft hover:bg-accent-600",
        secondary:
          "border-transparent bg-surface-200 text-textPrimary shadow-soft hover:bg-surface-300",
        destructive:
          "border-transparent bg-error-500 text-white shadow-soft hover:bg-error-600",
        outline:
          "border-borderNeutral bg-surface-50 text-textPrimary hover:bg-surface-100 hover:border-accent-500",
        success:
          "border-transparent bg-success-500 text-white shadow-soft hover:bg-success-600",
        warning:
          "border-transparent bg-warning-500 text-white shadow-soft hover:bg-warning-600",
        info:
          "border-transparent bg-blue-500 text-white shadow-soft hover:bg-blue-600",
        premium:
          "border-transparent bg-gradient-to-r from-accent-500 to-accent-600 text-white shadow-glow",
      },
      size: {
        default: "px-3 py-1.5 text-caption",
        sm: "px-2 py-1 text-caption",
        lg: "px-4 py-2 text-body-small",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
