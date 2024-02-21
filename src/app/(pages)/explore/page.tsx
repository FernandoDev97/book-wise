import { Input } from '@/components/common/input'
import { PageTitle } from '@/components/common/page-title'
import { ExploreBooks } from '@/components/pages/explore/explore-books'
import { prismaClient } from '@/lib/prisma'
import React from 'react'
import { findCategoriesBooks } from './_actions/find-categories-books'

const Explore = async () => {
  const [{ books }, categories] = await Promise.all([
    await findCategoriesBooks(null),
    await prismaClient.category.findMany(),
  ])
  return (
    <main className="w-full h-full flex flex-col pr-5 overflow-auto pb-5 no-scrollbar">
      <div className="grid grid-cols-2">
        <PageTitle title="Explorar" />
        <Input />
      </div>
      <section className="mt-10 flex gap-3 w-full">
        <ExploreBooks books={books} categories={categories} />
      </section>
    </main>
  )
}

export default Explore
