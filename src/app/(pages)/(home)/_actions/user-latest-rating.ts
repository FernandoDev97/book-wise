'use server'

import { prismaClient } from '@/lib/prisma'

export const getUserLatestRating = async (userId: string) => {
  try {
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

    return latestUserRating
  } catch (error) {
    console.error(error)
  }
}
