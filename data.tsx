import { HomeOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'

export const menuPages: MenuProps['items'] = [
  {
    label: <Link href="/">Inicio</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link href="/shop">Tienda</Link>,
    key: 'shop',
    icon: <ShoppingOutlined />,
  },
]

export const menuOthers: MenuProps['items'] = [
  {
    label: <Link href="/">Mi Cuenta</Link>,
    key: 'account',
  },
  {
    label: <Link href="/cart"> Carrito</Link>,
    key: 'car',
  },
  {
    label: <Link href="/login">Iniciar Sesión</Link>,
    key: 'shop',
  },
]
