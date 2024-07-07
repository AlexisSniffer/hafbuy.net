'use client'

import {
  DropboxOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { ThemeConfig } from 'antd'
import { Card, Col, Flex, Row, Typography } from 'antd'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

const theme: ThemeConfig = {
  components: {
    Card: {
      borderRadiusLG: 0,
    },
  },
}

const { Paragraph, Title } = Typography

const items = [
  {
    title: 'Ordenes',
    link: '/profile/orders',
    icon: <DropboxOutlined style={{ fontSize: '4rem', color: '#d3d3d4' }} />,
  },
  {
    title: 'Direcciones',
    link: '/profile/address',
    icon: (
      <EnvironmentOutlined style={{ fontSize: '4rem', color: '#d3d3d4' }} />
    ),
  },
  {
    title: 'Detalle de la Cuenta',
    link: '/profile/account-details',
    icon: <UserOutlined style={{ fontSize: '4rem', color: '#d3d3d4' }} />,
  },
  {
    title: 'Lista de Deseos',
    link: '/profile/orders',
    icon: <HeartOutlined style={{ fontSize: '4rem', color: '#d3d3d4' }} />,
  },
  {
    title: 'Cerrar Sesion',
    link: '/profile',
    onclick: () => {
      signOut()
    },
    icon: <LogoutOutlined style={{ fontSize: '4rem', color: '#d3d3d4' }} />,
  },
]

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <>
        <Row>
          <Col xs={24}>
            <Paragraph>
              Desde el panel de su cuenta puede ver sus{' '}
              <Link href="/profile/orders">pedidos recientes</Link>, administrar
              sus{' '}
              <Link href="/profile/orders">
                direcciones de envío y facturación
              </Link>{' '}
              y{' '}
              <Link href="/profile/account-details">
                editar su contraseña y los detalles de su cuenta.
              </Link>
            </Paragraph>
          </Col>
        </Row>
        <br />
        <br />
        <Row gutter={[10, 10]}>
          {items.map((item) => {
            return (
              <Col xs={12} md={8} key={item.title}>
                <Link
                  href={item.link}
                  onClick={item.onclick ? item.onclick : () => {}}
                >
                  <Card style={{ width: '100%' }}>
                    <Flex vertical justify="center" align="center" gap={20}>
                      {item.icon}
                      <Title level={5} style={{ textAlign: 'center' }}>
                        {item.title}
                      </Title>
                    </Flex>
                  </Card>
                </Link>
              </Col>
            )
          })}
        </Row>
        <br />
        <br />
        <br />
        <br />
      </>
    )
  }
}
