'use client'

import { qsOrders } from '@/queries/order'
import { Order, OrderProduct } from '@/types/order'
import { Payload } from '@/types/payload'
import { fetcherToken } from '@/utils/fetcher'
import { money } from '@/utils/formatters'
import { DropboxOutlined } from '@ant-design/icons'
import {
  Col,
  ConfigProvider,
  Flex,
  Row,
  Skeleton,
  Table,
  Tag,
  ThemeConfig,
  Typography,
} from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

const { Title } = Typography

const theme: ThemeConfig = {
  components: {},
}

const columns: ColumnsType<Order> = [
  {
    title: 'Orden',
    dataIndex: ['attributes', 'order'],
    key: 'order',
  },
  {
    title: 'Fecha',
    render: (order: Order) => (
      <>{dayjs(order.attributes.date).format('DD/MM/YYYY h:MM A')}</>
    ),
    key: 'date',
  },
  {
    title: 'Estado',
    render: (order: Order) => status(order.attributes.status ?? ''),
    key: 'status',
  },
  {
    title: 'Total',
    render: (order: Order) => {
      let subtotal: number = 0
      let itbms: number = 0
      let total: number = 0

      order.attributes.products.data.map((product: OrderProduct) => {
        subtotal += product.attributes.qty * product.attributes.price
        itbms += product.attributes.qty * product.attributes.price * 0.07
      })

      total = subtotal + itbms

      return <>{money.format(total)}</>
    },
    key: 'total',
  },
]

function status(status: String) {
  switch (status) {
    case 'pending':
      return <Tag color="gold">Pendiente</Tag>
    case 'accepted':
      return <Tag color="cyan">Aceptado</Tag>
    case 'invoiced':
      return <Tag color="blue">Facturado</Tag>
    case 'dispatched':
      return <Tag color="green">Despachado</Tag>
    case 'rejected':
      return <Tag color="red">Rechazado</Tag>
  }
}

export default function ProfileOrders() {
  const { data: session, status } = useSession()

  const { data: orders } = useSWR<Payload<Order[]>>(
    [
      `${process.env.NEXT_PUBLIC_API_URL}/api/orders?${qsOrders({
        user: session?.user.id,
        pagination: { page: 1, pageSize: 10 },
      })}`,
      session?.user.token!,
    ],
    ([url, token]) => fetcherToken(url, token as string),
  )

  if (!orders) {
    return <Skeleton />
  }

  return (
    <ConfigProvider theme={theme}>
      <Row style={{ marginBottom: '2rem' }}>
        <Col xs={24}>
          <Flex align="center" gap={5}>
            <DropboxOutlined style={{ fontSize: '2rem', color: '#d3d3d4' }} />
            <Title level={3} style={{ margin: 0 }}>
              Ordenes
            </Title>
          </Flex>
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={24}>
          <Table
            dataSource={orders?.data}
            columns={columns}
            pagination={false}
          />
        </Col>
      </Row>
    </ConfigProvider>
  )
}
