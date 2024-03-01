import { prismaClient } from '@/lib/prisma'
import { getMostFrequentString } from '@/utils/get-most-frequent-string'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const userId = request?.nextUrl?.searchParams.get('userId') as string

  const profile = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      ratings: {
        include: {
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      },
    },
  })

  const readPages = profile?.ratings.reduce(
    (acc, rating) => acc + rating.book.total_pages,
    0,
  )
  const ratedBooks = profile?.ratings.length
  const readAuthors = profile?.ratings.reduce((acc, rating) => {
    if (!acc.includes(rating.book.author)) {
      acc.push(rating.book.author)
    }
    return acc
  }, [] as string[])

  const categories = profile?.ratings?.flatMap((rating) =>
    rating?.book?.categories?.flatMap((category) => category?.category?.name),
  )

  const mostReadCategory = categories?.length
    ? getMostFrequentString(categories)
    : null

  const profileData = {
    user: {
      id: profile?.id,
      image: profile?.image,
      name: profile?.name,
      member_since: profile?.created_at,
    },
    ratings: profile?.ratings,
    readPages,
    ratedBooks,
    readAuthors: readAuthors?.length,
    mostReadCategory,
  }

  return NextResponse.json(
    {
      profile: profileData,
    },
    {
      status: 200,
    },
  )
}
