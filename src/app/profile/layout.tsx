'use client'

import SectionPage from '@/components/common/section-page'
import Container from '@/components/utils/container'
import {
  Button,
  Col,
  ConfigProvider,
  List,
  Menu,
  Row,
  ThemeConfig,
  Typography,
} from 'antd'
import { signOut } from 'next-auth/react'
import Link from 'next/link'

const theme: ThemeConfig = {
  components: {},
}

const { Title } = Typography
const breadcrumbs = [{ title: 'Inicio', href: '/' }, { title: 'Mi Cuenta' }]
const items = [
  {
    key: 'title',
    label: <Title level={4}>Mi Cuenta</Title>,
    disabled: true,
  },
  {
    key: 'dashboard',
    label: <Link href="/profile">Panel</Link>,
  },
  {
    key: 'orders',
    label: <Link href="/profile/orders">Ordenes</Link>,
  },
  {
    key: 'addresses',
    label: <Link href="/profile/orders">Direcciones</Link>,
  },
  {
    key: 'accountDetails',
    label: <Link href="/profile/orders">Detalle de la Cuenta</Link>,
  },
  {
    key: 'whishlist',
    label: <Link href="/profile/orders">Lista de Deseos</Link>,
  },
  {
    key: 'logout',
    label: (
      <Link href={'#'} onClick={() => signOut()}>
        Cerrar Sesion
      </Link>
    ),
  },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <SectionPage title="Mi Cuenta" breadcrumbs={breadcrumbs} />
      <br />
      <br />
      <Container>
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={6}>
            <Menu style={{ width: '100%' }} mode="vertical" items={items} />
          </Col>
          <Col xs={24} lg={18}>
            {children}
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
