import { useSelector } from 'react-redux'
import {
  Badge,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
} from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'

import type { RootState } from '../../store'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/Cart.module.scss'
import { money } from '../../utils/formatters'

const { TextArea } = Input

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
    //

    console.log(values)
  }

  return (
    <>
      <Row gutter={32}>
        <Col span={16}>
          <h2>Detalles de facturación</h2>
          <Form
            form={form}
            name="cheackoutForm"
            layout="vertical"
            onFinish={onFinish}
          >
            <Form.Item
              label="Nombre"
              style={{ marginBottom: 0 }}
              rules={[{ required: true }]}
            >
              <Form.Item
                name="name"
                rules={[{ required: true, message: 'El nombre es requerido' }]}
                style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              >
                <Input placeholder="Ingrese su nombre" />
              </Form.Item>
              <Form.Item
                name="lastname"
                rules={[
                  { required: true, message: 'El apellido es requerido' },
                ]}
                style={{
                  display: 'inline-block',
                  width: 'calc(50% - 8px)',
                  margin: '0 8px',
                }}
              >
                <Input placeholder="Ingrese su apellido" />
              </Form.Item>
            </Form.Item>
            <Form.Item
              name="direction"
              label="Dirección"
              rules={[{ required: true, message: 'La dirección es requerida' }]}
            >
              <TextArea size="middle" placeholder="Ingrese su dirección" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Teléfono"
              rules={[{ required: true, message: 'El teléfono es requerido' }]}
            >
              <Input placeholder="Ingrese su teléfono" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo Electrónico"
              rules={[
                {
                  required: true,
                  message: 'El correo electrónico es requerido',
                },
              ]}
            >
              <Input placeholder="Ingrese su correo electrónico" />
            </Form.Item>
            <Form.Item name="notes" label="Notas del pedido (opcional)">
              <TextArea size="middle" placeholder="Notas sobre tu pedido" />
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
                        {`${product.product.name}  ${product.product.qty}`}
                      </h3>
                    </Col>
                    <Col>
                      <span className={styles['subtotal-money']}>
                        {money.format(product.product.price)}
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
              necesita ayuda o desea hacer arreglos alternativos.
            </p>
            <Button type="primary" size="large" block onClick={form.submit}>
              Realizar pedido
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default CheckoutContent
