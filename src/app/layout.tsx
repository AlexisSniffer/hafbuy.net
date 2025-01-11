import SessionProvider from '@/components/common/session-provider'
import RootFooter from '@/components/footer/footer'
import RootHeader from '@/components/header/header'
import '@/styles/global.scss'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import MobileAffix from './components/affix'

export const metadata = {
  title: 'Hafbuy',
  description: 'Tienda Online',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
