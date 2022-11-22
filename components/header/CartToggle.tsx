import { useState } from 'react'
import { ShoppingOutlined } from '@ant-design/icons'
import { Badge, Drawer, Button, Row, Col, Space, Divider } from 'antd'
import ProductDrawer from './../products/ProductDrawer'
import Link from 'next/link'

const CartToggle = () => {
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Badge count={5}>
        <Button icon={<ShoppingOutlined />} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Carrito de Compra"
        placement="right"
        size="default"
        closable={false}
        onClose={onClose}
        open={open}
        className="drawer-car"
      >
        <Row>
          <Col span={24}>
            <div className="drawer-car-products">
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
              <ProductDrawer />
            </div>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <div className="drawer-car-invoice">
              <Row justify="space-between">
                <Col>
                  <h3>
                    <b>TOTAL:</b>
                  </h3>
                </Col>
                <Col>
                  <h3>
                    <b>$900.00</b>
                  </h3>
                </Col>
              </Row>
            </div>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Link href="/cart">
                <Button type="default" size="large" block onClick={onClose}>
                  Ver Carrito
                </Button>
              </Link>

              <Button type="primary" size="large" block>
                Pagar
              </Button>
            </Space>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default CartToggle
