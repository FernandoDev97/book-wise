import { Book, Rating, User } from '@prisma/client'

export interface BookWithAvgRating extends Book {
  avgRating: number
  alreadyRead: boolean
}

export interface RatingWithUserAndBook extends Rating {
  user: User
  book: Book
}
