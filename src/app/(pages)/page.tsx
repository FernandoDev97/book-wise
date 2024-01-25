import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Home = async () => {
  const session = await getServerSession(options)
  return <div>Testewww</div>
}

export default Home
