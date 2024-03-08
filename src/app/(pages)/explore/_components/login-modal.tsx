import { AuthButtons } from '@/components/common/auth-buttons'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import React from 'react'

interface LoginModalProps {
  bookId?: string
}

export const LoginModal = ({ bookId }: LoginModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded text-purple-100 font-bold hover:bg-purple-100/10">
          Avaliar
        </Button>
      </DialogTrigger>
      <DialogContent className="flex lg:py-14 rounded-lg lg:px-[72px] flex-col gap-3 lg:gap-6 justify-center items-center border-none bg-gray-700">
        <DialogHeader>
          <DialogTitle className="text-center mt-2 text-base font-bold text-gray-200">
            Faça login para deixar sua avaliação
          </DialogTitle>
        </DialogHeader>
        <section className="w-full">
          <AuthButtons isModalLogin callbackUrl={`/explore?bookId=${bookId}`} />
        </section>
      </DialogContent>
    </Dialog>
  )
}
