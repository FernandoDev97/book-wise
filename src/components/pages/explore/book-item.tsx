import { RatingStars } from '@/components/common/rating-stars'
import { Book, Rating } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

export interface BookAndRating extends Book {
  ratings: Rating
}

interface BookItemProps {
  book: BookAndRating
}

export const BookItem = ({ book }: BookItemProps) => {
  return (
    <div className="w-full bg-gray-700 py-4 px-5 rounded-lg h-auto flex gap-5">
      <Image
        src={book?.cover_url}
        alt={book?.name}
        width={108}
        height={152}
        sizes="100vh"
        className="object-cover"
      />
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col">
          <p className="text-base font-bold overflow-hidden text-ellipsis line-clamp-2">
            {book?.name}
          </p>
          <p className="text-sm text-gray-400 overflow-hidden text-ellipsis line-clamp-1">
            {book?.author}
          </p>
        </div>

        <RatingStars rating={book.ratings.rate} className="mt-auto" />
      </div>
    </div>
  )
}
