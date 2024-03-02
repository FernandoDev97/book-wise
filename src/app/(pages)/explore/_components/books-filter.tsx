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
      className={`rounded-full h-0 py-[14px] px-[14px] border-purple-100 hover:bg-purple-200 hover:text-gray-100 hover:border-purple-200 transition-all text-purple-100 ${isActive ? `bg-purple-200 text-gray-100 border border-purple-200` : `bg-transparent`}`}
      onClick={onClick}
      variant={isActive ? 'default' : 'outline'}
    >
      {category?.name || tag}
    </Button>
  )
}
