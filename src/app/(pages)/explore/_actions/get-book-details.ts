'use server'

import { prismaClient } from '@/lib/prisma'

export const getBookDetails = async (bookId: string) => {
  const book = await prismaClient.book.findUnique({
    where: { id: bookId },
    include: {
      categories: {
        include: {
          category: true,
        },
      },
      ratings: {
        include: {
          user: true,
        },
      },
    },
  })

  const booksAvgRating = await prismaClient.rating.groupBy({
    by: ['book_id'],
    where: {
      book_id: bookId,
    },
    _avg: {
      rate: true,
    },
  })

  const bookWithAvgRating = {
    ...book,
    avgRating: booksAvgRating[0]._avg.rate ?? 0,
  }

  return {
    book: bookWithAvgRating,
  }
}
