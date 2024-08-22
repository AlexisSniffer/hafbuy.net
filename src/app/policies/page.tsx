'use client'

import SectionPage from '@/components/common/section-page'
import Container from '@/components/utils/container'
import RenderContent from '@/components/utils/render-content'
import { fetcher } from '@/utils/fetcher'
import { Col, ConfigProvider, Row, ThemeConfig } from 'antd'
import useSWR from 'swr'

const theme: ThemeConfig = {
  components: {},
}
const breadcrumbs = [{ title: 'Inicio', href: '/' }, { title: 'policies' }]

export default function Policies() {
  const { data: policies, error: errorPolicies } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/policies-page`,
    fetcher,
  )

  return (
    <ConfigProvider theme={theme}>
      <SectionPage title="Política de Privacidad" breadcrumbs={breadcrumbs} />
      <Container
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <Row>
          <Col xs={{ span: 24 }} md={{ span: 20, offset: 2 }}>
            <RenderContent content={policies?.data?.attributes?.terms} />
          </Col>
        </Row>
      </Container>
    </ConfigProvider>
  )
}
