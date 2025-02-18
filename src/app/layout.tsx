import SessionProvider from '@/components/common/session-provider'
import RootFooter from '@/components/footer/footer'
import RootHeader from '@/components/header/header'
import '@/styles/global.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import MobileAffix from './components/affix'
import Script from 'next/script'

export const metadata = {
  title: 'Hafbuy',
  description: 'Tienda Online',
}

const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${ANALYTICS_ID}');
          `}
        </Script>
      </head>
      <body>
        <AntdRegistry>
          <SessionProvider>
            <MobileAffix />
            <RootHeader />
            {children}
            <RootFooter />
          </SessionProvider>
        </AntdRegistry>
      </body>
    </html>
  )
}
