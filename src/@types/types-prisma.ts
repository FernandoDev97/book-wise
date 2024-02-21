import { Book, Rating, User } from '@prisma/client'

export interface BookWithAvgRating extends Book {
  avgRating: number
}

export interface RatingWithUserAndBook extends Rating {
  user: User
  book: Book
}
