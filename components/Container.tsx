import { Col, Row } from 'antd'

export default function Container({ children }: any) {
  return (
    <Row>
      <Col flex={1}></Col>
      <Col flex={5}>{children}</Col>
      <Col flex={1}></Col>
    </Row>
  )
}
