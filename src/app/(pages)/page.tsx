import { LatestRatings } from '@/components/pages/home/latest-ratings'

const Home = async () => {
  return (
    <section className="grid grid-cols-3 w-full h-full overflow-hidden gap-16">
      <LatestRatings />
    </section>
  )
}

export default Home
