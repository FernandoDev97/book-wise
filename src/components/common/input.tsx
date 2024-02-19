import { Search } from 'lucide-react'
import { Input as InputShadcn } from '../ui/input'

export const Input = () => {
  return (
    <form action="">
      <div className="w-full relative focus-within:border-green-200 focus-within:text-green-200 border border-gray-500 rounded transition-all">
        <InputShadcn
          placeholder="Buscar livro ou autor"
          className="bg-transparent px-5 text-gray-400 py-6 outline-none focus:outline-none border-none"
        />
        <Search size={20} className="absolute text-gray-500 right-5 bottom-4" />
      </div>
    </form>
  )
}
