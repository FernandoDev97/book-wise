import { RatingStars } from '@/components/common/rating-stars'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { Book, Rating } from '@prisma/client'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface RatingWithBook extends Rating {
  book: Book
}

interface LatestRatingCardProps {
  rating: RatingWithBook
  userId: string
}

export const LatestRatingCard = ({ rating, userId }: LatestRatingCardProps) => {
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <span>Sua última leitura</span>
        <Link
          href={`/profile/${userId}`}
          className="flex hover:bg-[#8381D90F] py-2 px-3 transition-all rounded items-center text-sm font-bold text-purple-100"
        >
          Ver todas
          <ChevronRight size={16} />
        </Link>
      </div>
      <div className="bg-gray-600 px-6 py-5 rounded-lg flex gap-6">
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
        <div className="w-full flex flex-col gap-3">
          <div className="w-full flex justify-between">
            <span className="text-gray-300 text-sm">{distance}</span>
            <RatingStars size={16} rating={rating.rate} />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="font-bold text-base">{rating.book.name}</h2>
            <h3 className="text-gray-400 text-sm">{rating.book.author}</h3>
          </div>

          <p className="line-clamp-2 text-gray-300 text-sm mt-auto">
            {rating.description}
          </p>
        </div>
      </div>
    </div>
  )
}
