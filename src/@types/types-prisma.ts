import { Book, Rating, User } from '@prisma/client'

export interface BookWithAvgRating extends Book {
  avgRating: number
  alreadyRead: boolean
  ratings: number
}

export interface RatingWithUserAndBook extends Rating {
  user: User
  book: Book
}
