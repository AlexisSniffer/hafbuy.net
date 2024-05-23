'use client'

import SectionPage from '@/components/common/section-page'
import Container from '@/components/utils/container'
import { Col, ConfigProvider, Row, ThemeConfig } from 'antd'
import LoginForm from '../components/login-form'

const theme: ThemeConfig = {
  components: {
    Steps: {},
  },
}

const breadcrumbs = [{ title: 'Inicio', href: '/' }, { title: 'Mi Cuenta' }]

export default function Login() {
  return (
    <ConfigProvider theme={theme}>
      <SectionPage title="Mi Cuenta" breadcrumbs={breadcrumbs} />
      <Container
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 12, offset: 6 }}>
            <LoginForm />
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
