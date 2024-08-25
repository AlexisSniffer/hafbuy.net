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

const { Text } = Typography

export default function Review({ id, attributes }: ReviewProps) {
  return (
    <>
      <pre>{JSON.stringify(attributes, null, 2)}</pre>
    </>
  )
}
