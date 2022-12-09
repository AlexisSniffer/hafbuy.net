import { useState } from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { Badge, Drawer, Button, Row, Col, Space } from 'antd'
import { ShoppingOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { ProductCartType } from './../../store/types/ProductType'
import ProductDrawer from './../products/ProductDrawer'

const CartToggle = () => {
  const [open, setOpen] = useState(false)
  const cart = useSelector((state: RootState) => state.cart)

  const showDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <Badge count={cart.qty}>
        <Button icon={<ShoppingOutlined />} onClick={showDrawer} />
      </Badge>
      <Drawer
        title="Carrito de Compra"
        placement="right"
        size="default"
        closable={false}
        onClose={showDrawer}
        open={open}
        className="drawer-car"
      >
        <Row>
          <Col span={24}>
            {cart.products.map((product: ProductCartType) => {
              return (
                <ProductDrawer
                  key={product.product.slug}
                  product={product.product}
                />
              )
            })}
          </Col>
        </Row>
        <br />
        <Row>
          <Col span={24}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Row justify="space-between">
                <Col>
                  <b>SUBTOTAL:</b>
                </Col>
                <Col>
                  <b>$900.00</b>
                </Col>
              </Row>
              <Link href="/cart">
                <Button type="default" size="large" block onClick={showDrawer}>
                  Ver Carrito
                </Button>
              </Link>
              <Link href="/checkout">
                <Button type="primary" size="large" block onClick={showDrawer}>
                  Pagar
                </Button>
              </Link>
            </Space>
          </Col>
        </Row>
      </Drawer>
    </>
  )
}

export default CartToggle
