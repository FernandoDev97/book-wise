/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React from 'react'
import { Button } from '../ui/button'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type AuthButtonsProps = {
  callbackUrl?: string
}

export const AuthButtons = ({ callbackUrl = '/' }: AuthButtonsProps) => {
  const { status, data } = useSession()
  const router = useRouter()

  // console.log(status, data)

  const handleSignIn = (provider?: string) => {
    if (!provider) {
      router.push('/')
      return
    }

    signIn(provider, {
      callbackUrl,
    })
  }
  return (
    <section className="w-full flex flex-col gap-4 mt-6">
      <Button
        onClick={() => handleSignIn('google')}
        className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]"
      >
        <img src="/images/googleLogo.svg" alt="Google logo" />
        Entrar com o Google
      </Button>
      <Button
        onClick={() => handleSignIn('github')}
        className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]"
      >
        <img src="/images/githubLogo.svg" alt="Github logo" />
        Entrar com o GitHub
      </Button>
      <Button
        onClick={() => handleSignIn()}
        className="bg-gray-600 rounded-lg flex gap-4 text-lg text-gray-200 justify-start w-full px-6 h-[4.5rem]"
      >
        <img
          src="/images/visitorLogo.svg"
          alt="Visitante logo (icone de uma foguete)"
        />
        Acessar como visitante
      </Button>
    </section>
  )
}
