import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import type { NextPage } from 'next'
import { Analytics } from '@vercel/analytics/react'
import { store } from './../store'
import MainLayout from '../layouts/MainLayout'

import '../styles/globals.css'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const page = (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )

  if (Component.getLayout) {
    return <Provider store={store}>Component.getLayout(page)</Provider>
  }

  return (
    <Provider store={store}>
      <MainLayout>{page}</MainLayout>
    </Provider>
  )
}

export default App
