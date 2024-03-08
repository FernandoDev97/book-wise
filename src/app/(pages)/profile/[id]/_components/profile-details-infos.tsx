import { ReactNode } from 'react'

interface ProfileDetailsProps {
  icon: ReactNode
  details: string | number
  description?: string
}

export const ProfileDetailsInfos = ({
  icon,
  details,
  description,
}: ProfileDetailsProps) => {
  return (
    <div className="flex gap-3 lg:gap-5 items-center">
      {icon}
      <div className="flex flex-col lg:gap-1">
        <p className="text-sm md:text-base font-bold text-gray-200">
          {details}
        </p>
        <p className="text-xs md:text-sm text-gray-300">{description}</p>
      </div>
    </div>
  )
}
