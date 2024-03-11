import { PageTitle } from '@/components/common/page-title'
import { PopularBooks } from '@/app/(pages)/(home)/_components/popular-books'
import { RecentRatings } from '@/app/(pages)/(home)/_components/recent-ratings'
import { LatestRatingCard } from './_components/latest-rating-card'
import { Suspense } from 'react'
import { LoadingRecentsRatings } from './_components/loading-recents-ratings'
import { LoadingLatestRating } from './_components/loading-latest-rating'
import { LoadingPopularBooks } from './_components/loading-popular-books'

const Home = async () => {
  return (
    <main className="w-full h-full px-3">
      <div className="lg:grid lg:grid-cols-3 w-full h-full lg:gap-16 ">
        <section className="col-span-2 w-full lg:overflow-auto lg:no-scrollbar pb-5 flex flex-col gap-11">
          <PageTitle title="Início" />

          <Suspense fallback={<LoadingLatestRating />}>
            <LatestRatingCard />
          </Suspense>

          <Suspense fallback={<LoadingRecentsRatings />}>
            <RecentRatings />
          </Suspense>
        </section>

        <section className="col-span-1 lg:flex flex-col pb-3 lg:pb-0 lg:mt-20">
          <Suspense fallback={<LoadingPopularBooks />}>
            <PopularBooks />
          </Suspense>
        </section>
      </div>
    </main>
  )
}

export default Home
