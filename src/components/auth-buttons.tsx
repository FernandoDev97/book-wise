import React from 'react'
import { Button } from './ui/button'

export const AuthButtons = () => {
  return (
    <section className="w-full flex flex-col gap-4 mt-6">
      <Button className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]">
        <img src="/images/googleLogo.svg" alt="Google logo" />
        Entrar com o Google
      </Button>
      <Button className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]">
        <img src="/images/githubLogo.svg" alt="Github logo" />
        Entrar com o GitHub
      </Button>
      <Button className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]">
        <img
          src="/images/visitorLogo.svg"
          alt="Visitante logo (icone de uma foguete)"
        />
        Acessar como visitante
      </Button>
    </section>
  )
}
