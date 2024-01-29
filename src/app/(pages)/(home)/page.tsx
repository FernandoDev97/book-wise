import { PageTitle } from '@/components/common/page-title'
import { BookWithAvgRating } from '@/components/pages/home/popular-book-card'
import { PopularBooks } from '@/components/pages/home/popular-books'
import { RatingWithAuthorAndBook } from '@/components/pages/home/rating-card'
import { RecentRatings } from '@/components/pages/home/recent-ratings'

async function recentRatings(): Promise<RatingWithAuthorAndBook[]> {
  const response = await fetch(`${process.env.API_URL}/rating/latest`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const { ratings } = await response.json()
  return ratings
}

async function popularBooks(): Promise<BookWithAvgRating[]> {
  const response = await fetch(`${process.env.API_URL}/books/popular`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })

  const { booksWithAvgRating } = await response.json()
  return booksWithAvgRating
}

const Home = async () => {
  const [ratings, booksWithAvgRating] = await Promise.all([
    recentRatings(),
    popularBooks(),
  ])

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          <PageTitle title="Início" />
          <RecentRatings recentRatings={ratings ?? []} />
        </section>

        <section className="col-span-1 flex flex-col mt-20">
          <PopularBooks popularBooks={booksWithAvgRating ?? []} />
        </section>
      </div>
    </main>
  )
}

export default Home
