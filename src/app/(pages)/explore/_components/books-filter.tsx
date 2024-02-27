import { Button } from '@/components/ui/button'
import { Category } from '@prisma/client'

interface BooksFilterProps {
  category?: Category
  isActive: boolean
  tag?: string
  onClick?: () => void
}

export const BooksFilter = ({
  category,
  isActive,
  tag,
  onClick,
}: BooksFilterProps) => {
  return (
    <Button
      className={`rounded-full border-purple-100 text-purple-100 ${isActive ? `bg-purple-200 text-gray-100 border border-purple-200` : `bg-transparent`}`}
      onClick={onClick}
      variant={isActive ? 'default' : 'outline'}
    >
      {category?.name || tag}
    </Button>
  )
}
