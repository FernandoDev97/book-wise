import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prismaClient } from '@/lib/prisma'

const bodySchema = z.object({
  bookId: z.string(),
  description: z.string().max(450),
  rate: z.number().min(1).max(5),
  userId: z.string(),
})

type RateReviewBodyType = z.infer<typeof bodySchema>

export const POST = async (request: NextRequest) => {
  const body: RateReviewBodyType = await request.json()
  const { description, rate, bookId, userId } = bodySchema.parse(body)

  if (!userId) {
    return NextResponse.json(
      {
        error: 'Usuário não autenticado.',
      },
      {
        status: 401,
      },
    )
  }

  try {
    const userAlreadyRated = await prismaClient.rating.findFirst({
      where: {
        user_id: userId,
        book_id: bookId,
      },
    })

    if (userAlreadyRated) {
      return NextResponse.json(
        {
          error: 'Você ja avaliou este livro.',
        },
        {
          status: 400,
        },
      )
    }

    await prismaClient.rating.create({
      data: {
        book_id: bookId,
        description,
        rate,
        user_id: userId,
      },
    })

    return NextResponse.json(
      {
        message: 'Avaliação criada com sucesso.',
      },
      {
        status: 201,
      },
    )
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      {
        error: 'Bad Request',
      },
      {
        status: 400,
      },
    )
  }
}
