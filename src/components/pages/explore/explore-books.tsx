'use client'

import { Category } from '@prisma/client'
import { BookAndRating, BookItem } from './book-item'
import { BooksFilter } from './books-filter'
import { useState } from 'react'

interface ExploreBooksProps {
  books: BookAndRating[]
  categories: Category[]
}

export const ExploreBooks = ({ books, categories }: ExploreBooksProps) => {
  const [isActive, setIsActive] = useState<string | null>(null)
  return (
    <div className="flex flex-col w-full gap-12">
      <div className="flex overflow-auto gap-3 no-scrollbar">
        <BooksFilter
          isActive={isActive === null}
          onClick={() => setIsActive(null)}
          tag="Tudo"
        />
        {categories.map((category) => (
          <BooksFilter
            isActive={isActive === category.id}
            key={category.id}
            category={category}
            onClick={() => setIsActive(category.id)}
          />
        ))}
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 ">
        {books.map((book) => (
          <BookItem key={book.id} book={book} />
        ))}
      </div>
    </div>
  )
}
