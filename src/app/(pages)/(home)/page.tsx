import { PageTitle } from '@/components/common/page-title'
import { PopularBooks } from '@/app/(pages)/(home)/_components/popular-books'
import { RecentRatings } from '@/app/(pages)/(home)/_components/recent-ratings'
import { recentRatings } from './_actions/recent-ratings'
import { popularBooks } from './_actions/popular-books'
import { getServerSession } from 'next-auth'
import { options } from '@/app/api/auth/[...nextauth]/options'
import { getUserLatestRating } from './_actions/user-latest-rating'
import { LatestRatingCard } from './_components/latest-rating-card'

const Home = async () => {
  const session = await getServerSession(options)
  const userId = session?.user.id

  const [ratings, books, { rating }] = await Promise.all([
    recentRatings(),
    popularBooks(),
    getUserLatestRating(String(userId)),
  ])

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 pr-3 xl:pr-0 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          <PageTitle title="Início" />
          {session && rating && (
            <LatestRatingCard userId={userId as string} rating={rating} />
          )}
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
