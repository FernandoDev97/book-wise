'use client'

import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { Book, Rating, User } from '@prisma/client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import { RatingStars } from '../../common/rating-stars'
import Image from 'next/image'
import { useToggleShowMore } from '@/hooks/useToggleShowMore'
import { Button } from '../../ui/button'

export interface RatingWithAuthorAndBook extends Rating {
  user: User
  book: Book
}

interface RatingCardProps {
  rating: RatingWithAuthorAndBook
}

const MAX_SUMMARY_LENGTH = 180

export const RatingCard = ({ rating }: RatingCardProps) => {
  const [firstRender, setFirstRender] = useState(false)

  const {
    text: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = useToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGTH)

  useEffect(() => {
    setFirstRender(true)
  }, [])
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  return (
    rating &&
    firstRender && (
      <div className="w-full flex flex-col bg-gray-700 p-6 rounded-lg">
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
          <RatingStars rating={rating.rate} />
        </div>

        <div className="flex gap-5">
          <Link href={`/explore?book=${rating.book.id}`}>
            <Image
              className="rounded min-w-[108px] h-[152px] object-cover transition-all hover:brightness-125"
              width={108}
              height={152}
              sizes="100vh"
              alt={rating.book.name}
              src={rating.book.cover_url}
            />
          </Link>

          <div className="flex flex-col gap-5">
            <div>
              <h2 className="font-bold text-base">{rating.book.name}</h2>
              <p className="text-gray-400 text-sm">{rating.book.author}</p>
            </div>

            <p className="text-sm font-bold text-gray-300">
              {bookSummary}
              {rating.book.summary.length > MAX_SUMMARY_LENGTH && (
                <Button
                  onClick={toggleShowMore}
                  className="text-purple-100 h-auto font-bold p-0 ml-1 cursor-pointer"
                >
                  {isShowingMore ? 'ver menos' : 'ver mais'}
                </Button>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  )
}
