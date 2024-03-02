import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'
import {
  RatingWithBookAndCategories,
  RecentRatingCard,
} from './recent-rating-card'

interface RecentRatingsProps {
  ratings: RatingWithBookAndCategories[]
}

export const RecentRatings = ({ ratings }: RecentRatingsProps) => {
  return (
    <div className="flex flex-col gap-8 overflow-hidden">
      <form className="w-full relative focus-within:border-green-200 focus-within:text-green-200 border border-gray-500 rounded transition-all">
        <Input
          placeholder="Buscar livro ou autor"
          className="bg-transparent px-5 text-gray-400 py-6 outline-none focus:outline-none border-none"
        />
        <Search
          size={20}
          className="absolute text-gray-500 right-5 bottom-3.5"
        />
      </form>

      {ratings.length ? (
        <div className="flex flex-col gap-6 overflow-auto no-scrollbar">
          {ratings.map((rating) => (
            <RecentRatingCard key={rating.id} rating={rating} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-400">
          Você ainda nao avaliou nenhum livro!
        </p>
      )}
    </div>
  )
}
