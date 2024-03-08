'use server'

import { prismaClient } from '@/lib/prisma'

export async function recentRatings() {
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
  return ratings
}
