import { Layout, Col, Row, Affix } from 'antd'

import styles from '../../styles/Footer.module.scss'
import Container from '../Container'

const { Footer } = Layout

const FooterHome = () => {
  return (
    <Footer>
      <Container>
        <p className={styles['copyright']}>
          Hafbuy. © 2023. All Rights Reserved
        </p>
      </Container>
    </Footer>
  )
}

export default FooterHome
