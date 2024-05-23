'use client'

import SectionPage from '@/components/common/section-page'
import Container from '@/components/utils/container'
import { Col, ConfigProvider, Row, ThemeConfig } from 'antd'

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
      <Container>
        <Row>
          <Col>
           
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
