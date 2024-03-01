'use server'

export const getProfile = async (userId: string) => {
  const params = new URLSearchParams({
    userId,
  })

  try {
    const response = await fetch(`${process.env.API_URL}/profile?${params}`, {
      method: 'GET',
    })

    const data = await response.json()
    return data
  } catch (error) {
    console.error(error)
  }
}
