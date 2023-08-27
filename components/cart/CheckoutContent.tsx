import { InfoCircleOutlined, UploadOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Upload,
  message,
} from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useSWR from 'swr'
import type { RootState } from '../../store'
import { cleanProducts, setOrder, setStep } from '../../store/shoppingCartSlice'
import { ProductCartType } from '../../store/types/ProductType'
import styles from '../../styles/Cart.module.scss'
import { money } from '../../utils/formatters'

const { TextArea } = Input
const fetcher = (url: string) => fetch(url).then((res) => res.json())

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
  const [loading, setLoading] = useState<boolean>(false)
  const [selectPaymentMethods, setSelectPaymentMethods] = useState<number>(0)
  const [voucher, setVoucher] = useState<boolean>(false)

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`,
    fetcher
  )

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
                detail: product.product.detail,
              },
            }),
          }
        )

        return await fetchPostOrderProducts.json()
      })
    )
  }

  const saveOrderPayment = async (values: any) => {
    const formData = new FormData()
    formData.append('files', values.voucher.file.originFileObj)

    const fetchUpload = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
      {
        method: 'POST',
        body: formData,
      }
    )

    const responseUpload = await fetchUpload.json()

    const fetchPostOrderPayment = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders-payments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            voucher: responseUpload[0].id,
            payment_method: values.paymentMethod,
          },
        }),
      }
    )

    return fetchPostOrderPayment.json()
  }

  const saveOrder = async (billing: any, products: any, payment: any) => {
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
            orders_payment: payment.data.id,
          },
        }),
      }
    )

    return await fetchPostOrder.json()
  }

  const onFinish = async (values: any) => {
    setLoading(true)
    const responseOrderBilling = await saveOrderBilling(values)
    const responseOrderProducts = await saveOrderProducts()
    const responseOrderPayment = await saveOrderPayment(values)

    const responseOrder = await saveOrder(
      responseOrderBilling,
      responseOrderProducts,
      responseOrderPayment
    )

    if (responseOrder.error) {
      // TODO: eliminar billing y products añadidos
      // TODO: mostrar notificacion de error
      return
    }

    dispatch(cleanProducts())
    dispatch(setStep(2))
    dispatch(setOrder(responseOrder.data.attributes.order))
    setLoading(false)
  }

  const onChangePaymentMethods = ({ target: { value } }: RadioChangeEvent) => {
    setSelectPaymentMethods(value.id)
    setVoucher(value.attributes.voucher)
  }

  return (
    <>
      {cart.products.length > 0 ? (
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
            ['paymentMethod']: null,
            ['voucher']: null,
          }}
        >
          <Row gutter={32}>
            <Col span={16}>
              <h2>Detalles de facturación</h2>
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
                {data?.data.length > 0 ? (
                  <>
                    <Form.Item
                      name="paymentMethod"
                      rules={[
                        {
                          required: true,
                          message: 'Seleccione el método de pago',
                        },
                      ]}
                    >
                      <Radio.Group onChange={onChangePaymentMethods}>
                        <Space direction="vertical">
                          {data?.data.map((paymentMethod: any) => {
                            return (
                              <Radio
                                key={paymentMethod.id}
                                value={paymentMethod}
                              >
                                {paymentMethod.attributes.name}
                                <br />
                                {selectPaymentMethods == paymentMethod.id ? (
                                  <i style={{ color: 'GrayText' }}>
                                    {paymentMethod.attributes.description}
                                  </i>
                                ) : null}
                              </Radio>
                            )
                          })}
                        </Space>
                      </Radio.Group>
                    </Form.Item>
                    {voucher ? (
                      <Form.Item
                        name="voucher"
                        rules={[
                          {
                            required: voucher,
                            message: 'Adjunte el comprobante',
                          },
                        ]}
                      >
                        <Upload
                          maxCount={1}
                          accept="image/png, image/jpeg"
                          beforeUpload={(file: any) => {
                            const isImage =
                              file.type === 'image/png' ||
                              file.type === 'image/jpeg'

                            if (!isImage) {
                              message.error(`${file.name} no es una imagen`)
                            }

                            return isImage || Upload.LIST_IGNORE
                          }}
                        >
                          <Button icon={<UploadOutlined rev={undefined} />}>
                            Subir comprobante
                          </Button>
                        </Upload>
                      </Form.Item>
                    ) : null}
                  </>
                ) : (
                  <p>
                    <InfoCircleOutlined rev={undefined} /> Lo sentimos, parece
                    que no hay métodos de pago disponibles para su estado.
                    Comuníquese con nosotros si necesita ayuda o desea hacer
                    arreglos alternativos.
                  </p>
                )}
                <Button
                  type="primary"
                  size="large"
                  block
                  loading={loading}
                  onClick={form.submit}
                >
                  Realizar pedido
                </Button>
              </Card>
            </Col>
          </Row>
        </Form>
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
