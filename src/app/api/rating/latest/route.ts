import { prismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const ratings = await prismaClient.rating.findMany({
    orderBy: {
      created_at: 'desc',
    },
    include: {
      user: true,
      book: true,
    },
    take: 10,
  })

  return NextResponse.json(
    {
      ratings,
    },
    {
      status: 200,
    },
  )
}
