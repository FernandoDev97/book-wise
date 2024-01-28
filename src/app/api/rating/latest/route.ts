import { prismaClient } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
  const teste = {
    test: 'TESTE',
  }

  const users = await prismaClient.user.findMany()
  return NextResponse.json(
    {
      message: 'Please enter title',
    },
    {
      status: 400,
    },
  )
}
