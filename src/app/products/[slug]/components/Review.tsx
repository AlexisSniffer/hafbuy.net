'use client'

import RenderContent from '@/components/utils/render-content'
import { Review as ReviewProps } from '@/types/review'
import { UserOutlined } from '@ant-design/icons'
import { Card, Flex, Rate, Typography } from 'antd'
import dayjs from 'dayjs'

const { Text, Paragraph } = Typography

export default function Review({ id, attributes }: ReviewProps) {
  return (
    <Flex gap={10}>
      <div
        style={{
          background: '#f5f7f7',
          padding: '1rem',
          width: '80px',
          height: '80px',
        }}
      >
        <UserOutlined
          style={{
            fontSize: '3rem',
          }}
        />
      </div>
      <Card
        style={{
          background: '#f5f7f7',
          width: '100%',
          padding: '0.2rem !important',
        }}
      >
        <Flex justify="space-between">
          <div style={{ maxWidth: '80%' }}>
            <Paragraph style={{ margin: 0 }}>
              <Text strong style={{ color: '#999' }}>
                {attributes.name} -{' '}
              </Text>
              <Text style={{ color: '#999' }}>
                {dayjs(attributes.createdAt).format('DD/MM/YYYY')}
              </Text>
            </Paragraph>
            <RenderContent content={attributes.comment} />
          </div>
          <Rate
            value={attributes.rating}
            disabled
            style={{ fontSize: '12px' }}
          ></Rate>
        </Flex>
      </Card>
    </Flex>
  )
}
