'use client'

import Container from '@/components/utils/container'
import { qsReviews } from '@/queries/review'
import { Payload } from '@/types/payload'
import { Review as ReviewProps } from '@/types/review'
import { fetcher } from '@/utils/fetcher'
import {
  Form,
  notification,
  Pagination,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from 'antd'
import { useState } from 'react'
import useSWR from 'swr'
import Review from './Review'
import ReviewForm from './ReviewForm'
import { Product } from '@/types/product'

const { Text } = Typography

export default function Reviews({ id, attributes }: Product) {
  const [api, contextHolder] = notification.useNotification()
  const [form] = Form.useForm()
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  })

  const { data: reviews, error: errorReviews } = useSWR<Payload<ReviewProps[]>>(
    `${process.env.NEXT_PUBLIC_API_URL}/api/reviews?${qsReviews({
      id,
      pagination,
    })}`,
    fetcher,
  )

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Reseñas (${reviews?.meta?.pagination?.total})`,
      children: reviews?.data ? (
        <Space direction="vertical" size={'large'}>
          {reviews.data.map((review: ReviewProps) => {
            return <Review id={review.id} attributes={review.attributes} />
          })}
          <Pagination
            defaultCurrent={pagination.page}
            pageSize={pagination.pageSize}
            total={reviews?.meta?.pagination?.total}
            onChange={(page, pageSize) => {
              setPagination({
                page: page,
                pageSize: pageSize,
              })
            }}
          />
        </Space>
      ) : (
        <Text italic>Aún no hay reseñas.</Text>
      ),
    },
  ]

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
            product: id,
          },
        }),
      },
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
          'Hubo un problema al enviar la reseña del producto. Por favor, inténtelo más tarde.',
        placement: 'bottomRight',
      })
    }
  }

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      <br />
      <br />
      <ReviewForm id={id} attributes={attributes}></ReviewForm>
    </>
  )
}
