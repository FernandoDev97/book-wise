import { RatingStars } from '@/components/common/rating-stars'
import Image from 'next/image'
import Link from 'next/link'

interface PopularBookCardProps {
  book: {
    avgRating: number | null | undefined
    id: string
    name: string
    author: string
    summary: string
    cover_url: string
    total_pages: number
    created_at: Date
  }
}

export const PopularBookCard = ({ book }: PopularBookCardProps) => {
  return (
    <Link
      href={`/explore?bookId=${book.id}`}
      className="w-full h-[130px] bg-gray-700 rounded-lg px-5 py-4 flex mb-2 border border-gray-700 transition hover:border-gray-600 "
    >
      <div className="flex gap-5">
        <Image
          className="rounded min-w-[64px] h-full object-cover transition-all hover:brightness-125"
          width={64}
          height={94}
          sizes="100vh"
          alt="name"
          src={book.cover_url}
        />
        <div className="flex flex-col justify-between max-w-[160px] ">
          <div>
            <p className="text-base font-bold line-clamp-2 ">{book.name}</p>
            <p className="text-gray-400 text-sm line-clamp-1">{book.author}</p>
          </div>
          <RatingStars
            rating={book.avgRating as number}
            className="mt-auto"
            size={16}
          />
        </div>
      </div>
    </Link>
  )
}
