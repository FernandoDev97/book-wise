import { options } from '@/app/api/auth/[...nextauth]/options'
import { PageTitle } from '@/components/common/page-title'
import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import React from 'react'
import { ButtonBack } from './_components/button-back'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

interface ProfilePageProps {
  params: {
    id?: string
  }
}

const ProfilePage = async ({ params }: ProfilePageProps) => {
  const user = await prismaClient.user.findFirst({
    where: {
      id: params.id,
    },
  })

  const session = await getServerSession(options)

  if (!user) {
    return redirect('/')
  }

  return (
    <main className="w-full h-full ">
      <div className="grid grid-cols-3 pr-3 xl:pr-0 w-full h-full gap-16 ">
        <section className="col-span-2 w-full overflow-auto no-scrollbar pb-5 flex flex-col gap-11">
          {user?.id === session?.user.id ? (
            <PageTitle title="Perfil" />
          ) : (
            <ButtonBack />
          )}
          <form className="w-full relative focus-within:border-green-200 focus-within:text-green-200 border border-gray-500 rounded transition-all">
            <Input
              placeholder="Buscar livro ou autor"
              className="bg-transparent px-5 text-gray-400 py-6 outline-none focus:outline-none border-none"
            />
            <Search
              size={20}
              className="absolute text-gray-500 right-5 bottom-3.5"
            />
          </form>
        </section>

        <section className="col-span-1 flex items-center flex-col border-l border-solid h-fit border-gray-700 gap-5 mt-20">
          <Avatar className="w-[72px] h-[72px]">
            <AvatarImage
              className="object-cover"
              width={72}
              height={72}
              src={user?.image as string}
              alt={`Foto do perfil de ${user.name}`}
            />
            <AvatarFallback />
          </Avatar>
          <div className="flex flex-col gap-0.5 items-center">
            <p className="text-xl font-bold ">{user.name}</p>
            <p className="text-sm text-gray-400">membro desde 2019</p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default ProfilePage
