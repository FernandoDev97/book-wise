import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LoadingRecentsRatings = () => {
  return (
    <div className="w-full h-full flex flex-col gap-3 ">
      <Skeleton className="w-[50%] h-4 bg-gray-700" />
      <Skeleton className="w-full h-80 lg:hidden bg-gray-700" />
      <div className="space-y-3 hidden lg:block">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full h-40 bg-gray-700" />
          </div>
        ))}
      </div>
    </div>
  )
}
