import { Book, Rating, User } from '@prisma/client'

export interface BookWithAvgRating extends Book {
  avgRating: number | null | undefined
  alreadyRead: boolean
  ratings: number
}

export interface RatingWithUserAndBook extends Rating {
  user: User
  book: Book
}

export interface RatingWithAuthor extends Rating {
  user: User
}
