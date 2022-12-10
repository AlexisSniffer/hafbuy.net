import { useSelector } from 'react-redux'
import { Col, Row, Card, Alert } from 'antd'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'
import ProductCart from '../products/ProductCart'

const CartContent = () => {
  const cart = useSelector((state: RootState) => state.cart)

  return (
    <>
      <Row gutter={32}>
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
            return <ProductCart product={product.product} />
          })}
        </Col>
        <Col span={6}>
          <Card title="Totales del carrito">
            <h3>
              Subtotal: <span>$1000.00</span>
            </h3>
            <h3>
              Subtotal: <span>$2000.00</span>
            </h3>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartContent
