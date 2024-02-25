'use client'

import useCartStore from '@/store/cartStore'
import { Category } from '@/types/category'
import { Payload } from '@/types/payload'
import {
  HeartOutlined,
  SearchOutlined,
  ShoppingOutlined,
} from '@ant-design/icons'
import { Badge, Col, Popover, Row } from 'antd'
import Link from 'next/link'
import { useState } from 'react'
import CartDrawer from './cart-drawer'
import HeaderSearch from './header-search'

export default function CartIcons({
  data,
  meta,
}: Payload<Category[] | undefined>) {
  const [open, setOpen] = useState(false)
  const countStore = useCartStore((state) => state.count)

  return (
    <>
      <Row gutter={{ xs: 24, sm: 24, md: 24 }}>
        <Col flex={'0 0 auto'} xs={0} sm={24} lg={0}>
          <Popover
            placement="topRight"
            content={<HeaderSearch data={data} meta={meta} />}
            trigger="click"
          >
            <SearchOutlined style={{ fontSize: '1.7rem' }} rev={undefined} />
          </Popover>
        </Col>
        <Col>
          <Link href={'/wishlist'}>
            <Badge count={4}>
              <HeartOutlined style={{ fontSize: '1.7rem' }} rev={undefined} />
            </Badge>
          </Link>
        </Col>
        <Col>
          <Badge count={countStore}>
            <ShoppingOutlined
              style={{ fontSize: '1.7rem' }}
              rev={undefined}
              onClick={() => setOpen(!open)}
            />
          </Badge>
        </Col>
      </Row>

      <CartDrawer isOpen={open} onClose={() => setOpen(!open)} />
    </>
  )
}
