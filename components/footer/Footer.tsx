import { Layout, Col, Row, Divider, Typography, List } from 'antd'
import Link from 'next/link'

import styles from '../../styles/Footer.module.scss'
import Container from '../Container'
import Social from '../Social'

const { Footer } = Layout
const { Title } = Typography

const about = [
  {
    name: 'Términos y Condiciones',
    link: '/docs/terms',
  },
  {
    name: 'Política y Privacidad',
    link: '/docs/policy',
  },
  {
    name: 'Tarifas',
    link: '/docs/rates',
  },
]

const FooterHome = () => {
  return (
    <Footer>
      <Container>
        <Row justify={'space-between'}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5}>Nosotros</Title>
            <List
              size="small"
              dataSource={about}
              renderItem={(item: any) => (
                <List.Item>
                  <Link style={{ color: '#222529' }} href={item.link}>
                    {item.name}
                  </Link>
                </List.Item>
              )}
            ></List>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Title level={5}>Redes Sociales</Title>
            <Social size="large" />
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
