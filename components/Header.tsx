import {
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import { Button, Col, Dropdown, Menu, MenuProps, Row } from 'antd'
import Image from 'next/image'
import Container from './Container'
import MyAccount from './MyAccount'
import CartToggle from './CartToggle'
import SearchForm from './SearchForm'
import Social from './Social'
import MenuCategories from './MenuCategories'

const Header = () => {
  return (
    <header className="header">
      <Container>
        <Row className="header-top">
          <Col flex="auto"></Col>
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
            <Menu
              mode="horizontal"
              defaultSelectedKeys={['home']}
              className="header-menu "
            >
              <Menu.Item key="home" icon={<HomeOutlined />}>
                Inicio
              </Menu.Item>
              <Menu.Item key="shop" icon={<ShoppingOutlined />}>
                Tienda
              </Menu.Item>
            </Menu>
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
