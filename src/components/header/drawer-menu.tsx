'use client'

import {
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  MenuProps,
  ThemeConfig,
} from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const theme: ThemeConfig = {
  components: {
    Menu: {
      itemBorderRadius: 0,
    },
  },
}

const { Sider } = Layout

interface DrawerMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function DrawerMenu(props: DrawerMenuProps) {
  const { data: session, status } = useSession()

  return (
    <ConfigProvider theme={theme}>
      <Drawer
        placement="left"
        size="default"
        width={300}
        open={props.isOpen}
        onClose={props.onClose}
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Sider width={'100%'} theme="dark">
          <Menu
            style={{ height: '100%' }}
            items={[
              { key: 'home', label: <Link href="/">Inicio</Link> },
              { key: 'shop', label: <Link href="/shop">Tienda</Link> },
              {
                key: 'myAccount',
                label: (
                  <Link
                    href={
                      status === 'authenticated' ? '/profile' : '/auth/login'
                    }
                  >
                    {status === 'authenticated'
                      ? 'Mi Cuenta'
                      : 'Iniciar Sesion'}
                  </Link>
                ),
              },
            ]}
          />
        </Sider>
      </Drawer>
    </ConfigProvider>
  )
}
