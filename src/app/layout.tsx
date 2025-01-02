import SessionProvider from '@/components/common/session-provider'
import RootFooter from '@/components/footer/footer'
import RootHeader from '@/components/header/header'
import StyledComponentsRegistry from '@/lib/antd-registry'
import '@/styles/global.scss'
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
        <StyledComponentsRegistry>
          <SessionProvider>
            <MobileAffix />
            <RootHeader />
            {children}
            <RootFooter />
          </SessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
