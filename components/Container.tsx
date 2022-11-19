import { Col, Row } from 'antd'

export default function Container({ children }: any) {
  return (
    <Row>
      <Col flex={1}>A</Col>
      <Col flex={10}>{children}</Col>
      <Col flex={1}>A</Col>
    </Row>
  )
}
