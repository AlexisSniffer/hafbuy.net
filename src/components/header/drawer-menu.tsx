'use client'

import useFilterStore from '@/store/filterStore'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import {
  ConfigProvider,
  Drawer,
  Layout,
  Menu,
  ThemeConfig,
  Typography,
} from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'

const theme: ThemeConfig = {
  components: {
    Menu: {
      itemBorderRadius: 0,
    },
  },
}

const { Sider } = Layout
const { Text } = Typography

interface DrawerMenuProps {
  isOpen: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  onClose: () => void
  categories: Payload<Category[] | undefined>
}

export default function DrawerMenu(props: DrawerMenuProps) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { setFilter, setCategories } = useFilterStore()

  if (!props.categories) return null

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
            mode="inline"
            style={{ height: '100%' }}
            items={[
              { key: 'home', label: <Link href="/">Inicio</Link> },
              { key: 'shop', label: <Link href="/shop">Tienda</Link> },
              {
                key: 'categories',
                label: 'Departamentos',
                children: props.categories.data?.map((category: Category) => {
                  return {
                    key: category.id + Math.floor(Math.random() * 1000) + 1,
                    label: category.attributes.name,
                    children: category.attributes.categories.data?.map(
                      (category2: Category) => {
                        return {
                          key:
                            category2.id + Math.floor(Math.random() * 1000) + 1,
                          label: category2.attributes.name,
                          children: category2.attributes.categories.data.map(
                            (category3: Category) => {
                              return {
                                key:
                                  category3.id +
                                  Math.floor(Math.random() * 1000) +
                                  1,
                                label: (
                                  <Text
                                    key={category3.id}
                                    onClick={() => {
                                      setFilter('')
                                      setCategories([category3.attributes.slug])
                                      props.setOpen(false)
                                      router.push('/shop')
                                    }}
                                  >
                                    {category3.attributes.name}
                                  </Text>
                                ),
                              }
                            },
                          ),
                        }
                      },
                    ),
                  }
                }),
              },
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
