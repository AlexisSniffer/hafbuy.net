import Image from 'next/image'
import { Layout, Col, Row, Affix } from 'antd'
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons'

import Container from '../Container'
import MyAccount from './MyAccount'
import CartDrawer from './CartDrawer'
import SearchForm from './SearchForm'
import Social from '../Social'
import MenuCategories from './MenuDepartment'
import { MenuPages, MenuOthers } from './HeaderMenu'
import Link from 'next/link'

import styles from '../../styles/Header.module.scss'

const { Header } = Layout

const HeaderHome = () => {
  return (
    <Header className={styles.header}>
      <Container>
        <Row justify={'end'} align={'middle'} className={styles['header-top']}>
          <Col>
            <MenuOthers />
          </Col>
          <Col>
            <Social type="header" />
          </Col>
        </Row>
        <Row align={'middle'} className={styles['header-middle']}>
          <Col>
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={50}
                priority={true}
                className={styles.logo}
              />
            </Link>
          </Col>
          <Col flex="auto">
            <SearchForm />
          </Col>
          <Col>
            <MyAccount />
          </Col>
          <Col>
            <CartDrawer />
          </Col>
        </Row>
        <Row align={'middle'} className={styles['header-bottom']}>
          <Col>
            <MenuCategories />
          </Col>
          <Col flex="auto">
            <MenuPages />
          </Col>
          <Col>
            <div className={styles['header-contact']}>
              <Link
                href={`tel:6523-9438}`}
                className={styles['header-contact-info']}
              >
                <PhoneOutlined
                  className={styles['header-contact-info-icon']}
                  rev={undefined}
                />
                <span>6523-9438</span>
              </Link>

              <Link
                href={`https://wa.me/62505218`}
                className={styles['header-contact-info']}
              >
                <WhatsAppOutlined
                  className={styles['header-contact-info-icon']}
                  rev={undefined}
                />
                <span>6250-5218</span>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </Header>
  )
}

export default HeaderHome
