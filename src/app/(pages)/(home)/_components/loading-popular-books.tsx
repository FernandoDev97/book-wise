import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LoadingPopularBooks = () => {
  return (
    <div className="w-full overflow-auto lg:overflow-hidden flex lg:flex-col gap-3">
      <div className="hidden lg:flex justify-between">
        <Skeleton className="h-4 w-[30%] bg-gray-700" />
        <Skeleton className="h-4 w-[30%] bg-gray-700" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="min-w-full bg-gray-700 h-24 " />
      ))}
    </div>
  )
}
