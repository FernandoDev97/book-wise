import { RatingCard } from '@/app/(pages)/(home)/_components/rating-card'
import React from 'react'
import { recentRatings as recentRatingsMany } from '../_actions/recent-ratings'

export const RecentRatings = async () => {
  const recentRatings = await recentRatingsMany()

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Avaliações mais recentes</p>

      <section className="flex overflow-auto no-scrollbar lg:flex-col gap-3">
        {recentRatings?.map((recentRating) => (
          <RatingCard key={recentRating.id} rating={recentRating} />
        ))}
      </section>
    </div>
  )
}
