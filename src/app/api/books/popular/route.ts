/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
  const books = await prismaClient.book.findMany({
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    include: {
      ratings: true,
    },
    take: 4,
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

  return NextResponse.json(
    {
      booksWithAvgRating,
    },
    {
      status: 200,
    },
  )
}
