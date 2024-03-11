import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const LoadingLatestRating = () => {
  return (
    <div className="flex w-full h-full flex-col gap-4">
      <div className="flex justify-between">
        <Skeleton className="w-[30%] h-4 bg-gray-700" />
        <Skeleton className="w-[15%] h-4 bg-gray-700" />
      </div>
      <Skeleton className="bg-gray-700 w-full h-44" />
    </div>
  )
}
