'use client'

import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react'

interface TitlePagePros {
  title: 'Início' | 'Explorar' | 'Perfil'
}

const RENDER_ICONS = [
  {
    title: 'Início',
    icon: <ChartLineUp size={32} />,
  },
  {
    title: 'Explorar',
    icon: <Binoculars size={32} />,
  },
  {
    title: 'Perfil',
    icon: <User size={32} />,
  },
]

export const TitlePage = ({ title }: TitlePagePros) => {
  return (
    <div className="flex items-center gap-3 [&>svg]:text-green-100 mb-11">
      {RENDER_ICONS.map(
        (item) =>
          item.title === title && (
            <div key={item.title}>
              {item.icon}
              <h1 className="text-2xl font-bold">{item.title}</h1>
            </div>
          ),
      )}
    </div>
  )
}
