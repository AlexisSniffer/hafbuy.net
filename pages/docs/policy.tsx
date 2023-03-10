import { Col, Row } from 'antd'
import Container from '../../components/Container'

const Policy = () => {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <iframe
            style={{ width: '100%', height: '600px' }}
            src="http://hafbuy.net/politicayprivacidad.pdf"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Policy
