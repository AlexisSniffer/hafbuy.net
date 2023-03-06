import { Layout, Col, Row, Affix } from 'antd'

import styles from '../../styles/Header.module.scss'
import Container from '../Container'

const { Footer } = Layout

const FooterHome = () => {
  return (
    <Footer>
      <Container>Hafbuy. © 2023. All Rights Reserved</Container>
    </Footer>
  )
}

export default FooterHome
