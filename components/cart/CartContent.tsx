import { useSelector } from 'react-redux'
import { Col, Row, Card, Button, Divider, Space } from 'antd'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'
import ProductCart from '../products/ProductCart'
import { money } from '../../utils/formatters'
import styles from '../../styles/Cart.module.scss'

const CartContent = () => {
  const cart = useSelector((state: RootState) => state.cart)

  const subtotal = cart.products.reduce(
    (accumulator, current) =>
      accumulator + current.product.price * current.product.qty,
    0
  )
  const itbms = subtotal * 0.07
  const total = subtotal + itbms

  return (
    <>
      <Row gutter={32}>
        <Col span={16}>
          <Row>
            <Col span={12}>
              <h3 className={styles['title-col']}>Producto</h3>
            </Col>
            <Col span={4}>
              <h3 className={styles['title-col']}>Precio</h3>
            </Col>
            <Col span={4}>
              <h3 className={styles['title-col']}>Cantidad</h3>
            </Col>
            <Col span={4}>
              <h3 className={styles['title-col']}>Subtotal</h3>
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
        <Col span={8}>
          <Card title="Totales del carrito">
            <Space direction="vertical">
              <Row justify={'space-between'} align={'middle'}>
                <Col>
                  <h3 className={styles['subtotal-title']}>Subtotal</h3>
                </Col>
                <Col>
                  <span className={styles['subtotal-money']}>
                    {money.format(subtotal)}
                  </span>
                </Col>
              </Row>
              <Row justify={'space-between'} align={'middle'}>
                <Col>
                  <h3 className={styles['itbms-title']}>ITBMS</h3>
                </Col>
                <Col>
                  <span className={styles['itbms-money']}>
                    {money.format(itbms)}
                  </span>
                </Col>
              </Row>
            </Space>
            <Divider />
            <Space direction="vertical">
              <Row justify={'space-between'} align={'middle'}>
                <Col>
                  <h3 className={styles['total-title']}>Total</h3>
                </Col>
                <Col>
                  <span className={styles['total-money']}>
                    {money.format(total)}
                  </span>
                </Col>
              </Row>
              <Button type="primary" size="large" block>
                Pasar por la caja
              </Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CartContent
