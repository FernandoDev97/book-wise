import { getServerSession } from 'next-auth'
import { options } from '../api/auth/[...nextauth]/options'

const Home = async () => {
  const session = await getServerSession(options)
  return <div></div>
}

export default Home