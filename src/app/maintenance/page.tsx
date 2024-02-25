'use client'

import Container from '@/components/utils/container'
import { Col, Result, Row } from 'antd'

export default function Maintenance() {
  return (
    <Container
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Row>
        <Col xs={24}>
          <Result
            status="warning"
            title="Sitio web en mantenimiento, volveremos pronto."
          />
        </Col>
      </Row>
    </Container>
  )
}
