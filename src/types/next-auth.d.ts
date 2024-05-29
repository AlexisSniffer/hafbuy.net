import NextAuth from 'next-auth/next'

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string
      username?: string
      name?: string
      lastname?: string
      email?: string
      confirmed?: boolean
      blocked?: boolean
      token?: string
    }
  }
}
