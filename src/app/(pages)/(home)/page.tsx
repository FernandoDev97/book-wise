import { HomePage } from '@/components/pages/home'

const Home = async () => {
  return (
    <section className="grid grid-cols-3 w-full h-full overflow-hidden gap-16">
      <div className="col-span-2 overflow-auto no-scrollbar pb-5">
        <HomePage />
      </div>
    </section>
  )
}

export default Home
