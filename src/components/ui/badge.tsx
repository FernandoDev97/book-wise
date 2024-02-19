import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariantDefault = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border border-purple-100 text-purple-100 px-4 py-1 text-base hover:text-gray-100 cursor-pointer hover:bg-purple-100',
        active: '',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

const badgeVariantActive = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: '',
        active:
          'border border-purple-200 text-gray-100 px-4 py-1 bg-purple-200 text-base cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'active',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariantDefault> {
  active?: boolean
}

function Badge({ className, variant, active, ...props }: BadgeProps) {
  return (
    <div
      className={
        active
          ? cn(badgeVariantActive({ variant }), className)
          : cn(badgeVariantDefault({ variant }), className)
      }
      {...props}
    />
  )
}

export { Badge, badgeVariantDefault, badgeVariantActive }
