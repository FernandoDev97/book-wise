import * as React from 'react'

import { cn } from '@/lib/utils'

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    maxLength?: number
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, maxLength, ...props }, ref) => {
    const valueLength = String(props.value)?.length ?? 0
    return (
      <div className="flex flex-col relative">
        <textarea
          className={cn(
            'flex min-h-[80px] w-full rounded-md border relative border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
          maxLength={maxLength}
        />
        {maxLength && (
          <span className="text-[#7c7c8a] absolute bottom-2 right-4 text-sm">
            {valueLength}/{maxLength}
          </span>
        )}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
