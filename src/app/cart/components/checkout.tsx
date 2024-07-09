'use client'

import { qsAddress } from '@/queries/address'
import useCartStore from '@/store/cartStore'
import styles2 from '@/styles/cart.module.scss'
import styles from '@/styles/product.module.scss'
import { Address } from '@/types/address'
import { Payload } from '@/types/payload'
import { PaymentMethod } from '@/types/payment-method'
import { ProductCart } from '@/types/product'
import { getBase64 } from '@/utils/base64'
import { fetcher, fetcherToken } from '@/utils/fetcher'
import { money } from '@/utils/formatters'
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {
  Alert,
  Button,
  Card,
  Carousel,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Result,
  Row,
  Space,
  ThemeConfig,
  Typography,
  Upload,
  UploadFile,
  message,
  notification,
} from 'antd'
import { CarouselRef } from 'antd/es/carousel'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import useSWR from 'swr'

const { Text } = Typography

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Input: {
      borderRadius: 0,
    },
  },
}

const { TextArea } = Input

export default function Checkout() {
  const { data: session, status } = useSession()
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const [loading, setLoading] = useState<boolean>(false)
  const [recaptcha, setRecaptcha] = useState<boolean>(true)
  const [isUploadVoucher, setIsUploadVoucher] = useState<boolean>(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [address, setAddress] = useState<Address | null>(null)
  const cartStore = useCartStore((state) => state.cart)
  const subtotalStore = useCartStore((state) => state.subtotal)
  const { setStep, setOrder } = useCartStore()
  const [value, setValue] = useState(1)
  const carouselRef = useRef<CarouselRef>(null)

  const requiredMessage = 'Campo requerido'

  const responsive = [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 9999,
      settings: {
        slidesToShow: 3,
      },
    },
  ]

  const { data: paymentMethods, error: errorPaymentMethods } = useSWR<
    Payload<PaymentMethod[]>
  >(`${process.env.NEXT_PUBLIC_API_URL}/api/payment-methods`, fetcher)

  const { data: addresses } = useSWR(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/api/addresses?${qsAddress({
        user: session?.user.id,
        pagination: { page: 1, pageSize: 10 },
      })}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token),
  )

  if (!cartStore.length) {
    return (
      <ConfigProvider theme={theme}>
        <Alert
          style={{ width: 'auto' }}
          message="El pago no está disponible mientras su carrito esté vacío."
          type="info"
          showIcon
        />
        <Result
          icon={<ShoppingCartOutlined />}
          subTitle="No se agregaron productos al carrito "
          extra={
            <Button type="primary" size="large">
              <Link href={'/shop'}>IR A COMPRAR</Link>
            </Button>
          }
        />
      </ConfigProvider>
    )
  }

  const Variation = ({ value, className }: any) => (
    <span style={{ backgroundColor: value }} className={styles['color']}>
      {className == 'color' ? '' : value}
    </span>
  )

  const onFinish = async (values: any) => {
    setLoading(true)

    let responseUpload
    if (values.voucher) {
      const formData = new FormData()
      formData.append('files', values.voucher.file.originFileObj)

      const fetchUpload = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      responseUpload = await fetchUpload.json()
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            _billing: {
              name: values.name,
              lastname: values.lastname,
              address: values.address,
              phone: values.phone,
              email: values.email,
            },
            _products: cartStore,
            _payment: {
              payment_method: values.paymentMethod,
              voucher: responseUpload ? responseUpload[0].id : null,
            },
          },
        }),
      },
    )

    if (response.ok) {
      const responseData = await response.json()
      setStep(2)
      setOrder(responseData.data.attributes.order)
    } else {
      api.error({
        message: 'Error',
        description: 'No se pudo realizar la compra, intentelo más tarde.',
        placement: 'bottomRight',
      })
    }

    setLoading(false)
  }

  const onChangePaymentMethods = ({ target: { value } }: RadioChangeEvent) => {
    const paymentMethod: PaymentMethod | undefined = paymentMethods?.data.find(
      (paymentMethod: PaymentMethod) => paymentMethod.id === value,
    )

    setIsUploadVoucher(paymentMethod?.attributes.voucher ?? false)
  }

  const onRecaptcha = async (value: any) => {
    const response = await fetch('/api/recaptcha', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recaptchaToken: value,
      }),
    })

    setRecaptcha(!response.ok)
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  const onChangeAddress = (e: any) => {
    const value: Address = e.target.value

    setAddress(value)
    setValue(e.target.value)
    form.setFieldsValue({
      name: value.attributes.name,
      lastname: value.attributes.lastname,
      address: value.attributes.address,
      phone: value.attributes.phone,
      email: value.attributes.email,
    })

    if (carouselRef.current) {
      carouselRef.current?.goTo(e.target.value - 1)
    }
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}

      <Carousel
        draggable={true}
        dots={false}
        responsive={responsive}
        infinite
        autoplay
        ref={carouselRef}
      >
        {addresses?.data?.map((address: Address, index: number) => {
          return (
            <div key={address.id}>
              <Radio.Group onChange={onChangeAddress} value={value}>
                <Radio value={address}>
                  <Card>
                    <Space direction="vertical">
                      <Text>
                        <b>Dirección:</b> {address.attributes.address}
                      </Text>
                      <Text>
                        <b>Nombre:</b> {address.attributes.name}
                        {address.attributes.lastname}
                      </Text>
                      <Text>
                        <b>Teléfono:</b> {address.attributes.phone}
                      </Text>
                      <Text>
                        <b>Email:</b> {address.attributes.email}
                      </Text>
                    </Space>
                  </Card>
                </Radio>
              </Radio.Group>
            </div>
          )
        })}
      </Carousel>

      <br />
      <br />
      <br />

      <Form
        form={form}
        name="cheackoutForm"
        layout={'vertical'}
        onFinish={onFinish}
        initialValues={{
          ['name']: '',
          ['lastname']: '',
          ['address']: '',
          ['phone']: '',
          ['email']: '',
          ['paymentMethod']: null,
          ['voucher']: null,
        }}
      >
        <Row gutter={16}>
          <Col xs={24} sm={12} md={14}>
            <Flex gap={16} justify="space-between">
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input disabled={address != null} />
              </Form.Item>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input disabled={address != null} />
              </Form.Item>
            </Flex>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <TextArea size="middle" disabled={address != null} />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Teléfono"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input disabled={address != null} />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input disabled={address != null} />
            </Form.Item>
            <Form.Item name="notes" label="Notas del pedido (opcional)">
              <TextArea size="middle" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={10}>
            <Card title="SU PEDIDO" className={styles2['order']}>
              <Text className={styles2['title']}>Producto</Text>
              <Divider className={styles2['divider']} />
              {cartStore.map((product: ProductCart) => (
                <Flex key={product.id} justify="space-between">
                  <Text>
                    {product.attributes.name} x {product.qty}
                  </Text>
                  <Text>{money.format(product.price * product.qty)}</Text>
                </Flex>
              ))}
              <br />
              <Flex justify="space-between" align="center">
                <Text className={styles2['title']}>Subtotal</Text>
                <Text className={styles2['price']}>
                  {money.format(subtotalStore)}
                </Text>
              </Flex>
              <Divider className={styles2['divider']} />
              <Flex justify="space-between" align="center">
                <Text className={styles2['title']}>ITBMS</Text>
                <Text className={styles2['price']}>
                  {money.format(subtotalStore * 0.07)}
                </Text>
              </Flex>
              <Divider className={styles2['divider']} />
              <Flex justify="space-between" align="center">
                <Text className={styles2['title']}>Total</Text>
                <Text className={`${styles2['price']} ${styles2['total']}`}>
                  {money.format(subtotalStore + subtotalStore * 0.07)}
                </Text>
              </Flex>
              {paymentMethods?.data && paymentMethods?.data.length ? (
                <>
                  <Divider className={styles2['divider']} />
                  <Text className={styles2['title']}>Médotos de pago</Text>
                  <Form.Item
                    label="Tipo de pago"
                    name="paymentMethod"
                    rules={[
                      {
                        required: true,
                        message: requiredMessage,
                      },
                    ]}
                  >
                    <Radio.Group onChange={onChangePaymentMethods}>
                      <Flex vertical>
                        {paymentMethods.data.map(
                          (paymentMethod: PaymentMethod) => {
                            return (
                              <Radio
                                key={paymentMethod.id}
                                value={paymentMethod.id}
                              >
                                {paymentMethod.attributes.name}
                              </Radio>
                            )
                          },
                        )}
                      </Flex>
                    </Radio.Group>
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
              {isUploadVoucher ? (
                <>
                  <Form.Item
                    label="Comprobante de pago"
                    name="voucher"
                    rules={[
                      {
                        required: isUploadVoucher,
                        message: requiredMessage,
                      },
                    ]}
                  >
                    <Upload
                      action="https://run.mocky.io/v3/b913c448-278a-47ad-82d9-c25c1a11b7d3"
                      maxCount={1}
                      listType="picture-card"
                      accept="image/png, image/jpeg"
                      onPreview={handlePreview}
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
                      <button
                        style={{ border: 0, background: 'none' }}
                        type="button"
                      >
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Comprobante</div>
                      </button>
                    </Upload>
                  </Form.Item>
                  <Modal
                    open={previewOpen}
                    title="Comprobante"
                    footer={null}
                    onCancel={() => setPreviewOpen(false)}
                  >
                    <Image
                      alt="voucher"
                      src={previewImage}
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{ width: '100%', height: 'auto' }}
                    />
                  </Modal>
                </>
              ) : (
                <></>
              )}
              <Divider className={styles2['divider']} />
              <ReCAPTCHA
                sitekey={'6LdTvVYpAAAAAAekOFi5Am0rpzGT7Vv9-iqhMM9w'}
                onChange={onRecaptcha}
              />
              <Button
                disabled={recaptcha}
                type="primary"
                size="large"
                block
                loading={loading}
                className={styles2['btn']}
                onClick={form.submit}
              >
                realizar pedido
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  )
}
