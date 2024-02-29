'use client'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export const ButtonBack = () => {
  const router = useRouter()

  return (
    <Button
      className="flex items-center text-sm pl-0 justify-start border-none w-fit gap-2"
      onClick={() => router.back()}
      variant="outline"
    >
      {' '}
      <ChevronLeft size={20} /> Voltar
    </Button>
  )
}
