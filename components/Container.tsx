import { Col, Row } from 'antd'

const Container = ({ children }: any) => {
  return (
    <Row>
      <Col xs={1} lg={2}></Col>
      <Col xs={22} lg={20}>
        {children}
      </Col>
      <Col xs={1} lg={2}></Col>
    </Row>
  )
}

export default Container
