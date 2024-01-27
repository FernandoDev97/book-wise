'use client'

import {
  Binoculars,
  User,
  ChartLineUp,
  SignIn,
  SignOut,
} from '@phosphor-icons/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { signOut, useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'

const NAV_ITEMS = [
  {
    label: 'Início',
    href: '/',
    icon: <ChartLineUp size={24} />,
  },
  {
    label: 'Explorar',
    href: '/explore',
    icon: <Binoculars size={24} />,
  },
]

export const Navigation = () => {
  const { status, data } = useSession()
  const path = usePathname()

  const userName = data?.user.name.split(' ')[0]

  const navItems = useMemo(() => {
    if (data) {
      return NAV_ITEMS.concat({
        label: 'Pefil',
        href: `/profile/${data.user.id}`,
        icon: <User size={24} />,
      })
    }

    return NAV_ITEMS
  }, [data])

  return (
    <nav className="flex flex-col gap-7 w-full h-full">
      {navItems.map((item) => (
        <Link
          className={
            path === item.href
              ? 'flex items-center text-gray-100 transition-colors gap-3'
              : 'flex items-center text-gray-400 transition-colors gap-3 hover:text-gray-100'
          }
          href={item.href}
          key={item.label}
        >
          {path === item.href && (
            <span className="w-[4px] h-6 bg-gradient-to-b from-cyan-300 to-blue-500 rounded-full transition-all" />
          )}
          {item.icon}
          {item.label}
        </Link>
      ))}

      <div className="mt-auto w-full ">
        {status === 'authenticated' && (
          <div className="flex justify-between items-center w-full">
            <Avatar>
              <AvatarImage
                src={data.user.image}
                alt={`Image de perfil do(a) ${data.user.name}`}
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button className="flex p-0 font-bold">{userName}</Button>
            <SignOut
              onClick={() => signOut()}
              className="text-red-500 cursor-pointer"
              size={24}
            />
          </div>
        )}
        {status === 'unauthenticated' && (
          <Link href="/login" className="flex gap-2 font-bold justify-center">
            Fazer login <SignIn className="text-green-100" size={24} />
          </Link>
        )}
      </div>
    </nav>
  )
}
