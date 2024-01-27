'use client'

import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export interface RatingWithAuthorAndBook extends Rating {
  user: User
  book: Book
}

interface RatingCardProps {
  rating: RatingWithAuthorAndBook
}

export const RatingCard = ({ rating }: RatingCardProps) => {
  const [firstRender, setFirstRender] = useState(false)

  useEffect(() => {
    setFirstRender(true)
  }, [])
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  return (
    <div className="w-full">
      {rating && firstRender && (
        <div className="flex items-start justify-between mb-8">
          <section className="flex gap-2 items-center ">
            <Link href={`/profile/${rating.user_id}`}>
              <Avatar>
                <AvatarImage
                  alt={`Image de perfil do(a) ${rating.user.name}`}
                  src={rating.user.image as string}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Link>
            <div className="flex flex-col">
              <Link className="text-base" href={`/profile/${rating.user_id}`}>
                {rating.user.name}
              </Link>
              <span className="text-gray-400 text-sm capitalize">
                {distance}
              </span>
            </div>
          </section>
          rating
        </div>
      )}
    </div>
  )
}
