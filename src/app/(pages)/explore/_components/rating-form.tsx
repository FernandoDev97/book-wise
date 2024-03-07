/* eslint-disable no-useless-return */
import { RatingStars } from '@/components/common/rating-stars'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Check, Loader2, User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FormEvent, useState } from 'react'
import { createNewRate } from '../_actions/create-new-rate'
import { toast } from 'sonner'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface RatingFormProps {
  cancelShowForm: () => void
  bookId: string
}

export const RatingForm = ({ cancelShowForm, bookId }: RatingFormProps) => {
  const { data: session } = useSession()

  const [description, setDescription] = useState('')
  const [currentRate, setCurrentRate] = useState(0)
  const [loading, setLoading] = useState(false)

  const queryClient = useQueryClient()

  const { mutateAsync: handleRate } = useMutation({
    mutationFn: async () => {
      setLoading(true)
      const formData = {
        description,
        rate: currentRate,
        bookId,
        userId: String(session?.user.id),
      }
      try {
        const response = await createNewRate(formData)
        if (response.message) {
          return toast(response.message)
        }

        if (response.error) {
          return toast(response.error)
        }
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book', bookId] })
      queryClient.invalidateQueries({ queryKey: ['books'] })
      cancelShowForm()
    },
  })

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    if (!description || !currentRate) return
    await handleRate()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-gray-700 p-6 rounded-lg flex flex-col gap-6"
    >
      <section className="flex flex-wrap gap-3 justify-between">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage
              className="rounded-full w-8 h-8 md:w-10 md:h-10"
              src={session?.user.image}
              alt={session?.user.name}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <span className="text-gray-100 font-bold text-sm md:text-base">
            {session?.user.name}
          </span>
        </div>

        <RatingStars
          className="cursor-pointer "
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
          disabled={!description || !currentRate || loading}
        >
          {loading ? (
            <Loader2 className="h-5 w-5 text-green-100 animate-spin" />
          ) : (
            <Check className="text-green-100" />
          )}
        </Button>
      </div>
    </form>
  )
}
