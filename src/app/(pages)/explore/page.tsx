import { ExploreBooks } from '@/app/(pages)/explore/_components/explore-books'
import { prismaClient } from '@/lib/prisma'
import React from 'react'
import { findCategoriesBooks } from './_actions/find-categories-books'

interface ExplorePageProps {
  searchParams: {
    bookId?: string
  }
}

const ExplorePage = async ({ searchParams }: ExplorePageProps) => {
  const [{ books }, categories] = await Promise.all([
    await findCategoriesBooks(null),
    await prismaClient.category.findMany(),
  ])

  return (
    <main className="w-full h-full flex flex-col px-3">
      <section className="flex gap-3 w-full h-full">
        <ExploreBooks
          bookId={searchParams.bookId}
          books={books}
          categories={categories}
        />
      </section>
    </main>
  )
}

export default ExplorePage
