'use server'

import { api } from '@/lib/axios'

export const findCategoriesBooks = async (selectedCategory: string | null) => {
  try {
    const { data } = await api.get(`${process.env.API_URL}/books/categories`, {
      params: {
        category: selectedCategory,
      },
    })

    return data ?? []
  } catch (error) {
    console.log(error)
  }
}
