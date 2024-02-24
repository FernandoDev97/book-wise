'use client'

import { BookWithAvgRating } from '@/@types/types-prisma'
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

interface BookItemProps {
  book: BookWithAvgRating
}

export const BookItem = ({ book }: BookItemProps) => {
  const [open, setOpen] = useState(false)

  if (open) {
    console.log(book.id)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="w-full overflow-hidden relative bg-gray-700 py-4 px-5 rounded-lg h-auto flex gap-5">
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
              <p className="text-base font-bold overflow-hidden text-start text-ellipsis line-clamp-2">
                {book?.name}
              </p>
              <p className="text-sm text-gray-400 text-start overflow-hidden text-ellipsis line-clamp-1">
                {book?.author}
              </p>
            </div>

            <RatingStars rating={book.avgRating} className="mt-auto" />
          </div>
        </button>
      </SheetTrigger>
      <SheetContent className="bg-gray-800 border-none min-w-[660px] overflow-auto no-scrollbar">
        <SheetHeader>
          <main className="w-full h-[415px] bg-gray-700 px-8 py-6 rounded-[10px] mt-6 flex flex-col">
            <section className="w-full h-[242px] flex gap-8 ">
              <Image
                src={book?.cover_url}
                alt={book?.name}
                width={0}
                height={0}
                sizes="100vh"
                className="object-cover h-full w-[172px]"
              />

              <div className="flex flex-col">
                <div className="h-full w-full">
                  <SheetTitle asChild>
                    <h2 className="text-lg font-bold">{book.name}</h2>
                  </SheetTitle>
                  <h3 className="text-base font-normal">{book.author}</h3>
                </div>
                <div className="flex flex-col gap-1">
                  <RatingStars
                    size={20}
                    rating={book.avgRating}
                    className="mt-auto"
                  />
                  <span className="text-sm text-gray-400">
                    {String(book.ratings) === '1'
                      ? `${String(book.ratings)} avaliação`
                      : `${String(book.ratings)} avaliações`}{' '}
                  </span>
                </div>
              </div>
            </section>

            <section className="mt-10 border-t border-solid border-gray-600 py-6 flex justify-between">
              <div className="flex w-full items-center gap-2">
                <Bookmark className="text-green-100" />
                <div>
                  <span className="text-gray-300 text-sm">Categoria</span>
                  <h3 className="text-base font-bold">Aqui</h3>
                </div>
              </div>
              <div className="flex w-full items-center gap-2">
                <BookOpen className="text-green-100" />
                <div>
                  <span className="text-gray-300 text-sm">Páginas</span>
                  <h3 className="text-base font-bold">
                    {String(book.total_pages)}
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
              <Button className="rounded text-purple-100 font-bold hover:bg-purple-100/10">
                Avaliar
              </Button>
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <UserRatingCard
                key={i}
                rating={{
                  rate: 2,
                  description:
                    'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati',

                  user: {
                    name: 'Fernando Souza',
                    image: 'https://github/FernandoDev97.png',
                  },
                  created_at: new Date(),
                }}
              />
            ))}
          </main>
        </section>
      </SheetContent>
    </Sheet>
  )
}
