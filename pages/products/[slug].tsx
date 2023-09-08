import { useRouter } from 'next/router'
import useSWR from 'swr'
import {
  Alert,
  Button,
  Card,
  Divider,
  Form,
  Input,
  Pagination,
  Rate,
  Skeleton,
  Space,
  Tabs,
  TabsProps,
  notification,
} from 'antd'

import {
  qsfilterProductReviews,
  qsfilterProductsBySlug,
} from '../../store/queries/products'
import ProductDetail from '../../components/products/ProductDetail'
import { useState } from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjsES from 'dayjs/locale/es'
dayjs.extend(relativeTime)
dayjs.locale(dayjsES)

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const ProductPage = () => {
  const router = useRouter()
  const { slug } = router.query
  const [form] = Form.useForm()
  const [api, contextHolder] = notification.useNotification()
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  })

  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?${qsfilterProductsBySlug({
      slug: slug,
    })}`,
    fetcher
  )

  const { data: reviews, error: reviewsError } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?${qsfilterProductReviews(
      {
        product: data?.data[0].id,
      },
      pagination
    )}`,
    fetcher
  )

  const [product, setProduct] = useState<number>(data?.data[0].id)

  if (error) {
    return <Alert message="No existe el producto solicitado" type="error" />
  }

  if (!data) {
    return <Skeleton />
  }

  const onFinish = async (values: any) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/reviews`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            rating: values.rating,
            comment: values.comment,
            name: values.name,
            email: values.email,
            product: data?.data[0].id,
          },
        }),
      }
    )

    if (response.status == 200) {
      api.success({
        message: `Enviada con éxito`,
        description: `Su reseña para el producto se ha creado exitosamente.`,
        placement: 'bottomRight',
      })

      form.resetFields()
    } else {
      api.error({
        message: `Error`,
        description:
          'Hubo un problema al enviar la reseña del producto. Por favor, inténtelo de nuevo más tarde.',
        placement: 'bottomRight',
      })
    }
  }

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Reseñas (${reviews?.meta.pagination.total})`,
      children:
        reviews?.data.length > 0 ? (
          <>
            <Space direction="vertical" size={'large'}>
              <Reviews reviews={reviews} />
              <Pagination
                defaultCurrent={pagination.page}
                pageSize={pagination.pageSize}
                total={reviews.meta.pagination.total}
                onChange={(page, pageSize) => {
                  setPagination({
                    page: page,
                    pageSize: pageSize,
                  })
                }}
              />
            </Space>
          </>
        ) : (
          <i>Aún no hay reseñas.</i>
        ),
    },
  ]

  return (
    <>
      {contextHolder}

      <ProductDetail product={data.data[0]} />

      <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      {reviews?.data ? <Divider /> : null}
      <Card
        style={{
          width: '100%',
          backgroundColor: '#f4f4f4',
          padding: '0.2rem',
          borderRadius: '3px',
        }}
      >
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ['rating']: 0,
            ['comment']: '',
            ['name']: '',
            ['email']: '',
          }}
        >
          <Form.Item
            name="rating"
            label="Clasificación"
            rules={[
              { required: true, message: 'Ingrese una clasificación' },
              {
                type: 'number',
                min: 1,
                message: 'Ingrese una clasificación',
              },
            ]}
          >
            <Rate />
          </Form.Item>

          <Form.Item
            name="comment"
            label="Comentario"
            rules={[
              {
                required: true,
                message: 'Ingrese un comentario',
              },
            ]}
          >
            <Input.TextArea showCount={true} maxLength={200} />
          </Form.Item>

          <Form.Item
            name="name"
            label="Nombre"
            rules={[{ required: true, message: 'Ingrese su nombre' }]}
          >
            <Input maxLength={50} />
          </Form.Item>

          <Form.Item
            name="email"
            label="Correo Electrónico"
            rules={[
              {
                type: 'email',
                required: true,
                message: 'El correo electrónico es requerido',
              },
            ]}
          >
            <Input maxLength={100} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" onClick={form.submit}>
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

const Reviews = ({ reviews }: any) => {
  return (
    <>
      <Space direction="vertical" size={'middle'}>
        {reviews?.data.map((review: any) => {
          return (
            <>
              <div>
                <div>
                  <b>{review.attributes.name}</b>{' '}
                  <Rate
                    value={review.attributes.rating}
                    disabled
                    style={{ fontSize: 14 }}
                  ></Rate>
                </div>
                <div>{dayjs(review.attributes.createdAt).from(dayjs())}</div>
                <i>{review.attributes.comment}</i>
              </div>
            </>
          )
        })}
      </Space>
    </>
  )
}

export default ProductPage
