'use client'

import { LogIn, LogOut, Menu, User } from 'lucide-react'
import { Button } from '../ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { Binoculars, ChartLineUp } from '@phosphor-icons/react'
import { useMemo } from 'react'
import { usePathname } from 'next/navigation'

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

export const Header = () => {
  const { status, data } = useSession()
  const path = usePathname()

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
    <header className=" lg:hidden w-full mb-5 h-auto bg-sidebar-bg bg-no-repeat bg-center bg-cover   flex items-center justify-between bg-gray-700  px-4 py-6">
      <Sheet>
        <SheetTrigger className="lg:hidden" asChild>
          <Button className="p-0">
            <Menu className="text-gray-400" />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="bg-gray-800 border-none px-0 flex flex-col gap-6 lg:hidden"
          side="left"
        >
          <SheetHeader>
            <SheetTitle className="text-left border-b border-solid border-b-gray-600 pb-4 px-6">
              Menu
            </SheetTitle>
          </SheetHeader>

          <div className="px-6 h-full flex flex-col gap-10">
            {status === 'unauthenticated' && (
              <div className="flex items-center gap-3 text-gray-200">
                <User size={24} className="" />
                <span className="text-base font-bold">
                  Olá. Faça seu login!
                </span>
                <Link
                  className="flex ml-auto w-fit items-center gap-3 text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-700/40 transition-all py-2 px-2"
                  href="/login"
                >
                  <LogIn className="text-green-100" size={20} />
                </Link>
              </div>
            )}

            {status === 'authenticated' && (
              <div className="flex items-center gap-3 text-gray-200">
                <Avatar>
                  <AvatarImage
                    src={data.user.image}
                    alt={`Image de perfil do(a) ${data.user.name}`}
                  />
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
                <span className="text-base font-bold">{data.user.name}</span>
                <Button
                  className="flex ml-auto w-fit items-center gap-3 text-gray-200 bg-gray-700 rounded-lg hover:bg-gray-700/40 transition-all py-2 px-2"
                  onClick={() => signOut()}
                >
                  <LogOut className="text-red-500" size={20} />
                </Button>
              </div>
            )}

            <nav className="flex justify-start flex-col gap-10 lg:gap-7 w-full h-full ">
              {navItems.map((item) => (
                <SheetClose asChild key={item.label}>
                  <Link
                    className={
                      path === item.href
                        ? 'flex items-center text-gray-100 transition-colors gap-3 text-base'
                        : 'flex items-center text-gray-400 transition-colors gap-3 text-base hover:text-gray-100'
                    }
                    href={item.href}
                  >
                    {path === item.href && (
                      <span className="w-[4px] h-6 bg-gradient-to-b from-cyan-300 to-blue-500 rounded-full transition-all" />
                    )}
                    {item.icon}
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
      <div className=" ">
        <img
          className="w-[90px] h-[50px] lg:w-[128px] lg:h-[64px]"
          src="/images/Logo.svg"
          alt="Book wise logo"
        />
      </div>

      <div className="w-6 h-6 " />
    </header>
  )
}
