'use client'

import { qsAddress } from '@/queries/address'
import { Address } from '@/types/address'
import { fetcherToken } from '@/utils/fetcher'
import { EnvironmentOutlined } from '@ant-design/icons'
import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Row,
  Space,
  ThemeConfig,
  Typography,
  notification,
} from 'antd'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import useSWR from 'swr'

const { Title, Paragraph, Text } = Typography
const requiredMessage = 'Campo requerido'

const theme: ThemeConfig = {
  components: {
    Button: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Input: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
    Card: {
      borderRadius: 0,
      borderRadiusLG: 0,
    },
  },
}

export default function AddressPage() {
  const { data: session, status } = useSession()
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

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

  const onFinish = async (values: any) => {
    try {
    } catch (error: any) {
      setLoading(false)
      setError(
        error.message ||
          'No se pudo actualizar los datos, intentelo más tarde.',
      )
    }

    setLoading(false)
  }

  if (status === 'loading') return <div>Loading...</div>

  return (
    <ConfigProvider theme={theme}>
      {contextHolder}
      <Row style={{ marginBottom: '2rem' }}>
        <Col xs={24}>
          <Flex align="center" gap={5}>
            <EnvironmentOutlined
              style={{ fontSize: '2rem', color: '#d3d3d4' }}
            />
            <Title id="address" level={3} style={{ margin: 0 }}>
              Direcciones
            </Title>
          </Flex>
          <Paragraph style={{ color: '#777' }}>
            Las siguientes direcciones se utilizarán en la página de pago de
            forma predeterminada.
          </Paragraph>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Link href="/profile/address/add">
            <Button type="primary">Añadir Dirección</Button>
          </Link>
        </Col>
        {addresses?.data?.map((address: Address) => {
          return (
            <Col xs={24} md={12} lg={8}>
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
            </Col>
          )
        })}
      </Row>
    </ConfigProvider>
  )
}
