import { useSelector } from 'react-redux'
import { Col, Row, Card, Alert } from 'antd'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'
import ProductCart from '../products/ProductCart'
import { money } from '../../utils/formatters'

const CartContent = () => {
  const cart = useSelector((state: RootState) => state.cart)

  const subtotal = cart.products.reduce(
    (accumulator, current) =>
      accumulator + current.product.price * current.product.qty,
    0
  )

  let itbms = subtotal * 0.07

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
            return (
              <ProductCart
                key={product.product.slug}
                product={product.product}
              />
            )
          })}
        </Col>
        <Col span={6}>
          <Card title="Totales del carrito">
            <h3>
              Subtotal: <span>{money.format(subtotal)}</span>
            </h3>
            <h3>
              ITBMS: <span>{money.format(itbms)}</span>
            </h3>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartContent
