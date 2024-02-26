'use client'

import { cn } from '@/lib/utils'
import { Star } from '@phosphor-icons/react'
import { useState } from 'react'

interface RatingStarsProps {
  rating: number
  className?: string
  size?: 14 | 16 | 20 | 24
  setRating?: (rating: number) => void
}

export const RatingStars = ({
  rating,
  className,
  size = 14,
  setRating,
}: RatingStarsProps) => {
  const [previewValue, setPreviewValue] = useState(0)
  const isEditable = !!setRating

  const ratingValue = isEditable ? previewValue : rating

  const handleMouseEnter = (value: number) => {
    if (isEditable) {
      setPreviewValue(value)
    }
  }

  const handleMouseLeave = () => {
    if (isEditable) {
      setPreviewValue(rating)
    }
  }

  const handleSetValue = () => {
    if (isEditable) {
      setRating(previewValue)
    }
  }

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          className={cn('text-purple-100 box-content py-0 px-[2px]', className)}
          key={`star-${i}`}
          weight={i + 1 <= ratingValue ? 'fill' : 'regular'}
          size={size}
          onMouseEnter={() => handleMouseEnter(i + 1)}
          onMouseLeave={handleMouseLeave}
          onClick={handleSetValue}
        />
      ))}
    </div>
  )
}
