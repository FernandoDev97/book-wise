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
    <div className="flex gap-5 items-center">
      {icon}
      <div className="flex flex-col gap-1">
        <p className="text-base font-bold text-gray-200">{details}</p>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  )
}
