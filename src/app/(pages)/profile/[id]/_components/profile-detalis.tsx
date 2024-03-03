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
import { ProfileDetailsInfos } from './profile-details-infos'

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

      <div className="w-8 h-1 rounded-full bg-gradient-to-r from-[#7FD1CC] to-[#9694F5] my-8" />

      <div className="flex flex-col gap-10">
        <ProfileDetailsInfos
          icon={<BookOpen size={32} className="text-green-100" />}
          details={profile.readPages}
          description="Páginas lidas"
        />

        <ProfileDetailsInfos
          icon={<LibraryBig size={32} className="text-green-100" />}
          details={profile.ratedBooks}
          description={
            profile.ratedBooks === 1 ? `Livro avaliado` : `Livros avaliados`
          }
        />
        <ProfileDetailsInfos
          icon={<UserRoundCheck size={32} className="text-green-100" />}
          details={profile.readAuthors}
          description={
            profile.readAuthors === 1 ? `Autor lido` : `Autores lidos`
          }
        />
        {profile.mostReadCategory && (
          <ProfileDetailsInfos
            icon={<Bookmark size={32} className="text-green-100" />}
            details={profile.mostReadCategory}
            description="Categoria mais lida"
          />
        )}
      </div>
    </section>
  )
}
