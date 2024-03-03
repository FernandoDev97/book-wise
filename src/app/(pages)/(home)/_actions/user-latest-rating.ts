'use server'

export const getUserLatestRating = async (userId: string) => {
  const params = new URLSearchParams({
    userId,
  })

  try {
    if (params) {
      const response = await fetch(
        `${process.env.API_URL}/rating/user-latest?${params}`,
        {
          method: 'GET',
        },
      )

      const data = await response.json()
      return data
    }
  } catch (error) {
    console.error(error)
  }
}
