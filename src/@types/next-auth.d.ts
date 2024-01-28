/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string | number
    name: string
    email: string
    image: string
  }

  interface Session {
    user: User
  }
}
