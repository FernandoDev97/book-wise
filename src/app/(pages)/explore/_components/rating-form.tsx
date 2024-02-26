import { RatingStars } from '@/components/common/rating-stars'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Check, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

interface RatingFormProps {
  cancelShowForm: () => void
  bookId: string
}

export const RatingForm = ({ cancelShowForm, bookId }: RatingFormProps) => {
  const { data: session } = useSession()

  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)
  return (
    <form className="w-full bg-gray-700 p-6 rounded-lg flex flex-col gap-6">
      <section className="flex justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              className="rounded-full w-10 h-10"
              src={session?.user.image}
              alt={session?.user.name}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-100 font-bold text-base">
            {session?.user.name}
          </span>
        </div>

        <RatingStars
          className="cursor-pointer"
          rating={currentRate}
          size={24}
          setRating={setCurrentRate}
        />
      </section>

      <Textarea
        className="bg-gray-800 outline-none text-sm text-gray-400 border-gray-500 px-5 py-[14px] min-h-[164px] rounded"
        placeholder="Escreva sua avaliação"
        maxLength={450}
        value={description}
        onChange={({ target }) => setDescription(target.value)}
      />
      <div className="w-full flex justify-end gap-2">
        <Button
          className="bg-gray-600 p-2 rounded hover:bg-gray-500"
          onClick={cancelShowForm}
        >
          <X className="text-purple-100" />
        </Button>
        <Button
          className="bg-gray-600 p-2 rounded hover:bg-gray-500 disabled:cursor-not-allowed"
          type="submit"
          disabled={!description || !currentRate}
        >
          <Check className="text-green-100" />
        </Button>
      </div>
    </form>
  )
}
