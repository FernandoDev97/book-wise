import { RatingStars } from '@/components/common/rating-stars'
import { getRelativeTimeString } from '@/utils/get-relative-time-string'
import { Book, CategoriesOnBooks, Category, Rating } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

export type RatingWithBookAndCategories = Rating & {
  book: Book & {
    categories: CategoriesOnBooks &
      {
        category: Category
      }[]
  }
}

interface RecentRatingCardProps {
  rating: RatingWithBookAndCategories
}

export const RecentRatingCard = ({ rating }: RecentRatingCardProps) => {
  const distance = getRelativeTimeString(new Date(rating.created_at), 'pt-BR')
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-gray-300 text-sm">{distance}</span>

      <div className="p-6 bg-gray-700 flex flex-col gap-6 rounded-lg">
        <div className="h-[134px] flex gap-6">
          <Link href={`/explore?bookId=${rating.book_id}`}>
            <Image
              className="rounded min-w-[108px] h-full object-contain transition-all hover:brightness-125"
              width={108}
              height={0}
              sizes="100vh"
              alt={rating.book.cover_url}
              src={rating.book.cover_url}
            />
          </Link>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-bold text-gray-100">
                {rating.book.name}
              </h2>
              <p className="text-gray-400 text-sm">{rating.book.author}</p>
            </div>

            <RatingStars className="mt-auto" size={16} rating={rating.rate} />
          </div>
        </div>

        <p className="text-sm text-gray-300">{rating.description}</p>
      </div>
    </div>
  )
}
