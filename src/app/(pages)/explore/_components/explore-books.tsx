'use client'

import { Category } from '@prisma/client'
import { BookItem } from './book-item'
import { BooksFilter } from './books-filter'
import { useEffect, useMemo, useState } from 'react'
import { findCategoriesBooks } from '@/app/(pages)/explore/_actions/find-categories-books'
import { BookWithAvgRating } from '@/@types/types-prisma'
import { PageTitle } from '@/components/common/page-title'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'

interface ExploreBooksProps {
  books: BookWithAvgRating[]
  categories: Category[]
  bookId?: string
}

export const ExploreBooks = ({
  books,
  categories,
  bookId,
}: ExploreBooksProps) => {
  const [isActive, setIsActive] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [booksWithAvgRating, setBooksWithAvgRating] =
    useState<BookWithAvgRating[]>(books)

  const { data: booksFiltered } = useQuery<BookWithAvgRating[]>({
    queryKey: ['books', isActive],
    queryFn: async () => {
      const data = await findCategoriesBooks(isActive)
      const { books } = data
      return books
    },
  })

  useEffect(() => {
    function handleBooksFiltered() {
      if (booksFiltered) {
        setBooksWithAvgRating(booksFiltered)
      }
    }

    handleBooksFiltered()
  }, [booksFiltered])

  const filteredBooks = useMemo(() => {
    return booksWithAvgRating.filter((book) => {
      return (
        book.name.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
      )
    })
  }, [booksWithAvgRating, search])

  return (
    <div className="w-full flex flex-col justify-start gap-9 lg:gap-12 h-full overflow-hidden pb-5">
      <div className="flex flex-col gap-10 md:gap-0 md:grid md:grid-cols-2">
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
      <div className="flex flex-col w-full gap-8 lg:gap-12 h-full overflow-hidden">
        <div className="flex gap-3 py-6 overflow-x-scroll overflow-y-hidden no-scrollbar lg:hidden">
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
        <div className="hidden lg:flex flex-wrap gap-3 ">
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
        {!filteredBooks.length && (
          <p className="text-gray-400 text-lg text-center">
            Nenhum livro ou author encontado com o nome de &quot;{search}&quot;
          </p>
        )}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-auto no-scrollbar ">
          {filteredBooks?.map((book) => (
            <BookItem bookId={bookId} key={book.id} currentBook={book} />
          ))}
        </div>
      </div>
    </div>
  )
}
