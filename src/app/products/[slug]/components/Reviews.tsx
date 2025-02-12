'use client'

import { qsReviews } from '@/queries/review'
import { Payload } from '@/types/payload'
import { Product } from '@/types/product'
import { Review as ReviewProps } from '@/types/review'
import { fetcher } from '@/utils/fetcher'
import {
  Divider,
  Flex,
  Form,
  notification,
  Pagination,
  Tabs,
  TabsProps,
  Typography,
} from 'antd'
import { useState } from 'react'
import useSWR from 'swr'
import Review from './Review'
import ReviewForm from './ReviewForm'
import RenderContent from '@/components/utils/render-content'

const { Text, Title } = Typography

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
      label: 'Especificaciones',
      children: (
        <>
          {attributes.description2 ? (
            <RenderContent content={attributes.description2} />
          ) : (
            <Text italic>Sin descripción.</Text>
          )}
        </>
      ),
    },
    {
      key: '2',
      label: `Reseñas (${reviews?.meta?.pagination?.total})`,
      children: reviews?.data ? (
        <>
          <Flex vertical gap={10}>
            <Flex vertical gap={10}>
              {reviews?.data.map((review: ReviewProps) => {
                return (
                  <Review
                    key={review.id}
                    id={review.id}
                    attributes={review.attributes}
                  />
                )
              })}
            </Flex>
            <Pagination
              defaultCurrent={pagination.page}
              pageSize={pagination.pageSize}
              total={reviews?.meta?.pagination?.total}
              style={{ textAlign: 'right' }}
              onChange={(page, pageSize) => {
                setPagination({
                  page: page,
                  pageSize: pageSize,
                })
              }}
            />
          </Flex>
          <Title level={4}>Añadir una reseña</Title>
          <ReviewForm id={id} attributes={attributes}></ReviewForm>
        </>
      ) : (
        <Text italic>Aún no hay reseñas.</Text>
      ),
    },
  ]

  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={() => {}} />
      <Divider />
    </>
  )
}
