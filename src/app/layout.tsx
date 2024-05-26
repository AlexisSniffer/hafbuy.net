import RootHeader from '@/components/header/header'
import SessionProvider from '@/components/common/session-provider'
import StyledComponentsRegistry from '@/lib/antd-registry'
import '@/styles/global.scss'

export const metadata = {
  title: 'e-commerce',
  description: 'e-commerce with Next.js and Strapi',
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
