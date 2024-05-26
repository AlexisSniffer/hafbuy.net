import { DownOutlined } from '@ant-design/icons'
import {
  Button,
  ConfigProvider,
  Divider,
  Dropdown,
  Menu,
  MenuProps,
  Space,
  ThemeConfig,
} from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

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

const items: MenuProps['items'] = [
  {
    key: 0,
    label: <Link href="/profile">Perfil</Link>,
  },
  {
    key: 1,
    label: (
      <Link href="" onClick={() => signOut()}>
        Cerrar sesion
      </Link>
    ),
  },
]

export default function TopMenu() {
  const { data: session, status } = useSession()

  const handleChange = (value: string) => {}

  return (
    <ConfigProvider theme={theme}>
      <Menu
        mode="horizontal"
        items={[
          {
            label:
              status === 'authenticated' ? (
                <Dropdown menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      Mi Cuenta
                      <DownOutlined />
                    </Space>
                  </a>
                </Dropdown>
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
