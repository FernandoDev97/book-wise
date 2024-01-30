import { PageTitle } from '@/components/common/page-title'
import { BookWithAvgRating } from '@/components/pages/home/popular-book-card'
import { PopularBooks } from '@/components/pages/home/popular-books'
import { RatingWithAuthorAndBook } from '@/components/pages/home/rating-card'
import { RecentRatings } from '@/components/pages/home/recent-ratings'
import { api } from '@/lib/axios'

async function recentRatings(): Promise<RatingWithAuthorAndBook[]> {
  const response = await api.get(`${process.env.API_URL}/rating/latest`)

  const { ratings } = await response.data
  return ratings
}

async function popularBooks(take?: number): Promise<BookWithAvgRating[]> {
  const response = await api.get(`${process.env.API_URL}/books/popular`, {
    params: {
      take,
    },
  })

  const { books } = await response.data
  return books
}

const Home = async () => {
  const [ratings, books] = await Promise.all([recentRatings(), popularBooks(2)])

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          <PageTitle title="Início" />
          <RecentRatings recentRatings={ratings ?? []} />
        </section>

        <section className="col-span-1 flex flex-col mt-20">
          <PopularBooks popularBooks={books ?? []} />
        </section>
      </div>
    </main>
  )
}

export default Home
