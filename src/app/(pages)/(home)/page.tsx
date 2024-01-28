import { PageTitle } from '@/components/common/page-title'
import { PopularBooks } from '@/components/pages/home/popular-books'
import { RecentRatings } from '@/components/pages/home/recent-ratings'

const Home = () => {
  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          <PageTitle title="Início" />
          <RecentRatings />
        </section>

        <section className="col-span-1 flex flex-col mt-20">
          <PopularBooks />
        </section>
      </div>
    </main>
  )
}

export default Home
