'use client'

import { getRelativeTimeString } from '@/utils/get-relative-time-string'

import Link from 'next/link'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../components/ui/avatar'
import { RatingStars } from '../../../../components/common/rating-stars'
import Image from 'next/image'
import { useToggleShowMore } from '@/hooks/useToggleShowMore'
import { Button } from '../../../../components/ui/button'
import { User as UserAvatar } from 'lucide-react'
import { RatingWithUserAndBook } from '@/@types/types-prisma'

interface RatingCardProps {
  rating: RatingWithUserAndBook
}

const MAX_SUMMARY_LENGTH = 180

export const RatingCard = ({ rating }: RatingCardProps) => {
  const {
    text: bookSummary,
    toggleShowMore,
    isShowingMore,
  } = useToggleShowMore(rating.book.summary, MAX_SUMMARY_LENGTH)

  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  return (
    <div className="w-full flex flex-col bg-gray-700 p-6 rounded-lg">
      <div className="flex items-start justify-between mb-8">
        <div className="flex gap-2 items-center ">
          <Link href={`/profile/${rating.user_id}`}>
            <Avatar>
              <AvatarImage
                alt={`Image de perfil do(a) ${rating.user.name}`}
                src={rating.user.image as string}
              />
              <AvatarFallback>
                <UserAvatar />
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link className="text-base" href={`/profile/${rating.user_id}`}>
              {rating.user.name}
            </Link>
            <span className="text-gray-400 text-sm capitalize">{distance}</span>
          </div>
        </div>
        <RatingStars size={16} rating={rating.rate} />
      </div>

      <div className="flex gap-5">
        <Link href={`/explore?bookId=${rating.book.id}`}>
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

          <div className="text-sm font-bold text-gray-300">
            {bookSummary}
            {rating.book.summary.length > MAX_SUMMARY_LENGTH && (
              <Button
                onClick={toggleShowMore}
                className="text-purple-100 h-auto font-bold p-0 ml-1 cursor-pointer"
              >
                {isShowingMore ? 'ver menos' : 'ver mais'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
