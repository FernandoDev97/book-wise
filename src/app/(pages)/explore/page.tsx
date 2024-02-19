import { Input } from '@/components/common/input'
import { PageTitle } from '@/components/common/page-title'
import { ExploreBooks } from '@/components/pages/explore/explore-books'
import { prismaClient } from '@/lib/prisma'
import React from 'react'

const Explore = async () => {
  const books = await prismaClient.book.findMany({
    include: {
      ratings: true,
    },
  })

  const categories = await prismaClient.category.findMany()

  return (
    <main className="w-full h-full flex flex-col pr-5 overflow-auto pb-5 no-scrollbar">
      <div className="grid grid-cols-2">
        <PageTitle title="Explorar" />
        <Input />
      </div>
      <section className="mt-10 flex gap-3 w-full">
        <ExploreBooks categories={categories} books={books} />
      </section>
    </main>
  )
}

export default Explore
