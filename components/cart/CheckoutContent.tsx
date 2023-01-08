import { useSelector, useDispatch } from 'react-redux'
import {
  Alert,
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
import { setStep, setOrder, cleanProducts } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/Cart.module.scss'
import { money } from '../../utils/formatters'

const { TextArea } = Input

type ResponseProducts = {
  data: {
    id: number
    attributes: {
      price: number
      qty: number
      createdAt: Date
      updatedAt: Date
    }
  }
}

const CheckoutContent = () => {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const subtotal = cart.products.reduce(
    (accumulator, current) =>
      accumulator + current.product.price * current.product.qty,
    0
  )
  const itbms = subtotal * 0.07
  const total = subtotal + itbms

  const saveOrderBilling = async (values: any) => {
    const fetchPostOrderBilling = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders-billings`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            name: values.name,
            lastname: values.lastname,
            adress: values.adress,
            phone: values.phone,
            email: values.email,
          },
        }),
      }
    )

    return await fetchPostOrderBilling.json()
  }

  const saveOrderProducts = async () => {
    return await Promise.all(
      cart.products.map(async (product) => {
        const fetchPostOrderProducts = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders-products`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              data: {
                price: product.product.price,
                qty: product.product.qty,
                product: product.product.id,
              },
            }),
          }
        )

        return await fetchPostOrderProducts.json()
      })
    )
  }

  const saveOrder = async (billing: any, products: any) => {
    const fetchPostOrder = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            order: `order-${Date.now()}`,
            status: 'pending',
            date: new Date(Date.now()).toISOString(),
            orders_billing: billing.data.id,
            orders_products: products.map((product: any) => product.data.id),
          },
        }),
      }
    )

    return await fetchPostOrder.json()
  }

  const onFinish = async (values: any) => {
    const responseOrderBilling = await saveOrderBilling(values)
    const responseOrderProducts = await saveOrderProducts()

    console.log(responseOrderProducts)

    const responseOrder = await saveOrder(
      responseOrderBilling,
      responseOrderProducts
    )

    if (responseOrder.error) {
      // TODO: eliminar billing y products añadidos
      // TODO: mostrar notificacion de error
    }

    dispatch(cleanProducts())
    dispatch(setStep(2))
    dispatch(setOrder(responseOrder.data.id))
  }

  return (
    <>
      {cart.products.length > 0 ? (
        <Row gutter={32}>
          <Col span={16}>
            <h2>Detalles de facturación</h2>
            <Form
              form={form}
              name="cheackoutForm"
              layout="vertical"
              onFinish={onFinish}
              initialValues={{
                ['name']: '',
                ['lastname']: '',
                ['adress']: '',
                ['phone']: '',
                ['email']: '',
              }}
            >
              <Form.Item label="Nombre" style={{ marginBottom: 0 }} required>
                <Form.Item
                  name="name"
                  rules={[
                    { required: true, message: 'El nombre es requerido' },
                  ]}
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
                name="adress"
                label="Dirección"
                rules={[
                  { required: true, message: 'La dirección es requerida' },
                ]}
              >
                <TextArea size="middle" placeholder="Ingrese su dirección" />
              </Form.Item>
              <Form.Item
                name="phone"
                label="Teléfono"
                rules={[
                  { required: true, message: 'El teléfono es requerido' },
                ]}
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
                          {`${product.product.name} x ${product.product.qty}`}
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
      ) : (
        <Alert
          showIcon
          type="warning"
          description={`No hay productos agregados al carrito.`}
        ></Alert>
      )}
    </>
  )
}

export default CheckoutContent
