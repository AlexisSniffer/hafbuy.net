import {
  HomeOutlined,
  MailOutlined,
  MenuOutlined,
  PhoneOutlined,
  ShoppingOutlined,
  WhatsAppOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  MenuProps,
  Row,
  Space,
} from 'antd'
import Image from 'next/image'
import Container from './Container'
import MyAccount from './MyAccount'
import CartToggle from './CartToggle'

const { Search } = Input

const items: MenuProps['items'] = [
  {
    key: '0',
    label: (
      <div>
        <MenuOutlined /> <a href="/shop=?category='moda'">Moda</a>
      </div>
    ),
  },
  {
    key: '1',
    label: (
      <div>
        <MenuOutlined /> <a href="/shop=?category='electronica'">Electrónica</a>
      </div>
    ),
  },
  {
    key: '2',
    label: (
      <div>
        <MenuOutlined /> <a href="/shop=?category='juegos'">Juegos</a>
      </div>
    ),
  },
]

export default function Header() {
  return (
    <header className="header">
      <Container>
        <Row>
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
            <Form
              name="searchForm"
              labelCol={{ span: 8 }}
              className="search-form"
            >
              <Form.Item name="search">
                <Search size="large" placeholder="Buscar..." enterButton />
              </Form.Item>
            </Form>
          </Col>
          <Col>
            <MyAccount />
          </Col>
          <Col>
            <CartToggle />
          </Col>
        </Row>

        <Row align="middle">
          <Col>
            <Dropdown
              menu={{ items }}
              placement="bottom"
              arrow
              trigger={['click']}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Button type="primary" icon={<MenuOutlined />} size={'large'}>
                  CATEGORIAS
                </Button>
              </a>
            </Dropdown>
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
