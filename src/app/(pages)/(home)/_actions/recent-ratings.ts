'use server'

export async function recentRatings() {
  const response = await fetch(`${process.env.API_URL}/rating/latest`)

  const { ratings } = await response.json()
  return ratings
}
