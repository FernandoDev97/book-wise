import {
  RatingCard,
  RatingWithAuthorAndBook,
} from '@/components/pages/home/rating-card'
import React from 'react'

interface RecentRatingsProps {
  recentRatings: RatingWithAuthorAndBook[]
}

export const RecentRatings = ({ recentRatings }: RecentRatingsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Avaliações mais recentes</p>

      <section className="flex flex-col gap-3">
        {recentRatings.map((recentRating) => (
          <RatingCard key={recentRating.id} rating={recentRating} />
        ))}
      </section>
    </div>
  )
}
