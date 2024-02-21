'use client'

import { Category } from '@prisma/client'
import { BookItem } from './book-item'
import { BooksFilter } from './books-filter'
import { useEffect, useState } from 'react'
import { findCategoriesBooks } from '@/app/(pages)/explore/_actions/find-categories-books'
import { BookWithAvgRating } from '@/@types/types-prisma'
import { PageTitle } from '@/components/common/page-title'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface ExploreBooksProps {
  books: BookWithAvgRating[]
  categories: Category[]
}

export const ExploreBooks = ({ books, categories }: ExploreBooksProps) => {
  const [isActive, setIsActive] = useState<string | null>(null)
  const [booksWithAvgRating, setBooksWithAvgRating] =
    useState<BookWithAvgRating[]>(books)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function handleCategoriesBooks() {
      const { books } = await findCategoriesBooks(isActive)
      setBooksWithAvgRating(books)
    }

    handleCategoriesBooks()
  }, [isActive])

  const filteredBooks = booksWithAvgRating.filter((book) => {
    return (
      book.name.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase())
    )
  })

  return (
    <div className="w-full flex flex-col justify-start gap-12">
      <div className="grid grid-cols-2">
        <PageTitle title="Explorar" />
        <form className="w-full relative focus-within:border-green-200 focus-within:text-green-200 border border-gray-500 rounded transition-all">
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
      </div>
      <div className="flex flex-col w-full gap-12">
        <div className="flex gap-3 flex-wrap">
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
          {filteredBooks.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  )
}
