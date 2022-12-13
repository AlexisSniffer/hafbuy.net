import { useSelector } from 'react-redux'
import { Button, Card, Col, Divider, Form, Input, Row, Space } from 'antd'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/Cart.module.scss'
import { money } from '../../utils/formatters'
import { InfoCircleOutlined } from '@ant-design/icons'

const CheckoutContent = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const [form] = Form.useForm()

  const subtotal = cart.products.reduce(
    (accumulator, current) =>
      accumulator + current.product.price * current.product.qty,
    0
  )
  const itbms = subtotal * 0.07
  const total = subtotal + itbms

  const onFinish = (values: any) => {
    const { filter, category } = values
  }

  return (
    <>
      <Row gutter={32}>
        <Col span={16}>
          <Form form={form} name="cheackoutForm" onFinish={onFinish}>
            <Form.Item label="Address">
              <Input.Group compact>
                <Form.Item
                  name={['address', 'province']}
                  noStyle
                  rules={[{ required: true, message: 'Province is required' }]}
                >
                  <Input></Input>
                </Form.Item>
                <Form.Item
                  name={['address', 'street']}
                  noStyle
                  rules={[{ required: true, message: 'Street is required' }]}
                >
                  <Input style={{ width: '50%' }} placeholder="Input street" />
                </Form.Item>
              </Input.Group>
            </Form.Item>
          </Form>
        </Col>
        <Col span={8}>
          <Card title="Su pedido">
            <Space direction="vertical">
              {cart.products.map((product: ProductCartType) => {
                return (
                  <Row
                    key={product.product.slug}
                    justify={'space-between'}
                    align={'middle'}
                  >
                    <Col>
                      <h3 className={styles['product-title']}>
                        {`${product.product.name} x ${product.product.qty}`}
                      </h3>
                    </Col>
                    <Col>
                      <span className={styles['subtotal-money']}>
                        {money.format(product.product.qty)}
                      </span>
                    </Col>
                  </Row>
                )
              })}
              <Row
                justify={'space-between'}
                align={'middle'}
                style={{ marginTop: '2rem' }}
              >
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
            </Space>
            <Divider />
            <h3 className={styles['order-title']}>Métodos de pago</h3>
            <p>
              <InfoCircleOutlined /> Lo sentimos, parece que no hay métodos de
              pago disponibles para su estado. Comuníquese con nosotros si
              necesita ayuda o desea hacer arreglos alternativos..
            </p>
            <Button type="primary" size="large" block>
              Realizar pedido
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CheckoutContent
