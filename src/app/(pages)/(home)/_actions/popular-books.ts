/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { prismaClient } from '@/lib/prisma'

export async function popularBooks(params?: string) {
  try {
    const take = Number(params)
    const books = await prismaClient.book.findMany({
      orderBy: {
        ratings: {
          _count: 'desc',
        },
      },
      include: {
        ratings: true,
      },
      take: take || 4,
    })

    const booksAvgRating = await prismaClient.rating.groupBy({
      by: ['book_id'],
      where: {
        book_id: {
          in: books.map((book) => book.id),
        },
      },
      _avg: {
        rate: true,
      },
    })

    const booksWithAvgRating = books.map((book) => {
      const bookAvgRating = booksAvgRating.find(
        (avgRating) => avgRating.book_id === book.id,
      )
      const { ratings, ...bookInfos } = book
      return {
        ...bookInfos,
        avgRating: bookAvgRating?._avg.rate,
      }
    })

    return {
      books: booksWithAvgRating,
    }
  } catch (error) {
    console.error(error)
  }
}
