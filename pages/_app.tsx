import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
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

const theme = {
  token: {
    fontFamily: 'Jost',
  },
}

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const page = (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )

  if (Component.getLayout) {
    return (
      <Provider store={store}>
        <ConfigProvider theme={theme}>
          {Component.getLayout(page)}
        </ConfigProvider>
      </Provider>
    )
  }

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <MainLayout>{page}</MainLayout>
      </ConfigProvider>
    </Provider>
  )
}

export default App
