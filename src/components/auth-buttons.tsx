'use client'

import React from 'react'
import { Button } from './ui/button'
import { signIn, signOut, useSession } from 'next-auth/react'

export const AuthButtons = () => {
  const { status, data } = useSession()

  console.log(status, data)
  const handleLoginWithGoogleClick = async () => {
    await signIn('google')
  }

  const handleLoginWithGithubClick = async () => {
    await signIn('github')
  }

  const handleLogoutClick = async () => {
    await signOut()
  }
  return (
    <section className="w-full flex flex-col gap-4 mt-6">
      <Button
        onClick={handleLoginWithGoogleClick}
        className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]"
      >
        <img src="/images/googleLogo.svg" alt="Google logo" />
        Entrar com o Google
      </Button>
      <Button
        onClick={handleLoginWithGithubClick}
        className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]"
      >
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
