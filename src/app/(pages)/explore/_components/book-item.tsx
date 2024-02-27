import { BookWithAvgRating, RatingWithAuthor } from '@/@types/types-prisma'
import { RatingStars } from '@/components/common/rating-stars'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { BookOpen, Bookmark } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { UserRatingCard } from './user-rating-card'
import { getBookDetails } from '../_actions/get-book-details'
import { CategoriesOnBooks, Category } from '@prisma/client'
import { RatingForm } from './rating-form'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

type BookDetails = BookWithAvgRating & {
  ratings: RatingWithAuthor[]
  categories: (CategoriesOnBooks & {
    category: Category
  })[]
}

interface BookItemProps {
  currentBook: BookWithAvgRating
}

export const BookItem = ({ currentBook }: BookItemProps) => {
  const [open, setOpen] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const { data: session } = useSession()

  const { data: bookDetails } = useQuery<BookDetails>({
    queryKey: ['book', currentBook.id],
    queryFn: async () => {
      const data = await getBookDetails(currentBook.id)
      const { book } = data

      return book
    },
    enabled: open,
  })

  const categories = bookDetails?.categories
    .map((item) => item.category.name)
    .join(', ')

  const ratings = bookDetails?.ratings.map((rating) => rating.rate)

  const sortedRatingByDate = bookDetails?.ratings.sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  })

  const canRate = bookDetails?.ratings.every(
    (item) => item.user_id !== session?.user.id,
  )

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-full overflow-hidden relative bg-gray-700 py-4 px-5 rounded-lg h-auto flex gap-5">
          {currentBook.alreadyRead && (
            <div className="absolute uppercase rounded-l-sm top-0 text-green-100 font-bold text-xs right-0 px-3 py-1 bg-[#0a313c]">
              <span>Lido</span>
            </div>
          )}
          <Image
            src={currentBook?.cover_url}
            alt={currentBook?.name}
            width={0}
            height={0}
            sizes="100vh"
            className="object-cover w-[108px] h-[152px]"
          />
          <div className="flex flex-col h-full justify-between">
            <div className="flex flex-col">
              <p className="text-base font-bold overflow-hidden text-start text-ellipsis line-clamp-2">
                {currentBook?.name}
              </p>
              <p className="text-sm text-gray-400 text-start overflow-hidden text-ellipsis line-clamp-1">
                {currentBook?.author}
              </p>
            </div>

            <RatingStars rating={currentBook.avgRating} className="mt-auto" />
          </div>
        </button>
      </SheetTrigger>
      {bookDetails && (
        <SheetContent className="bg-gray-800 border-none min-w-[660px] overflow-auto no-scrollbar">
          <SheetHeader>
            <main className="w-full h-[415px] bg-gray-700 px-8 py-6 rounded-[10px] mt-6 flex flex-col">
              <section className="w-full h-[242px] flex gap-8 ">
                <Image
                  src={currentBook?.cover_url}
                  alt={currentBook?.name}
                  width={0}
                  height={0}
                  sizes="100vh"
                  className="object-cover h-full w-[172px]"
                />

                <div className="flex flex-col">
                  <div className="h-full w-full">
                    <SheetTitle asChild>
                      <h2 className="text-lg font-bold">{bookDetails?.name}</h2>
                    </SheetTitle>
                    <h3 className="text-base font-normal">
                      {bookDetails?.author}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1">
                    <RatingStars
                      size={20}
                      rating={currentBook.avgRating}
                      className="mt-auto"
                    />
                    <span className="text-sm text-gray-400">
                      {String(ratings?.length) === '1'
                        ? `${String(ratings?.length)} avaliação`
                        : `${String(ratings?.length)} avaliações`}{' '}
                    </span>
                  </div>
                </div>
              </section>

              <section className="mt-10 border-t border-solid border-gray-600 py-6 flex justify-between">
                <div className="flex w-full items-center gap-2">
                  <Bookmark className="text-green-100" />
                  <div>
                    <span className="text-gray-300 text-sm">Categoria</span>
                    <h3 className="text-base font-bold">{categories}</h3>
                  </div>
                </div>
                <div className="flex w-full items-center gap-2">
                  <BookOpen className="text-green-100" />
                  <div>
                    <span className="text-gray-300 text-sm">Páginas</span>
                    <h3 className="text-base font-bold">
                      {String(currentBook.total_pages)}
                    </h3>
                  </div>
                </div>
              </section>
            </main>
          </SheetHeader>

          <section className="mt-10 ">
            <main className="w-full flex flex-col gap-4">
              <div className="flex w-full justify-between ">
                <span>Avaliações</span>
                {!showForm && canRate && (
                  <Button
                    onClick={() => setShowForm(!showForm)}
                    className="rounded text-purple-100 font-bold hover:bg-purple-100/10"
                  >
                    Avaliar
                  </Button>
                )}
              </div>
              {showForm && (
                <RatingForm
                  bookId={bookDetails?.id}
                  cancelShowForm={() => setShowForm(!showForm)}
                />
              )}
              {sortedRatingByDate?.map((rating) => (
                <UserRatingCard key={rating.id} rating={rating} />
              ))}
            </main>
          </section>
        </SheetContent>
      )}
    </Sheet>
  )
}
