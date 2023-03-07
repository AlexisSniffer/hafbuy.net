import { Layout, Col, Row, Divider, Typography, List } from 'antd'
import Link from 'next/link'

import styles from '../../styles/Footer.module.scss'
import Container from '../Container'

const { Footer } = Layout
const { Title } = Typography

const about = [
  {
    name: 'Términos y Condiciones',
    link: '/terms',
  },
]

const FooterHome = () => {
  return (
    <Footer>
      <Container>
        <Row>
          <Col>
            <Title level={5}>Nosotros</Title>
            <List
              size="small"
              dataSource={about}
              renderItem={(item: any) => (
                <List.Item>
                  <Link href={item.link}>{item.name}</Link>
                </List.Item>
              )}
            ></List>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col>
            <p className={styles['copyright']}>
              Hafbuy. © 2023. All Rights Reserved
            </p>
          </Col>
        </Row>
      </Container>
    </Footer>
  )
}

export default FooterHome
