import { RatingCard } from '@/components/common/rating-card'
import { TitlePage } from '@/components/common/title-page'
import React from 'react'

export const HomePage = () => {
  return (
    <div>
      <TitlePage title="Início" />

      <p className="text-sm">Avaliações mais recentes</p>

      <section className="flex flex-col gap-3 mt-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <RatingCard
            key={i}
            rating={{
              id: 'aa',
              rate: 4,
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
                author: 'Fernando Souza',
                cover_url:
                  'https://lh3.googleusercontent.com/a/ACg8ocI9UKXWzENMToI5WFZEkJmaGmz96fR5Je63eFPU2SMD5w=s96-c',
                id: 'asjfklasdf',
                name: 'Julia',
                summary: 'Julia',
                total_pages: 100,
                created_at: new Date(),
              },
              created_at: new Date(),
            }}
          />
        ))}
      </section>
    </div>
  )
}
