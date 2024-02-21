import { BookWithAvgRating } from '@/@types/types-prisma'
import { RatingStars } from '@/components/common/rating-stars'
import Image from 'next/image'
import React from 'react'

interface BookItemProps {
  book: BookWithAvgRating
}

export const BookItem = ({ book }: BookItemProps) => {
  return (
    <div className="w-full overflow-hidden relative bg-gray-700 py-4 px-5 rounded-lg h-auto flex gap-5">
      {book.alreadyRead && (
        <div className="absolute uppercase rounded-l-sm bottom-0 text-green-100 font-bold text-xs right-0 px-3 py-1 bg-[#0a313c]">
          <span>Lido</span>
        </div>
      )}
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

        <RatingStars rating={book.avgRating} className="mt-auto" />
      </div>
    </div>
  )
}
