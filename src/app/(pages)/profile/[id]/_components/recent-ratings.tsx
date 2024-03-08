'use client'

import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import {
  RatingWithBookAndCategories,
  RecentRatingCard,
} from './recent-rating-card'
import { ProfileDetalis } from './profile-detalis'

interface RecentRatingsProps {
  ratings: RatingWithBookAndCategories[]
  profile: {
    user: {
      id: string
      image: string
      name: string
      member_since: string
    }
    ratings: RatingWithBookAndCategories[]
    readPages: number
    ratedBooks: number
    readAuthors: number
    mostReadCategory?: string
  }
}

export const RecentRatings = ({ ratings, profile }: RecentRatingsProps) => {
  const [search, setSearch] = useState('')

  const filteredRatings = useMemo(() => {
    return ratings.filter((rating) => {
      return (
        rating.book.name.toLowerCase().includes(search.toLowerCase()) ||
        rating.book.author.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [ratings, search])

  return (
    <div className="flex flex-col gap-8 overflow-hidden">
      <form className="hidden lg:block w-full relative focus-within:border-green-200 focus-within:text-green-200 border border-gray-500 rounded transition-all">
        <Input
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          placeholder="Buscar livro ou autor"
          className="bg-transparent px-5 text-gray-400 py-6 outline-none focus:outline-none border-none"
        />
        <Search
          size={20}
          className="absolute text-gray-500 right-5 bottom-3.5"
        />
      </form>

      <div className="block lg:hidden">
        <ProfileDetalis profile={profile} />
      </div>

      {!!filteredRatings.length && (
        <>
          <p className="text-lg font-bold lg:hidden">Ultimas avaliações</p>
          <div className="flex gap-3 md:grid md:grid-cols-2 lg:flex lg:flex-col lg:gap-6 overflow-auto no-scrollbar">
            {filteredRatings.map((rating) => (
              <RecentRatingCard key={rating.id} rating={rating} />
            ))}
          </div>
        </>
      )}

      {!filteredRatings.length && !!ratings.length && (
        <p className="text-gray-400 text-lg text-center">
          Nenhum livro ou author encontado com o nome de &quot;{search}&quot;
        </p>
      )}

      {!ratings.length && (
        <p className="text-center text-lg text-gray-400">
          Você ainda nao avaliou nenhum livro!
        </p>
      )}
    </div>
  )
}
