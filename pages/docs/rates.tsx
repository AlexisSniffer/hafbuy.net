import { Col, Row, Typography } from 'antd'
import Container from '../../components/Container'

const Rates = () => {
  return (
    <Container>
      <Row>
        <Col span={24}>
          <iframe
            style={{ width: '100%', height: '600px' }}
            src="http://hafbuy.net/tarifas.pdf"
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Rates
