/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { options } from '../../auth/[...nextauth]/options'

export const GET = async (request: NextRequest) => {
  const categoryId = request?.nextUrl?.searchParams.get('category')

  const booksWithCategoryId = await prismaClient.book.findMany({
    where: {
      categories: {
        some: {
          categoryId: categoryId || undefined,
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

  return NextResponse.json({ books: booksWithAvgRating })
}
