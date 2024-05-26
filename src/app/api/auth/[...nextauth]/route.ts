import nextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = nextAuth({
  pages: {
    signIn: '/auth/login',
    signOut: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/local`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              identifier: credentials?.email,
              password: credentials?.password,
            }),
          },
        )

        const data = await response.json()

        if (data && data.error)
          throw Error('No se pudo iniciar sesion, intentelo mas tarde.')

        return {
          id: data.user.id,
          name: data.user.username,
          email: data.user.email,
        }
      },
    }),
  ],
})

export { handler as GET, handler as POST }
