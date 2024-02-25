import RootHeader from '@/components/header/header'
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
          <RootHeader />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
