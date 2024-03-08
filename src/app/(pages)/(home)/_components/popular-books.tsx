import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { PopularBookCard } from './popular-book-card'

interface PopularBooksProps {
  books: {
    avgRating: number | null | undefined
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: Date
  }[]
}

export const PopularBooks = ({ books }: PopularBooksProps) => {
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
      <div className="flex gap-3 overflow-auto no-scrollbar lg:flex-col lg:gap-1">
        {books.map((popularBook) => (
          <PopularBookCard
            key={`popular-book-card-${popularBook.id}`}
            book={popularBook}
          />
        ))}
      </div>
    </section>
  )
}
