import Image from 'next/image'
import { Col, Row } from 'antd'
import { PhoneOutlined, WhatsAppOutlined } from '@ant-design/icons'

import Container from '../Container'
import MyAccount from './MyAccount'
import CartToggle from './CartToggle'
import SearchForm from './SearchForm'
import Social from '../Social'
import MenuCategories from './MenuDepartment'
import { MenuPages, MenuOthers } from './HeaderMenu'

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row align={'middle'} className="header-top">
          <Col flex="auto"></Col>
          <Col>
            <MenuOthers />
          </Col>
          <Col>
            <Social type="header" />
          </Col>
        </Row>

        <Row align={'middle'} className="header-middle">
          <Col>
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={50}
              className="logo"
            />
          </Col>
          <Col flex="auto">
            <SearchForm />
          </Col>
          <Col>
            <MyAccount />
          </Col>
          <Col>
            <CartToggle />
          </Col>
        </Row>

        <Row align={'middle'} className="header-bottom">
          <Col>
            <MenuCategories />
          </Col>
          <Col flex="auto">
            <MenuPages />
          </Col>
          <Col>
            <div className="header-contact">
              <span>
                <PhoneOutlined />
                6250-5218
              </span>
              <span>
                <WhatsAppOutlined />
                6523-9438
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
