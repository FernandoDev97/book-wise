'use server'

import { options } from '@/app/api/auth/[...nextauth]/options'
import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export const findCategoriesBooks = async (selectedCategory: string | null) => {
  const booksWithCategoryId = await prismaClient.book.findMany({
    where: {
      categories: {
        some: {
          categoryId: selectedCategory || undefined,
        },
      },
    },
    include: {
      ratings: true,
    },
  })

  const books = await prismaClient.book.findMany({
    include: {
      ratings: true,
    },
  })

  const booksAvgRating = await prismaClient.rating.groupBy({
    by: ['book_id'],
    _avg: {
      rate: true,
    },
  })

  let userBooksIds: string[] = []

  const session = await getServerSession(options)

  if (session) {
    const userBooks = await prismaClient.book.findMany({
      where: {
        ratings: {
          some: {
            user_id: String(session.user.id),
          },
        },
      },
    })

    userBooksIds = userBooks.map((book) => book.id)
  }

  const booksWithAvgRating = (booksWithCategoryId || books).map((book) => {
    const bookAvgRating = booksAvgRating.find(
      (avgRating) => avgRating.book_id === book.id,
    )
    const { ratings, ...bookInfo } = book

    return {
      ...bookInfo,
      ratings: ratings.length,
      avgRating: bookAvgRating?._avg.rate,
      alreadyRead: userBooksIds.includes(book.id),
    }
  })

  return {
    books: booksWithAvgRating,
  }
}
