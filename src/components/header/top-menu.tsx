import { ConfigProvider, Menu, MenuProps, ThemeConfig } from 'antd'
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

const items: MenuProps['items'] = [
  {
    label: <Link href="/profile/username">Mi Cuenta</Link>,
    key: 'myAccount',
  },
  {
    label: <Link href="/cart"> Carrito</Link>,
    key: 'cart',
  },

  {
    label: <Link href="/login">Iniciar Sesión</Link>,
    key: 'login',
  },
]

export default function TopMenu() {
  return (
    <ConfigProvider theme={theme}>
      <Menu mode="horizontal" items={items} disabledOverflow={true} />
    </ConfigProvider>
  )
}
