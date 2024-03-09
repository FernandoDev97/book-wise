'use server'

import { prismaClient } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

interface CreateNewRateData {
  description: string
  rate: number
  bookId: string
  userId: string
}

export const createNewRate = async (formData: CreateNewRateData) => {
  const { description, rate, bookId, userId } = formData

  if (!userId) {
    return {
      error: 'Usuário não autenticado.',
    }
  }

  try {
    const userAlreadyRated = await prismaClient.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    })

    if (userAlreadyRated) {
      return {
        error: 'Você ja avaliou este livro.',
      }
    }

    await prismaClient.rating.create({
      data: {
        book_id: bookId,
        description,
        rate,
        user_id: userId,
      },
    })
    revalidatePath('/(pages)/(home)', 'page')
    revalidatePath('/(pages)/profile/[id]', 'page')

    return {
      message: 'Livro avaliado com sucesso.',
    }
  } catch (error) {
    console.error(error)
  }
}
