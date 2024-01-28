'use client'

import { cn } from '@/lib/utils'
import { Star } from '@phosphor-icons/react'

interface RatingStarsProps {
  rating: number
  className?: string
  size?: 14 | 16 | 20 | 24
}

export const RatingStars = ({
  rating,
  className,
  size = 14,
}: RatingStarsProps) => {
  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          className={cn('text-purple-100 box-content py-0 px-[2px]', className)}
          key={`star-${i}`}
          weight={i + 1 <= rating ? 'fill' : 'regular'}
          size={size}
        />
      ))}
    </div>
  )
}
