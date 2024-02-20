'use server'

export async function popularBooks(take?: string) {
  const response = await fetch(
    `${process.env.API_URL}/books/popular?` + new URLSearchParams(take),
  )

  const { books } = await response.json()
  return books
}
