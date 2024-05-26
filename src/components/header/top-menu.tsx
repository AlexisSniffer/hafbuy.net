import { ConfigProvider, Menu, MenuProps, ThemeConfig } from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const theme: ThemeConfig = {
  components: {
    Menu: {
      colorText: '#666',
      fontSize: 12,
      fontWeightStrong: 400,
      horizontalLineHeight: 1.5,
      itemHoverColor: '#262626',
      horizontalItemSelectedColor: 'none',
      colorBorderSecondary: '#fff',
      algorithm: true,
    },
  },
}

export default function TopMenu() {
  const { data: session, status } = useSession()
  return (
    <ConfigProvider theme={theme}>
      <Menu
        mode="horizontal"
        items={[
          {
            label:
              status === 'authenticated' ? (
                <Link href={`/profile`}>Mi Cuenta</Link>
              ) : (
                <Link href={'/auth/login'}>Iniciar Sesión</Link>
              ),
            key: status === 'authenticated' ? 'myAccount' : 'login',
          },
          {
            label: <Link href="/cart"> Carrito</Link>,
            key: 'cart',
          },
        ]}
        disabledOverflow={true}
      />
    </ConfigProvider>
  )
}
