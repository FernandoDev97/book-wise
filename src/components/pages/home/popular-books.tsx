import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { BookWithAvgRating, PopularBookCard } from './popular-book-card'

interface PopularBooksProps {
  popularBooks: BookWithAvgRating[]
}

export const PopularBooks = ({ popularBooks }: PopularBooksProps) => {
  return (
    <section className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-100">Livros populares</span>
        <Link
          href="/explore"
          className="flex hover:bg-[#8381D90F] py-2 px-3 transition-all rounded items-center text-sm font-bold text-purple-100"
        >
          Ver todos
          <ChevronRight size={16} />
        </Link>
      </div>
      {popularBooks.map((popularBook) => (
        <PopularBookCard
          key={`popular-book-card-${popularBook.id}`}
          book={popularBook}
        />
      ))}
    </section>
  )
}
