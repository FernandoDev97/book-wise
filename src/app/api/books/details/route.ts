import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const bookId = request?.nextUrl?.searchParams.get('bookId') as string

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

  return NextResponse.json(
    {
      book: bookWithAvgRating,
    },
    {
      status: 200,
    },
  )
}
