import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col gap-10 px-3">
      <div className="w-full flex flex-col space-y-10 lg:space-y-0 lg:flex-row justify-between lg:items-center">
        <Skeleton className="w-[25%] h-8 bg-gray-700" />
        <Skeleton className="w-full lg:w-[45%] h-12 bg-gray-700" />
      </div>

      <div className="w-full flex overflow-auto no-scrollbar h-32 lg:flex-wrap gap-3">
        {Array.from({ length: 13 }).map((_, i) => (
          <Skeleton key={i} className="min-w-24 lg:w-20 h-7 bg-gray-700" />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 overflow-auto no-scrollbar">
        {Array.from({ length: 20 }).map((_, i) => (
          <Skeleton key={i} className="min-w-24 lg:w-full h-40 bg-gray-700" />
        ))}
      </div>
    </div>
  )
}

export default Loading
