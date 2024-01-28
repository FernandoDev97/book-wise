import { RatingCard } from '@/components/pages/home/rating-card'
import React from 'react'

export const RecentRatings = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm">Avaliações mais recentes</p>

      <section className="flex flex-col gap-3">
        {Array.from({ length: 20 }).map((_, i) => (
          <RatingCard
            key={i}
            rating={{
              id: 'aa',
              rate: 3,
              book_id: 'shdsakhd',
              user_id: 'ksjdklsajd',
              user: {
                name: 'Fernando Souza',
                image:
                  'https://lh3.googleusercontent.com/a/ACg8ocI9UKXWzENMToI5WFZEkJmaGmz96fR5Je63eFPU2SMD5w=s96-c',
                email: 'Fernando@gmail.com',
                id: 'jkasdhfas',
                emailVerified: null,
                created_at: new Date(),
              },
              book: {
                author: 'J.R.R. Tolkien',
                cover_url: '/images/Book.png',
                id: 'asjfklasdf',
                name: 'O Hobbit',
                summary:
                  'Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh jhjs lorem ipum lorem lorem morem mais menos mais alguma coisa mais coisa so mais um pou1quino inconstituciona',
                total_pages: 100,
                created_at: new Date(),
              },
              created_at: new Date(),
              description: 'kdjkajsjd',
            }}
          />
        ))}
      </section>
    </div>
  )
}
