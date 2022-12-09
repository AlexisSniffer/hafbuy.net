import { useSelector } from 'react-redux'
import { Col, Row, Card, Alert } from 'antd'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'

const CartContent = () => {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Row>
        <Col span={18}>
          <Row>
            <Col span={12}>
              <h3>Producto</h3>
            </Col>
            <Col span={4}>
              <h3>Precio</h3>
            </Col>
            <Col span={4}>
              <h3>Cantidad</h3>
            </Col>
            <Col span={4}>
              <h3>Subtotal</h3>
            </Col>
          </Row>
          {cart.products.map((product: ProductCartType) => {
            return (
              <Row>
                <Col span={12}>A</Col>
                <Col span={4}>B</Col>
                <Col span={4}>C</Col>
                <Col span={4}>D</Col>
              </Row>
            )
          })}
        </Col>
        <Col span={6}>
          <Card title="Totales del carrito">
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartContent
