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
    <main className="w-full h-full flex flex-col pr-5 overflow-auto pb-5 no-scrollbar">
      <section className="mt-10 flex gap-3 w-full">
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
