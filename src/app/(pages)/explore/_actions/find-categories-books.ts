'use server'

export const findCategoriesBooks = async (selectedCategory: string | null) => {
  const params = new URLSearchParams({
    category: selectedCategory ?? '',
  })

  try {
    const response = await fetch(
      `${process.env.API_URL}/books/categories?${params}`,
      {
        method: 'GET',
      },
    )

    const data = response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
