'use client'

import useCartStore from '@/store/cartStore'
import { Address } from '@/types/address'
import {
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

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

export default function AddressAdd() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const [loading, setLoading] = useState<boolean>(false)

  const { Title } = Typography
  const requiredMessage = 'Campo requerido'

  const onFinish = async (values: any) => {
    setLoading(true)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/addresses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.user.token}`,
        },
        body: JSON.stringify({
          data: {
            name: values.name,
            lastname: values.lastname,
            address: values.address,
            phone: values.phone,
            email: values.email,
            user: session?.user.id,
          },
        }),
      },
    )

    if (response.ok) {
      router.push('/profile/address')
    } else {
      api.error({
        message: 'Error',
        description: 'No se pudo registrar la dirección, intentelo más tarde.',
        placement: 'bottomRight',
      })
    }

    setLoading(false)
  }

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Title level={4}>Añadir Dirección</Title>
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
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Flex gap={16} justify="space-between">
              <Form.Item
                label="Nombre"
                name="name"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Apellido"
                name="lastname"
                rules={[{ required: true, message: requiredMessage }]}
                style={{ width: '100%' }}
              >
                <Input />
              </Form.Item>
            </Flex>
            <Form.Item
              name="address"
              label="Dirección"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <TextArea size="middle" />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Teléfono"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Correo electrónico"
              rules={[{ required: true, message: requiredMessage }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="large"
                loading={loading}
                onClick={form.submit}
              >
                Guardar
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </ConfigProvider>
  )
}
