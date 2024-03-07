import { RatingWithAuthor } from '@/@types/types-prisma'
import { RatingStars } from '@/components/common/rating-stars'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'

import { User as UserProfileIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

interface UserRatingCardProps {
  rating: RatingWithAuthor
}

export const UserRatingCard = ({ rating }: UserRatingCardProps) => {
  const { data: session } = useSession()
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

  const isOwner = session?.user.id === rating.user_id

  return (
    <section
      className={`min-w-full md:w-full p-6 rounded-lg flex flex-col gap-5 ${isOwner ? `bg-gray-600` : `bg-gray-700`}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-4">
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar>
              <AvatarImage
                className="w-full "
                alt={`Foto de perfil de ${rating.user.name}`}
                src={rating?.user?.image as string}
              />
              <AvatarFallback>
                <UserProfileIcon />
              </AvatarFallback>
            </Avatar>
          </Link>

          <div className="flex flex-col">
            <p className="text-base font-bold">{rating.user.name}</p>
            <p className="text-gray-400 text-sm">{distance}</p>
          </div>
        </div>

        <RatingStars rating={rating.rate} />
      </div>

      <p className="text-gray-300 text-sm">{rating.description}</p>
    </section>
  )
}
