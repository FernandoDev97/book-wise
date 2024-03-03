import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const userId = request?.nextUrl?.searchParams.get('userId') as string

  const latestUserRating = await prismaClient.rating.findFirst({
    where: {
      user_id: userId,
    },
    orderBy: {
      created_at: 'desc',
    },
    include: {
      book: true,
    },
  })

  return NextResponse.json(
    {
      rating: latestUserRating,
    },
    {
      status: 200,
    },
  )
}
