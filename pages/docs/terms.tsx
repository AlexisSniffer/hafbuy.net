import { Col, Row } from 'antd'
import Container from '../../components/Container'

const Terms = () => {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <iframe
            style={{ width: '100%', height: '600px' }}
            src="http://hafbuy.net/terminosycondiciones.pdf"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Terms
