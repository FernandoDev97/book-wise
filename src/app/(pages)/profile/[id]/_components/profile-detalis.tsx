import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  BookOpen,
  Bookmark,
  LibraryBig,
  User,
  UserRoundCheck,
} from 'lucide-react'
import dayjs from 'dayjs'
import { ProfileDataTypes } from '../page'

export const ProfileDetalis = ({ profile }: ProfileDataTypes) => {
  const { user } = profile
  const memberSince = dayjs(user.member_since).format('YYYY')
  return (
    <section className="col-span-1 flex items-center  flex-col border-l border-solid h-fit border-gray-700 gap-5 mt-20">
      <Avatar className="w-[72px] h-[72px]">
        <AvatarImage
          className="object-cover"
          width={72}
          height={72}
          src={user?.image}
          alt={`Foto do perfil de ${user?.name}`}
        />
        <AvatarFallback>
          <User size={72} />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-0.5 items-center">
        <p className="text-xl font-bold ">{user?.name}</p>
        <p className="text-sm text-gray-400">membro desde {memberSince}</p>
      </div>

      <div className="flex flex-col gap-10">
        <div className="flex gap-5 items-center">
          <BookOpen size={32} className="text-green-100" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-gray-200">
              {profile.readPages}
            </p>
            <p className="text-sm text-gray-300">Páginas lidas</p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <LibraryBig size={32} className="text-green-100" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-gray-200">
              {profile.ratedBooks}
            </p>
            <p className="text-sm text-gray-300">
              {profile.ratedBooks === 1 ? `Livro avaliado` : `Livros avaliados`}
            </p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <UserRoundCheck size={32} className="text-green-100" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-gray-200">
              {profile.readAuthors}
            </p>
            <p className="text-sm text-gray-300">
              {profile.readAuthors === 1 ? `Autor lido` : `Autores lidos`}
            </p>
          </div>
        </div>

        <div className="flex gap-5 items-center">
          <Bookmark size={32} className="text-green-100" />
          <div className="flex flex-col gap-1">
            <p className="text-base font-bold text-gray-200">
              {profile.mostReadCategory}
            </p>
            <p className="text-sm text-gray-300">Categoria mais lida</p>
          </div>
        </div>
      </div>
    </section>
  )
}
