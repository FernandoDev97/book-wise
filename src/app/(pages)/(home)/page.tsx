import { PageTitle } from '@/components/common/page-title'
import { PopularBooks } from '@/components/pages/home/popular-books'
import { RecentRatings } from '@/components/pages/home/recent-ratings'

const Home = async () => {
  return (
    <main className="w-full h-full flex flex-col gap-11">
      <PageTitle title="Início" />
      <div className="grid grid-cols-3 w-full h-full gap-16">
        <section className="col-span-2 w-full overflow-auto no-scrollbar flex flex-col gap-11 h-full pb-5">
          <RecentRatings />
        </section>

        <section className="flex flex-col ">
          <PopularBooks />
        </section>
      </div>
    </main>
  )
}

export default Home
