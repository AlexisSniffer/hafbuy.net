import { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { Analytics } from '@vercel/analytics/react'
import MainLayout from '../layouts/MainLayout'

import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const page = (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )

  if (Component.getLayout) {
    return Component.getLayout(page)
  }

  return <MainLayout>{page}</MainLayout>
}
