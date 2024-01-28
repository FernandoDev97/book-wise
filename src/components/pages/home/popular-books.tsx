import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { PopularBookCard } from './popular-book-card'

export const PopularBooks = () => {
  return (
    <section className="flex flex-col gap-2">
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
      {Array.from({ length: 4 }).map((_, i) => (
        <PopularBookCard
          book={{
            author: 'J.R.R. Tolkien',
            cover_url: '/images/Book.png',
            id: 'asjfklasdf',
            name: 'O Hobbit',
            summary:
              'Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh jhjs lorem ipum lorem lorem morem mais menos mais alguma coisa mais coisa so mais um pou1quino inconstituciona',
            total_pages: 100,
            created_at: new Date(),
            avgRating: 1,
          }}
          key={`popular-book-card-${i}`}
        />
      ))}
    </section>
  )
}
