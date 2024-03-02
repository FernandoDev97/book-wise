'use server'

import { revalidatePath } from 'next/cache'

interface CreateNewRateData {
  description: string
  rate: number
  bookId: string
  userId: string
}

export const createNewRate = async (formData: CreateNewRateData) => {
  try {
    const response = await fetch(`${process.env.API_URL}/books/rate`, {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    if (data) {
      revalidatePath('/(pages)/(home)', 'page')
      revalidatePath('/(pages)/profile/[id]', 'page')
    }
    return data
  } catch (error) {
    console.error(error)
  }
}
