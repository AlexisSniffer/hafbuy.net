import RootHeader from '@/components/header/header'
import SessionProvider from '@/components/common/session-provider'
import StyledComponentsRegistry from '@/lib/antd-registry'
import '@/styles/global.scss'

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
            <RootHeader />
            {children}
          </SessionProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
