'use server'

export const getBookDetails = async (bookId: string) => {
  const params = new URLSearchParams({
    bookId,
  })

  try {
    const response = await fetch(
      `${process.env.API_URL}/books/details?${params}`,
      {
        method: 'GET',
      },
    )

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
