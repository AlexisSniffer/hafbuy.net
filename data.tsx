import { HomeOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'
import Link from 'next/link'

export const depart = [
  {
    slug: 'fashion',
    title: 'Moda',
    categories: [
      {
        slug: 'fashion-1',
        title: 'Hombre',
        categories: [
          {
            slug: 'fashion-1-1',
            title: 'Moda 1-1',
          },
          {
            slug: 'fashion-1-2',
            title: 'Moda 1-2',
          },
        ],
      },
      {
        slug: 'fashion-2',
        title: 'Mujer',
        categories: [
          {
            slug: 'fashion-2-1',
            title: 'Moda 2-1',
          },
          {
            slug: 'fashion-2-2',
            title: 'Moda 2-2',
          },
        ],
      },
    ],
  },
  {
    slug: 'electronic',
    title: 'Electrónica',
    categories: [
      {
        slug: 'electronic-1',
        title: 'Electrónica 1',
        categories: [
          {
            slug: 'electronic-1-1',
            title: 'Electrónica 1-1',
          },
          {
            slug: 'electronic-1-2',
            title: 'Electrónica 1-2',
          },
        ],
      },
      {
        slug: 'electronic-2',
        title: 'Electrónica 2',
        categories: [
          {
            slug: 'electronic-2-1',
            title: 'Electrónica 2-1',
          },
          {
            slug: 'electronic-2-2',
            title: 'Electrónica 2-2',
          },
        ],
      },
    ],
  },
]

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
    label: <Link href="/"> Carrito</Link>,
    key: 'car',
  },
  {
    label: <Link href="/login">Iniciar Sesiòn</Link>,
    key: 'shop',
  },
]
