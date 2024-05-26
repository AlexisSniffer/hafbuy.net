'use client'

import SectionPage from '@/components/common/section-page'
import Container from '@/components/utils/container'
import type { ThemeConfig } from 'antd'
import { Button, Col, ConfigProvider, Row } from 'antd'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'

const theme: ThemeConfig = {
  components: {},
}
const breadcrumbs = [{ title: 'Inicio', href: '/' }, { title: 'Mi Cuenta' }]

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === 'authenticated') {
    return (
      <ConfigProvider theme={theme}>
        <SectionPage title="Mi Cuenta" breadcrumbs={breadcrumbs} />
        <Container>
          <Row>
            <Col xs={24}>
              <br />
              <Button onClick={() => signOut()}>Cerrar sesion</Button>
            </Col>
          </Row>
        </Container>
      </ConfigProvider>
    )
  }
}
